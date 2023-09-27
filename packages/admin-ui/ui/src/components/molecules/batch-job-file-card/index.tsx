import { ReactNode, useState } from "react"
import clsx from "clsx"
import Tooltip from "../../atoms/tooltip"
import { BatchJobOperation } from "../../organisms/batch-jobs-activity-list/utils"
import { BatchJob } from "@medusajs/medusa"
import { IInventoryProductSelectType } from "../../../types/inventoryProduct"
import { useAdminCreateBatchJob } from "medusa-react"
import { usePolling } from "../../../providers/polling-provider"
import { queryClient } from "../../../constants/query-client"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import QuickViewModal from "../../organisms/quick-view-modal"
import medusaRequest from "../../../services/request"

type Props = {
  batchJob: BatchJob
  operation?: BatchJobOperation
  fileName: string
  fileSize?: string
  errorMessage?: string
  hasError?: boolean
  icon?: ReactNode
  onClick?: () => void
}

const BatchJobFileCard = ({
  batchJob,
  operation,
  fileName,
  fileSize,
  icon,
  onClick,
  hasError,
  errorMessage,
}: Props) => {
const [modalOpen, setModalOpen] = useState(false)
const createBatchJob = useAdminCreateBatchJob()
const { resetInterval } = usePolling()
const notification = useNotification()
let productTitle =""
let productLink =""
let error = ""
let remainingProductsToImport: IInventoryProductSelectType[] = [];
let attemptToImport: number = 0
if(operation===BatchJobOperation.Manual){
  if(Array.isArray(batchJob.context.products))
  attemptToImport = batchJob.context.products.length
}
if(errorMessage && operation===BatchJobOperation.Manual){
  [productTitle, productLink, error] = errorMessage?.split("\n");
  remainingProductsToImport = extractProductsAfterMatch({products: batchJob.context.products as IInventoryProductSelectType[], titleToMatch:productTitle})
}

const handleRetry = () =>{
  if(remainingProductsToImport.length){
    createBatchJob.mutate({
      dry_run: false,
      type: "moveOn-inventory-product-import",
      context: {
        products: remainingProductsToImport,
        store_slug: batchJob.context?.store_slug
      },
    }, {
      onSuccess: async(res) => {
        resetInterval()
        queryClient.invalidateQueries({ queryKey: ['inventory-retrive'] })
        const path = `/admin/batch-job-extended/${batchJob.id}`
        await medusaRequest("delete", path);
        notification("Success", `Successfully initiated import of remaining ${remainingProductsToImport.length} products`, "success")
      },
      onError: (err) => {
        notification("Error", getErrorMessage(err), "error")
      },
    })
  }
}

  return (
    <div
      className="mt-4 flex w-full items-center"
    >
      <div
        className={`border-grey-20 flex items-center justify-center rounded-lg border p-2.5 ${operation===BatchJobOperation.Manual && "cursor-pointer"}
        ${remainingProductsToImport.length===0 && errorMessage && operation===BatchJobOperation.Manual && "hidden"}`}
        onClick={remainingProductsToImport.length>0 && errorMessage && operation===BatchJobOperation.Manual? handleRetry:()=>{}}
      >
      <Tooltip
          side="top"
          open={operation === BatchJobOperation.Manual && hasError && errorMessage ? undefined : false}
          maxWidth={320}
          content={`Retry remaining products`}
        >
        {!!icon && icon}
        </Tooltip>
      </div>

      <div className="relative w-full pl-4 text-left">
        <div className="inter-small-regular max-w-[90%] overflow-hidden truncate">
          {operation !== BatchJobOperation.Manual && fileName}
          {operation=== BatchJobOperation.Manual && !hasError && batchJob.status==="completed" && <div>Successfully imported {attemptToImport} product(s)</div>}
        </div>
          {!!fileSize && (
            <div
              className={clsx("text-grey-40 inter-small-regular", {
                "text-rose-500": hasError,
              })}
            >
              {batchJob.canceled_at?  <div className="bg-red-100 border border-red-200= px-4 py-3 rounded relative" role="alert">
                <span className="block text-rose-500 sm:inline ml-2">Cancelled by you</span>
              </div>:
              hasError && errorMessage && batchJob.status==="failed" && productLink && productTitle && error ?
              <div className="bg-red-100 border border-red-200 text-green-900 px-4 py-3 rounded relative" role="alert">
                
                <span className="block">Failed while importing <strong onClick={()=>setModalOpen(!modalOpen)} className="font-bold hover:underline cursor-pointer">{productTitle}</strong></span>
                <span className="block text-rose-500 sm:inline ml-2">Reason: {error}</span>
                <span className="block text-green-600 sm:inline ml-2"> Remaining: {remainingProductsToImport.length} out of {attemptToImport}</span>
              </div>
              : 
              fileSize}
            </div>
          )}

{modalOpen && (
        <QuickViewModal
          title="Inventory Product"
          productLink={productLink}
          handleClose={() => setModalOpen(!modalOpen)}
          onSubmit={() => {}}
          loading={false}
        />
      )}
      </div>
    </div>
  )
}

export default BatchJobFileCard


function extractProductsAfterMatch({products, titleToMatch}: {products: IInventoryProductSelectType[], titleToMatch: string}) {
  const productsAfterMatch = [];
  let foundMatch = false;

  for (const product of products) {
    if (foundMatch) {
      // If we've already found a match, add products to the new array
      productsAfterMatch.push({ ...product });
    } else if (product.title === titleToMatch) {
      // When a matching title is found, set the flag to true
      foundMatch = true;
    }
  }

  return productsAfterMatch;
}

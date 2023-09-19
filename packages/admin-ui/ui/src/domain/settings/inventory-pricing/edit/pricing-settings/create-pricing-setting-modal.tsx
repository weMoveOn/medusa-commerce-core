import { useAdminStore } from "medusa-react"
import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { CreatePricingOptionFormType, ICreatePriceSettingReturnType, IInventoryStore, PricingOptionFormType } from "../../../../../types/inventory-price-setting"
import PricingOptionForm from "../../components/price-setting-form"
import { AxiosResponse } from "axios"
import Medusa from "../../../../../services/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getErrorMessage } from "../../../../../utils/error-messages"

type Props = {
  open: boolean
  onClose: () => void
  store: IInventoryStore
}

const CreatePricingOptionModal = ({ open, onClose, store }: Props) => {
  console.log("🚀 ~ file: create-pricing-setting-modal.tsx:20 ~ CreatePricingOptionModal ~ store:", store)
  const form = useForm<PricingOptionFormType>()
  const { store : medusaStore, status, isLoading } = useAdminStore({})
  console.log("🚀 ~ file: create-pricing-setting-modal.tsx:23 ~ CreatePricingOptionModal ~ medusaStore:", medusaStore)

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form
  const notifcation = useNotification()
  const queryClient = useQueryClient()

  const closeAndReset = () => {
    reset()
    onClose()
  }

  const createPriceSettingMutation = useMutation(
    (data: CreatePricingOptionFormType) => Medusa.InventoryPriceSettings.add({ ...data, store_slug: store.slug }),
    {
      onSuccess: () => {
        notifcation("Success", "New price role created", "success");
        closeAndReset();
        
       queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
      },
      onError: (error) => {
        notifcation("Error", getErrorMessage(error), "error");
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    const newData: CreatePricingOptionFormType = {
      conversion_rate: data.conversion_rate,
      currency_code: data.currency_code.value,
      profit_amount: data.profit_amount,
      profit_operation: data.profit_operation.value,
      shipping_charge: data.shipping_charge,
      store_slug: store.slug
    };
    createPriceSettingMutation.mutate(newData)
  })

  return (
    <Modal open={open} handleClose={closeAndReset}>
      <Modal.Body>
        <Modal.Header handleClose={closeAndReset}>
          <h1 className="inter-xlarge-semibold">Set Price</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            {medusaStore && <PricingOptionForm form={form} store={store} medusaStore={medusaStore} />}
          </Modal.Content>
          <Modal.Footer>
            <div className="gap-x-xsmall flex w-full items-center justify-end">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={closeAndReset}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                type="submit"
                loading={isLoading}
                disabled={isLoading || !isDirty}
              >
                Save and close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePricingOptionModal

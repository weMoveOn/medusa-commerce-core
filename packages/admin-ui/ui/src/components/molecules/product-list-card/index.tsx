import clsx from "clsx"
import React from "react"
import { IInventoryProductDataType } from "../../../types/inventoryProduct"
import Checkbox from "../../atoms/checkbox"
import ProgressBarMoveShop from "../../atoms/progress-bar"
import Button from "../../fundamentals/button"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import EyeIcon from "../../fundamentals/icons/eye-icon"
import StarRatingIcon from "../../fundamentals/icons/star-rating"

interface IProductListCardProps {
  leftButtonOnClick?: (value: any) => void
  rightButtonOnClick?: (value: any) => void
  productData?: IInventoryProductDataType
  leftButtonTitle?: string
  rightButtonTitle?: string
  leftButtonIcon?: React.ReactNode
  rightButtonIcon?: React.ReactNode
  enableSelectOption?: boolean
  isSelect?: boolean
  footerButtonEnabled?: boolean
  footerProgressBarEnabled?: boolean
  route: "imported-product" | "product-list"
}

const ProductListCard: React.FC<IProductListCardProps> = ({
  leftButtonOnClick,
  rightButtonOnClick,
  leftButtonIcon,
  rightButtonIcon,
  leftButtonTitle,
  rightButtonTitle,
  enableSelectOption = true,
  isSelect = false,
  footerButtonEnabled = true,
  footerProgressBarEnabled = true,
  productData,
  route = "product-list",
}) => {
  const containerClasses = clsx(
    "relative flex items-center gap-4 p-4 border rounded-lg border-gray-100 mb-4 bg-white w-[80%]",
    enableSelectOption && isSelect && "border-violet-600"
  )
  return (
    <div className={containerClasses}>
      {enableSelectOption && (
        <div className="flex items-center">
          <Checkbox
            checked={isSelect ?? false}
            inputFiledClassName="rounded-full shadow-md"
            id="checkbox1"
            label=""
            className="mr-0 cursor-pointer"
          />
        </div>
      )}

      <img
        className="h-20 w-20 rounded-md object-cover hover:scale-125 hover:duration-300 transition ease-in-out"
        src={productData?.image}
        alt="product image"
      />

      <div className="flex flex-grow flex-col ">
            <h5 className="text-large leading-base font-bold tracking-tight text-slate-800 ">
              {productData?.title?.slice(0, 150)}{productData?.title?.length && productData?.title?.length>150 && "..."}
            </h5>
        <div className="flex flex-row">
          <div className="">
            {/* {route === "product-list" && (
              <div className="mt-2 mb-3 flex items-center">
                <StarRatingIcon
                  fillColor={"#fb923c"}
                  size={20}
                  color={"#fb923c"}
                />
                <StarRatingIcon
                  fillColor={"#fb923c"}
                  size={20}
                  color={"#fb923c"}
                />
                <StarRatingIcon size={20} color={"#fb923c"} />
                <StarRatingIcon size={20} color={"#fb923c"} />
                <StarRatingIcon size={20} color={"#fb923c"} />
                <span className="mr-2 ml-3 rounded  px-2.5 py-0.5 text-xs font-normal">
                  (5)
                </span>
              </div>
            )} */}

            {route === "product-list" && (
              <div className=" my-1 flex items-center justify-between">
              <p>
                <span className="text-lg font-bold text-violet-600">{productData?.price}</span>
                {/* <span className="text-sm text-violet-500 line-through">${productData?.price}</span> */}
              </p>
            </div>
            )}
            {route === "product-list" && (
              <div className="my-1 flex items-center justify-between">
              <p className="text-slate-600 text-sm font-normal">Total Sales: {productData?.orders ?? 0}</p>
            </div>
            )}

            {route === "imported-product" && (
              <div className=" my-3 flex items-center justify-between ">
                <p className="rounded-sm border bg-purple-200 px-2 text-purple-600">
                  Status: processing
                </p>
              </div>
            )}

            {route === "imported-product" && (
              <div className="items-left	 my-3 flex  justify-between ">
                <p className="">Last update: 21 June 2023 at 10:28pm</p>
              </div>
            )}
          </div>

          {footerButtonEnabled && (
            <div className="ml-auto flex flex-row  items-center">
              {leftButtonOnClick && (
                <Button
                  icon={
                    leftButtonIcon ?? <EyeIcon style={{ marginRight: "6px" }} />
                  }
                  className="mr-2 min-w-[120px]"
                  onClick={() => leftButtonOnClick(productData)}
                  variant="secondary"
                  size="medium"
                  spanClassName="text-center text-sm font-medium text-slate-700 "
                >
                  {leftButtonTitle ?? "Quick view"}
                </Button>
              )}
              {rightButtonOnClick && (
                <Button
                  icon={
                    rightButtonIcon ?? (
                      <DownloadIcon style={{ marginRight: "6px" }} />
                    )
                  }
                  onClick={() => rightButtonOnClick(productData)}
                  variant="secondary"
                  className="min-w-[120px]"
                  size="medium"
                  spanClassName="text-center text-sm font-medium text-slate-700"
                >
                  {rightButtonTitle ?? "Import"}
                </Button>
              )}
            </div>
          )}
        </div>

        <div className=" w-[50%]">
          {footerProgressBarEnabled && <ProgressBarMoveShop progress="45%" />}
        </div>
      </div>
    </div>
  )
}

export default ProductListCard

import clsx from "clsx"
import React from "react"
import { IInventoryProductDataType } from "../../../types/inventoryProduct"
import Checkbox from "../../atoms/checkbox"
import ProgressBarMoveShop from "../../atoms/progress-bar"
import Button from "../../fundamentals/button"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import EyeIcon from "../../fundamentals/icons/eye-icon"
import StarRatingIcon from "../../fundamentals/icons/star-rating"

interface IProductGridCardProps {
  leftButtonOnClick?: (value: any) => void
  rightButtonOnClick?: (value: any) => void
  productData?: IInventoryProductDataType
  leftButtonTitle?: string
  leftButtonIcon?: React.ReactNode
  rightButtonIcon?: React.ReactNode
  rightButtonTitle?: string
  enableSelectOption?: boolean
  isSelect?: boolean
  footerButtonEnabled?: boolean
  footerProgressBarEnabled?: boolean
  route?: "imported-product" | "product-list"
}
const ProductGridCard: React.FC<IProductGridCardProps> = ({
  leftButtonOnClick,
  rightButtonOnClick,
  leftButtonTitle,
  rightButtonTitle,
  leftButtonIcon,
  enableSelectOption = false,
  isSelect = false,
  footerButtonEnabled = true,
  footerProgressBarEnabled = true,
  productData,
  rightButtonIcon,
  route = "product-list",
}) => {
  const containerClassess = clsx(
    "relative m-1 flex w-full max-w-[18rem] flex-col overflow-hidden rounded-lg border border-gray-100  bg-white",
    enableSelectOption && isSelect && "border-violet-600"
  )
  return (
    <div className={containerClassess}>
      <div
        className="relative flex h-60 overflow-hidden rounded-xl"
      >
      {/* <ImagePlaceholder /> */}
        <img
          className="object-cover w-full h-full"
          src={productData?.image}
          alt="product image"
        />
        {enableSelectOption && (
          <span className="absolute top-0 left-0 m-2 rounded-full text-center text-sm font-medium text-white">
            <div className="mr-4 flex items-center">
              <Checkbox
                checked={isSelect ?? false}
                inputFiledClassName="!rounded-full shadow-md"
                id="checkbox1"
                label=""
                className="mr-0 cursor-pointer "
              />
            </div>
          </span>
        )}
      </div>
      <div className="mt-4 px-4 pb-4">
          <h5 className="truncate text-large leading-base font-bold tracking-tight text-slate-800 mb-1">
            {productData?.title}
          </h5>
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
            <p className="text-slate-600 text-sm font-normal">Total Sales: {productData?.orders??0}</p>
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
          <div className="items-left	 my-3 flex flex-col justify-between ">
            <p className="">Last update: </p>
            <p className="">21 June 2023 at 10:28pm </p>
          </div>
        )}

        {footerProgressBarEnabled && <ProgressBarMoveShop progress="45%" />}
        {footerButtonEnabled && (
          <div className=" mt-1 flex items-center justify-between">
            {leftButtonOnClick && (
              <Button
                icon={
                  leftButtonIcon ?? <EyeIcon style={{ marginRight: "6px" }} />
                }
                loading={false}
                onClick={() => leftButtonOnClick(productData)}
                variant="secondary"
                className="min-w-[114px]"
                size="medium"
                spanClassName="text-center text-sm  font-medium text-slate-700"
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
                className="min-w-[114px]"
                onClick={() => rightButtonOnClick(productData)}
                variant="secondary"
                size="medium"
                spanClassName="text-center text-sm font-medium text-slate-700"
              >
                {rightButtonTitle ?? "Import"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGridCard

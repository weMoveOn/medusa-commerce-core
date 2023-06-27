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
  footerButtonEnabled?: boolean //
  footerProgressBarEnabled?: boolean //
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
}) => {
  const conatainerClassess = clsx(
    "relative m-1 flex w-full max-w-[18rem] flex-col overflow-hidden rounded-lg border border-gray-100  bg-white",
    enableSelectOption && isSelect && "border-violet-600"
  )
  return (
    <div className={conatainerClassess}>
      {/* default   border-gray-100 */}
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-cover"
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          alt="product image"
        />

        {/* <ImagePlaceholder /> */}

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
      </a>
      <div className="mt-4 px-3 pb-5">
        <a href="#">
          <h5 className="text-md font-bold tracking-tight text-slate-800">
            Nike Air MX Super 2500 - Red
          </h5>
        </a>
        <div className="mt-2 mb-3 flex items-center justify-between">
          <div className="flex items-center">
            <StarRatingIcon fillColor={"#fb923c"} size={20} color={"#fb923c"} />
            <StarRatingIcon fillColor={"#fb923c"} size={20} color={"#fb923c"} />
            <StarRatingIcon size={20} color={"#fb923c"} />
            <StarRatingIcon size={20} color={"#fb923c"} />
            <StarRatingIcon size={20} color={"#fb923c"} />
            <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
              5.0
            </span>
          </div>
        </div>
        <div className=" mb-2 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-violet-600">$449</span>
            <span className="text-sm text-violet-500 line-through">$699</span>
          </p>
        </div>
        <div className=" mb-3 flex items-center justify-between">
          <p className="text-slate-600">Total Sales: 2440633</p>
        </div>

        {footerProgressBarEnabled && <ProgressBarMoveShop progress="45%" />}
        {footerButtonEnabled && (
          <div className=" mt-2 flex items-center justify-between">
            {leftButtonOnClick && (
              <Button
                icon={
                  leftButtonIcon ?? <EyeIcon style={{ marginRight: "6px" }} />
                }
                loading={false}
                onClick={() => leftButtonOnClick(productData)}
                variant="secondary"
                className="min-w-[120px]"
                size="medium"
                spanClassName=" text-center text-sm  font-small text-slate-700"
              >
                {leftButtonTitle ?? " Quick view"}
              </Button>
            )}
            {rightButtonOnClick && (
              <Button
                icon={
                  rightButtonIcon ?? (
                    <DownloadIcon style={{ marginRight: "6px" }} />
                  )
                }
                className="min-w-[120px]"
                onClick={() => rightButtonOnClick(productData)}
                variant="secondary"
                size="medium"
                spanClassName=" text-center text-sm font-small text-slate-700"
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

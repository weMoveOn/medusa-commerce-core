import clsx from "clsx"
import React from "react"
import Checkbox from "../../atoms/checkbox"
import ProgressBarMoveShop from "../../atoms/progress-bar"
import Button from "../../fundamentals/button"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import EyeIcon from "../../fundamentals/icons/eye-icon"
import StarRatingIcon from "../../fundamentals/icons/star-rating"

interface IProductListCardProps {
  leftButtonOnClick?: (value: any) => void
  rightButtonOnClick?: (value: any) => void
  productData?: any
  leftButtonTitle?: string
  rightButtonTitle?: string
  leftButtonIcon?: React.ReactNode
  rightButtonIcon?: React.ReactNode
  enableSelectOption?: boolean
  isSelect?: boolean
  footerButtonEnabled?: boolean
  footerProgressBarEnabled?: boolean
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
}) => {
  const containerClasses = clsx(
    "relative flex items-center p-3 border rounded-lg border-gray-100 my-2 bg-white min-w-[80%]",
    enableSelectOption && isSelect && "border-violet-600"
  )

  return (
    <div className={containerClasses}>
      {enableSelectOption && (
        <div className="mr-4 flex items-center">
          <Checkbox
            checked={isSelect ?? false}
            inputFiledClassName="!rounded-full shadow-md"
            id="checkbox1"
            label=""
            className="mr-0 cursor-pointer"
          />
        </div>
      )}

      <img
        className="mr-4 h-24 w-24 rounded-md object-cover"
        src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        alt="product image"
      />

      <div className="flex flex-grow flex-col">
        <div className="">
          <a href="#">
            <h5 className="text-md font-bold tracking-tight text-slate-800">
              Nike Air MX Super 2500 - Red Nike Air MX Super 2500 - Red Nike Air
              MX Super 2500 - Red
            </h5>
          </a>
        </div>

        <div className="flex flex-grow flex-row">
          <div className="">
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
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                5.0
              </span>
            </div>

            <div className="mb-2 flex items-center">
              <p>
                <span className="text-2xl font-bold text-violet-600">$449</span>
                <span className="text-sm text-violet-500 line-through">
                  $699
                </span>
              </p>
            </div>

            <div className="mb-3 flex items-center">
              <p className="text-slate-600">Total Sales: 2440633</p>
            </div>
          </div>

          {footerButtonEnabled && (
            <div className="ml-auto flex flex-row  items-center">
              {leftButtonOnClick && (
                <Button
                  icon={
                    leftButtonIcon ?? <EyeIcon style={{ marginRight: "6px" }} />
                  }
                  className="mr-2"
                  onClick={() => leftButtonOnClick("darta")}
                  variant="secondary"
                  size="medium"
                  spanClassName="text-center text-sm font-medium text-slate-800 "
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
                  onClick={() => rightButtonOnClick("darta")}
                  variant="secondary"
                  size="medium"
                  spanClassName="text-center text-sm font-medium text-slate-800"
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

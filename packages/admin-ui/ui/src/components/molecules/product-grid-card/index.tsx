import clsx from "clsx"
import React from "react"
import { IInventoryProductDataType, IInventoryProductSelectType } from "../../../types/inventoryProduct"
import Checkbox from "../../atoms/checkbox"
import ProgressBarMoveShop from "../../atoms/progress-bar"
import Button from "../../fundamentals/button"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import EyeIcon from "../../fundamentals/icons/eye-icon"
import { formatDate } from "../../../utils/formatDate"
import { Link } from "react-router-dom"
import ArrowUpIcon from "../../fundamentals/icons/arrow-up-icon"

interface IProductGridCardProps {
  leftButtonOnClick?: (value: any) => void;
  rightButtonOnClick?: (value: any) => void;
  leftButtonTitle?: string;
  rightButtonTitle?: string;
  leftButtonIcon?: React.ReactNode;
  rightButtonIcon?: React.ReactNode;
  enableSelectOption?: boolean;
  isSelect: boolean;
  footerButtonEnabled?: boolean;
  footerProgressBarEnabled?: boolean;
  handleSelect?: ({ link, vpid }: IInventoryProductSelectType) => void;
  productData: IInventoryProductDataType;
  route: "product-list" | "imported-product" | "import-status";
  status?: string,
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
  handleSelect,
  status,
}) => {
  const containerClasses = clsx(
    "relative m-1 flex w-full max-w-[18rem] flex-col overflow-hidden rounded-lg border border-gray-100  bg-white",
    enableSelectOption && isSelect && "border-violet-600", enableSelectOption && "cursor-pointer"
  )
  return (
    <div className={containerClasses} onClick={()=>handleSelect && handleSelect({vpid: productData.vpid, link: productData.link, title: productData.title, image: productData.image})}>
      <div
        className="relative flex h-60 overflow-hidden rounded-lg"
      >
      {/* <ImagePlaceholder /> */}
        <img
          className="object-cover w-full h-full"
          src={productData?.image}
          alt="product image"
        />
        {enableSelectOption && handleSelect && (
          <span className="absolute top-0 left-0 m-2 rounded-full text-center text-sm font-medium text-white">
            <div className="mr-4 flex items-center">
              <Checkbox
                checked={isSelect ?? false}
                inputFiledClassName="!rounded-full shadow-md"
                id="checkbox1"
                label=""
                className="mr-0 cursor-pointer"
                onChange={()=>handleSelect({vpid: productData.vpid, link: productData.link, title: productData.title, image: productData.image})}
              />
            </div>
          </span>
        )}
      </div>
      <div className="mt-4 px-4 pb-4">
          <Link target="_blank" to={productData.link}><h5 className="truncate text-large leading-base font-bold tracking-tight text-slate-800 hover:underline mb-1">
            {productData?.title}
          </h5>
          </Link>
        {route === "product-list" && (
          <div className=" my-1 flex items-center justify-between">
            <p>
              <span className="text-lg font-bold text-violet-600">Ұ{productData?.price}</span>
              {/* <span className="text-sm text-violet-500 line-through">${productData?.price}</span> */}
            </p>
          </div>
        )}

        {route === "product-list" && (
          <div className="my-1 flex items-center justify-between">
            <p className="text-slate-600 text-sm font-normal">Total Sales: {productData?.orders??0}</p>
          </div>
        )}
        {route === "import-status" && (
          <>
          {status && <div className=" my-3 flex items-center justify-between ">
            <p className="rounded-sm border bg-purple-200 px-2 text-purple-600">
              Status: { status }
            </p>
          </div>
          }
          <div className="items-left	 my-3 flex flex-col justify-between ">
            <p className="">Last update: </p>
            <p className="">{formatDate(productData.updated_at!)}</p>
          </div>
          </>
        )}

        {route === "import-status" && footerProgressBarEnabled && <ProgressBarMoveShop progress={progress.toString()} />}
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
                spanClassName="text-center text-sm  font-medium"
              >
                {leftButtonTitle ?? "Quick view"}
              </Button>
            )}
            {rightButtonOnClick && (
              <Button
              disabled={enableSelectOption}
                icon={
                  rightButtonIcon ?? productData.isImported?(
                    <ArrowUpIcon size={20} style={{ marginRight: "6px" }} />
                  ):(
                    <DownloadIcon style={{ marginRight: "6px" }} />
                  )
                }
                className={`min-w-[114px] `}
                onClick={() =>  !productData.isImported && rightButtonOnClick(productData.link)}
                variant={productData.isImported? "primary" : enableSelectOption ? "ghost" :  "secondary"}
                size="medium"
                spanClassName={`text-center text-sm font-medium`}
              >
             {rightButtonTitle ?? productData.isImported?"Update":"Import"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductGridCard

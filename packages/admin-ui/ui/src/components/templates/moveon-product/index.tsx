import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useState } from "react"
import Medusa from "../../../services/api"
import { IInventoryProductPayloadType } from "../../../types/inventoryProduct"
import Button from "../../fundamentals/button"
import FilterIcon from "../../fundamentals/icons/filter-icon"
import ListIcon from "../../fundamentals/icons/list-icon"
import SortingIconMoveOn from "../../fundamentals/icons/sorting-icon-moveon"
import TileIcon from "../../fundamentals/icons/tile-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"

const MoveOnProduct = () => {
  const [layOut, setLayOut] = useState<"grid" | "list">("grid")
  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch"], () =>
    Medusa.moveOnInventory.list({ keyword: "mobile", shop_id: 11 })
  )

  return (
    <div className="container mx-auto px-2">
      <div className="  flex flex-wrap justify-between">
        <div className="px-3 py-3">
          <div className="flex justify-start">
            <Button
              icon={<FilterIcon size={20} style={{ marginTop: "4px" }} />}
              className="mr-2 flex  flex-row items-center justify-center px-6"
              variant="secondary"
              size="small"
              spanClassName="text-center text-sm font-small text-slate-700"
            >
              Filter
            </Button>
            <Button
              icon={
                <SortingIconMoveOn size={16} style={{ marginRight: "6px" }} />
              }
              className="ml-2 flex  flex-row items-center justify-center px-6"
              variant="secondary"
              size="small"
              spanClassName="text-center text-sm font-small text-slate-700"
            >
              Sort
            </Button>
          </div>
        </div>
        <div className="px-3 py-3">
          <div className="flex space-x-2">
            <>
              <span
                onClick={() => {
                  setLayOut("list")
                }}
              >
                <ListIcon
                  style={{
                    opacity: layOut === "list" ? 1 : 0.4,
                    cursor: "pointer",
                  }}
                />
              </span>
              <span
                onClick={() => {
                  setLayOut("grid")
                }}
              >
                <TileIcon
                  style={{
                    opacity: layOut === "grid" ? 1 : 0.4,
                    cursor: "pointer",
                  }}
                />
              </span>
            </>
          </div>
        </div>
      </div>

      <div className="-mx-4 flex flex-wrap justify-center">
        {layOut === "grid" ? (
          <>
            {Array.from(Array(10), (item, index) => (
              <ProductGridCard
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={false}
                footerButtonEnabled={true}
                isSelect={false}
                leftButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
                rightButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
              />
            ))}
          </>
        ) : (
          <>
            {Array.from(Array(10), (item, index) => (
              <ProductListCard
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={false}
                footerButtonEnabled={true}
                leftButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
                rightButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default MoveOnProduct

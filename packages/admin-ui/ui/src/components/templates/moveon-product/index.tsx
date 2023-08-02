import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import Medusa from "../../../services/api"
import { IInventoryProductPayloadType } from "../../../types/inventoryProduct"
import ListIcon from "../../fundamentals/icons/list-icon"
import TileIcon from "../../fundamentals/icons/tile-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"
import QuickViewModal from "../../organisms/quick-view-modal"

import { filterForTemporal } from "../../../utils/date-utils"
import InventoryProductFilters from "../inventory-product-filter"
import InventoryProductSort from "../inventory-product-sort"
import { useOrderFilters } from "../order-table/use-order-filters"

import useInventoryProductFilters from "../../../hooks/use-inventory-product-filter"
import { staticSorting } from "../../../utils/inventory-product-data"
import { NextSelect } from "../../molecules/select/next-select"

const defaultQueryProps = {
  expand: "customer,shipping_address",
  fields:
    "id,status,display_id,created_at,email,fulfillment_status,payment_status,total,currency_code",
}

const MoveOnProduct = () => {
  const [layOut, setLayOut] = useState<"grid" | "list">("grid")
  const { isLoading, isError, data, error } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch"], () =>
    Medusa.moveOnInventory.list({ keyword: "mobile", shop_id: 11 })
  )
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isParamsUpdated, setIsParamsUpdated] = useState(false)
  const [selectedSort, setSelectedSort] = useState<{
    label: string
    value: string
  } | null>(null)

  const {
    removeTab,
    setTab,
    saveTab,
    availableTabs: filterTabs,
    activeFilterTab,
    reset,
    paginate,

    filters,
    setQuery: setFreeText,
    queryObject,
    representationObject,
  } = useOrderFilters(location.search, defaultQueryProps)

  const {
    handleFilterChange,
    handleFilterClear,
    isFetched,
    initializeAvailableFilter,
    setFilters,
    filters: inventoryFilters,
    updateQueryParams,
  } = useInventoryProductFilters()

  const filtersOnLoad = queryObject
  const [query, setQuery] = useState(filtersOnLoad?.query)

  const handleProductView = (value: any) => {
    setIsOpenModal(true)
    console.log(value)
  }
  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const clearFilters = () => {
    reset()
    setQuery("")
  }
  const submitFilter = (data: any) => {
    console.log(data, "Filters")
  }

  const handleSorting = (value: { value: string; label: string }) => {
    setSelectedSort(value)
    const selectedSortData = filterForTemporal.sorter.values.find(
      (x) => x.title === value.label
    )

  
    if (selectedSortData) {
      let key = "sortType"
      let orderValue = "sortOrder"

      if (selectedSortData?.key === "Default") {
        updateQueryParams({ [key]: undefined, [orderValue]: undefined })
      } else {
        updateQueryParams({
          [key]: selectedSortData?.key + "",
          [orderValue]: selectedSortData?.value + "",
        })
      }
      //  dispatch(navigateToNewSearch());
      setIsParamsUpdated(true)
    }
  }
  useEffect(() => {
    const selected = filterForTemporal.sorter.values.find(
      (x) =>
        x.key === inventoryFilters?.sortType &&
        x.value === inventoryFilters?.sortOrder
    )
    if (selected) {
      setSelectedSort({ value: selected.value, label: selected.title })
    }
  }, [inventoryFilters])

  console.log(selectedSort,"s")

  return (
    <>
      <div className="container mx-auto px-2">
        <div className="  flex flex-wrap justify-between">
          <div className="px-3 py-3">
            <div className="flex justify-start">
              <InventoryProductFilters
                filters={filters}
                submitFilters={submitFilter}
                clearFilters={clearFilters}
              />
              <InventoryProductSort
                selectedValue={selectedSort}
                sorter={filterForTemporal.sorter}
                onChange={handleSorting}
              />

          <NextSelect
        placeholder="Sort by"
        name="sort"
        selectedPlaceholder=""
       
        onChange={(value) => {
          console.log(value)
                
        }}
        options={staticSorting}
      />
              {/* <Button
                icon={<FilterIcon size={20} style={{ marginTop: "4px" }} />}
                className="mr-2 flex  flex-row items-center justify-center px-6"
                variant="secondary"
                size="small"
                spanClassName="text-center text-sm font-small text-slate-700"
              >
                Filter
              </Button> */}
              {/* <Button
                icon={
                  <SortingIconMoveOn
                    ascendingColor="#111827"
                    descendingColor="#111827"
                    size={16}
                    style={{ marginRight: "6px" }}
                  />
                }
                className="ml-2 flex  flex-row items-center justify-center px-6"
                variant="secondary"
                size="small"
                spanClassName="text-center text-sm font-small text-slate-700"
              >
                Sort
              </Button> */}
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
                  route="product-list"
                  productData={"click"}
                  key={index}
                  enableSelectOption={false}
                  footerProgressBarEnabled={false}
                  footerButtonEnabled={true}
                  isSelect={false}
                  leftButtonOnClick={handleProductView}
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
                  route="product-list"
                  key={index}
                  enableSelectOption={false}
                  footerProgressBarEnabled={false}
                  footerButtonEnabled={true}
                  leftButtonOnClick={handleProductView}
                  rightButtonOnClick={function (value: any): void {
                    throw new Error("Function not implemented.")
                  }}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {isOpenModal && (
        <QuickViewModal
          title="Export Orders"
          handleClose={() => onCloseModal()}
          onSubmit={() => {}}
          loading={false}
        />
      )}
    </>
  )
}

export default MoveOnProduct

import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import Medusa from "../../../services/api"
import { IConfigurator, IInventoryProductDataType, IInventoryProductPayloadType } from "../../../types/inventoryProduct"
import ListIcon from "../../fundamentals/icons/list-icon"
import TileIcon from "../../fundamentals/icons/tile-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"
import QuickViewModal from "../../organisms/quick-view-modal"
import { filterForTemporal } from "../../../utils/date-utils"
import InventoryProductFilters from "../inventory-product-filter"
import InventoryProductSort from "../inventory-product-sort"
import useInventoryProductFilters from "../../../hooks/use-inventory-product-filter"
import { useLocation } from "react-router-dom"
import queryString from "query-string"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"
import LoadingContainer from "../../atoms/loading-container"
import { TablePagination } from "../../organisms/table-container/pagination"
import { defaultMoveonInventoryFilter } from "../../../utils/filters"

const MoveOnProduct = () => {
  const rrdLocation = useLocation();
  const {
    handleFilterChange,
    handelAllFilterClear,
    isFetched,
    initializeAvailableFilter,
    setFilters,
    filters,
    updateQueryParams,
  } = useInventoryProductFilters()

  const [layOut, setLayOut] = useState<"grid" | "list">("grid")
  const [isParamsUpdated, setIsParamsUpdated] = useState(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [openProductLink, setOpenProductLink] = useState('');
  const [searchedQueries, setSearchedQueries] = useState('');
  const [selectedSort, setSelectedSort] = useState<{
    label: string
    value: string
  } | null>(null)
  const [newFiltersData, setFilersData] = useState<IConfigurator>(filters)

  const [limit, setLimit] = useState(defaultMoveonInventoryFilter.limit);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const { isLoading, isError, data, error, refetch } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch",newFiltersData], () =>
    Medusa.moveOnInventory.list({ keyword: "beg", shop_id: 4, ...newFiltersData })
  )
  
  // console.log(newFiltersData)
  // if data is fetched from backend set new count and limit
  useEffect(()=>{
    if(data?.data){
      setCount(data?.data.count);
      setLimit(data?.data.limit);
      setOffset(data?.data.offset);
    }
    }, [data?.data])

    // if limit and offset updates, call submit filter so it calls backend for new data and update query
    useEffect(()=>{
      submitFilter()
    }, [limit, offset])
    
    const submitFilter = () => {
      const params = queryString.stringify({ ...filters, offset, limit }, { encode: false, skipEmptyString: true, skipNull: true });
      window.history.replaceState(null, 'Searching', `/a/moveon-inventory?${params}`)
      setFilersData(filters)
    }

  useEffect(() => {
    if (!isFetched && data?.data.filters?.configurator) {
      initializeAvailableFilter(data?.data.filters?.configurator);
    }
  }, [isFetched, initializeAvailableFilter, data?.data.filters?.configurator]);

  useEffect(() => {
    const params = queryString.parse((rrdLocation.search).substring(1));
    setFilters(params)
    setFilersData(params)
    setIsParamsUpdated(true);
  }, [rrdLocation.search])

  useEffect(() => {
    if (!data?.data && newFiltersData && isParamsUpdated) {
      let queryStirng = queryString.stringify(newFiltersData);
      if (searchedQueries !== queryStirng) {
        refetch()
        setSearchedQueries(queryStirng)
      }
    }
  }, [data?.data, newFiltersData, isParamsUpdated, searchedQueries]);

  const handleProductView = (value: IInventoryProductDataType) => {
    setIsOpenModal(true)
    setOpenProductLink(value.link)
  }
  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const clearFilters = () => {
    handelAllFilterClear();
    setFilersData(defaultMoveonInventoryFilter)
    refetch({});
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
      setIsParamsUpdated(true)
      refetch()
    }
  }

  const handleNextPage = () => {
     setOffset(offset + limit);
     handleFilterChange({offset: offset+limit, limit:limit})
  }

  const handlePreviousPage = () => {
    setOffset(offset - limit);
    handleFilterChange({offset: offset-limit, limit:limit})
  }

  return (
    <>
     <LoadingContainer isLoading={isLoading}>
     {data?.data.products.length===0 ?
      <div className="flex flex-col justify-center items-center h-[500px] gap-6">
       <div className="font-semibold text-lg tracking-twenty text-orange-50">Product Not Found</div>
        <button onClick={clearFilters} className="px-small py-xsmall">
          <div className="gap-x-xsmall text-grey-50 inter-grey-40 inter-small-semibold flex items-center">
            <ArrowLeftIcon size={20} />
             <span className="ml-1">Go back</span>
          </div>
        </button>
     </div>
      :
      <div className="container">
        <div className="flex flex-wrap justify-between">
          <div className="px-3 py-3">
            <div className="flex justify-start">
              <InventoryProductFilters
                submitFilters={submitFilter}
                clearFilters={clearFilters}
                filtersData={data?.data.filters?.configurator ?? null}
                handleFilterChange={handleFilterChange}
              />
              <InventoryProductSort
                selectedValue={selectedSort}
                sorter={filterForTemporal.sorter}
                onChange={handleSorting}
              />
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
              {data?.data?.products.map((item, index) => (
                <ProductGridCard
                  route="product-list"
                  productData={item}
                  key={index}
                  enableSelectOption={false}
                  footerProgressBarEnabled={false}
                  footerButtonEnabled={true}
                  isSelect={false}
                  leftButtonOnClick={handleProductView}
                  rightButtonOnClick={function (): void {
                    throw new Error("Function not implemented.")
                  }}
                />
              ))}
            </>
            )
            :
            (
            <>
              {data?.data?.products.map((item, index) => (
                <ProductListCard
                  route="product-list"
                  key={index}
                  productData={item}
                  enableSelectOption={false}
                  footerProgressBarEnabled={false}
                  footerButtonEnabled={true}
                  leftButtonOnClick={handleProductView}
                  rightButtonOnClick={function (): void {
                    throw new Error("Function not implemented.")
                  }}
                />
              ))}
            </>
          )}

         <div className="w-full pt-8" style={{ bottom: 100 }}>
          <TablePagination
            pagingState={{
              count: count,
              offset: offset,
              title: "Products",
              pageSize: limit+offset,
              currentPage: (offset/limit)+1,
              pageCount: Math.ceil(count/limit),
              nextPage: ()=>handleNextPage(),
              prevPage: ()=>handlePreviousPage(),
              hasNext: offset*limit<=count,
              hasPrev: offset>0,
            }}
            isLoading={isLoading}
          />
         </div>
        </div>
      </div>
      }
      </LoadingContainer>
      {isOpenModal && (
        <QuickViewModal
          title="Inventory Product"
          productLink={openProductLink}
          handleClose={() => onCloseModal()}
          onSubmit={() => {}}
          loading={false}
        />
      )}
    </>
  )
}

export default React.memo(MoveOnProduct)

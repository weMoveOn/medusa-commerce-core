import { useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import Medusa from "../../../services/api"
import { IInventoryProductDataType, IInventoryProductPayloadType } from "../../../types/inventoryProduct"
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

const DEFAULT_PAGE_LIMIT = 20;

const MoveOnProduct = () => {
  const queryClient = useQueryClient();
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
  const [newFiltersData, setFilersData] = useState<null | {[key:string]:string}>(filters)

  const [limit, setLimit] = useState(DEFAULT_PAGE_LIMIT);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  

  const { isLoading, isError, data, error, refetch } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch",newFiltersData, offset], () =>
    Medusa.moveOnInventory.list({ keyword: "beg", shop_id: 4, offset: offset, limit: limit, ...newFiltersData })
  )
  
  useEffect(()=>{
    if(data?.data){
      setCount(data?.data.count);
      setLimit(data?.data.limit);
      setOffset(data?.data.offset);
    }
    }, [data?.data])


  useEffect(() => {
    if (!isFetched && data?.data.filters?.configurator) {

      initializeAvailableFilter(data?.data.filters?.configurator);
    }
  }, [isFetched, initializeAvailableFilter, data?.data.filters?.configurator]);

  useEffect(() => {
    const params = queryString.parse((rrdLocation.search).substring(1));
    // @ts-ignore
    setFilters(params)
    setIsParamsUpdated(true);
  }, [rrdLocation.search, setFilters])

  useEffect(() => {
    if (!data?.data && filters && isParamsUpdated) {
      let queryStirng = queryString.stringify(filters);
      if (searchedQueries !== queryStirng) {
        refetch()
        setSearchedQueries(queryStirng)
      }
    }
  }, [data?.data, filters, isParamsUpdated, searchedQueries]);

  const handleProductView = (value: IInventoryProductDataType) => {
    setIsOpenModal(true)
    setOpenProductLink(value.link)
  }
  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const clearFilters = () => {
    handelAllFilterClear();
    setFilersData(null)
    refetch({});
  }

  const submitFilter = () => {
    const params = queryString.stringify({ ...filters }, { encode: false }, { encodeValuesOnly: true });
    window.history.replaceState(null, 'Searching', `/a/moveon-inventory?${params}`)
    setFilersData(filters)
    refetch()
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
     setOffset(offset + 1);
  }

  
  const handlePreviousPage = () => {
    setOffset(offset - 1);
  }

  

  return (
    <>
      <div className="container mx-auto px-2">
        <div className="flex flex-wrap justify-between">
          <div className="px-3 py-3">
            <div className="flex justify-start">
              <InventoryProductFilters
                filters={filters}
                submitFilters={submitFilter}
                clearFilters={clearFilters}
                isFetched={isFetched}
                filtersData={data?.data.filters?.configurator}
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
          layOut === "grid" ? (
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
                  rightButtonOnClick={function (value: any): void {
                    throw new Error("Function not implemented.")
                  }}
                />
              ))}
            </>
          ) : (
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
                  rightButtonOnClick={function (value: any): void {
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
              pageSize: limit,
              currentPage: offset+1,
              pageCount: Math.ceil(count/limit),
              nextPage: ()=>handleNextPage(),
              prevPage: ()=>handlePreviousPage(),
              hasNext: offset*limit<=count,
              hasPrev: offset>0,
            }}
            isLoading={isLoading}
          />
        </div>
          </LoadingContainer>
        </div>
      </div>

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

export default MoveOnProduct

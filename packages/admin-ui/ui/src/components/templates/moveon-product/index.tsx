import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import React, { useEffect, useMemo, useState } from "react"
import MedusaAPI from "../../../services/api"
import { IInventoryProductDataType, IInventoryProductPayloadType, IInventoryProductSelectType, IInventoryQuery } from "../../../types/inventoryProduct"
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
import Button from "../../fundamentals/button"
import CrossIcon from "../../fundamentals/icons/cross-icon"
import Tooltip from "../../atoms/tooltip"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import Medusa from "@medusajs/medusa-js"
import { MEDUSA_BACKEND_URL } from "../../../constants/medusa-backend-url"
import { useAdminCreateBatchJob } from "medusa-react"
import useNotification from "../../../hooks/use-notification"
import { usePolling } from "../../../providers/polling-provider"
import { getErrorMessage } from "../../../utils/error-messages"
import useToggleState from "../../../hooks/use-toggle-state"
import ExportIcon from "../../fundamentals/icons/export-icon"

const MoveOnProduct = () => {
  const { resetInterval } = usePolling()
  const createBatchJob = useAdminCreateBatchJob()
  const notification = useNotification()
  const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
  const location = useLocation();
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
  const [newFiltersData, setNewFilersData] = useState<IInventoryQuery>(defaultMoveonInventoryFilter)
  const [limit, setLimit] = useState(defaultMoveonInventoryFilter.limit);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<IInventoryProductSelectType[]>([]);
  const [multipleImport, setMultipleImport] = useState(false);

  const { isLoading, isError, data, error, refetch } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch",newFiltersData], () =>
    MedusaAPI.moveOnInventory.list({ keyword: "beg", shop_id: 4, ...newFiltersData })
  )
  
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
    

  useEffect(() => {
    if (!isFetched && data?.data.filters?.configurator) {
      initializeAvailableFilter(data?.data.filters?.configurator);
    }
  }, [isFetched, initializeAvailableFilter, data?.data.filters?.configurator]);

  useEffect(() => {
    const params = queryString.parse((location.search).substring(1));
      if (!params.offset) {
        params.offset = "0";
        setOffset(0)
      }
      if (!params.limit) {
        params.limit = "20";
        setLimit(20)
      }
      const newParams = queryString.stringify({ ...filters, ...params }, { encode: false, skipEmptyString: true, skipNull: true });
      window.history.replaceState(null, 'Searching', `/a/moveon-inventory?${newParams}`)
    setFilters(params)
    setNewFilersData(params)
  }, [location])


  useEffect(() => {
    if (!data?.data && newFiltersData && isParamsUpdated) {
      let queryStirng = queryString.stringify(newFiltersData);
      if (searchedQueries !== queryStirng) {
        refetch()
        setSearchedQueries(queryStirng)
      }
    }
  }, [data?.data, newFiltersData, isParamsUpdated, searchedQueries]);

  const submitFilter = () => {
    const params = queryString.stringify({ ...filters, offset, limit }, { encode: false, skipEmptyString: true, skipNull: true });
    window.history.replaceState(null, 'Searching', `/a/moveon-inventory?${params}`)
    setNewFilersData(filters)
  }


  const handleProductView = (value: IInventoryProductDataType) => {
    setIsOpenModal(true)
    setOpenProductLink(value.link)
  }
  const onCloseModal = () => {
    setIsOpenModal(false)
  }

  const clearFilters = () => {
    handelAllFilterClear();
    setFilters(defaultMoveonInventoryFilter)
    setNewFilersData(defaultMoveonInventoryFilter)
    setSelectedSort(null)
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

  const handleSelect = ({ vpid, link }: IInventoryProductSelectType) => {
    const productKey = `${vpid}_${link}`;
    const updatedSet = new Set(selectedProducts.map(product => `${product.vpid}_${product.link}`));
  
    if (updatedSet.has(productKey)) {
      updatedSet.delete(productKey);
    } else {
      updatedSet.add(productKey);
    }
  
    const updatedArray = Array.from(updatedSet).map(key => {
      const [updatedVpid, updatedLink] = key.split('_');
      return { vpid: updatedVpid, link: updatedLink };
    });
  
    setSelectedProducts(updatedArray);
  };

  const handleImport = () =>{
      const reqObj = {
        dry_run: false,
        type: "product-import-manual",
        context: {
          products: selectedProducts
        },
      }
  
      createBatchJob.mutate(reqObj, {
        onSuccess: () => {
          resetInterval()
          notification("Success", "Successfully initiated multiple import products", "success")
        },
        onError: (err) => {
          notification("Error", getErrorMessage(err), "error")
        },
      })
    // medusa.admin.batchJobs.create({
    //   type: 'product-import-manual',
    //   context: {
    //     products: selectedProducts
    //   },
    //   dry_run: false
    // }).then(({ batch_job }) => {
    //   console.log(batch_job.id);
    // })
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
          <div className="px-3 py-3 flex gap-4 items-center">
          <Button
            variant={multipleImport?"primary":"secondary"}
            size="small"
            onClick={() => setMultipleImport(!multipleImport)}
            >
             <DownloadIcon size={20} />
              Multiple Import
          </Button>
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

       {multipleImport?
       <div className="bg-violet-10 flex items-center rounded-sm py-xsmall px-base text-grey-90 text-sm mb-4 justify-between relative">
        <div>{selectedProducts.length} Products are selected</div>

        <Button
        key="import"
        variant="secondary"
        size="small"
        onClick={() => handleImport()}
      >
         <DownloadIcon size={20} />
        Import
      </Button>
     
       <button className="cursor-pointer hover:text-red-700  absolute top-[-10px] right-[-5px]" onClick={()=>setSelectedProducts([])}>
       <Tooltip content="Deselect All">
        <CrossIcon />
      </Tooltip>
      </button>
      </div>
      :
      ""
      }

        <div className="-mx-4 flex flex-wrap justify-center">
         {layOut === "grid" ? (
            <>
              {data?.data?.products.map((item, index) => (
                <ProductGridCard
                route="product-list"
                productData={item}
                key={index}
                enableSelectOption={multipleImport}
                footerProgressBarEnabled={false}
                footerButtonEnabled={true}
                isSelect={Array.from(selectedProducts).some((product) => product.vpid === item.vpid && product.link === item.link)}
                handleSelect={handleSelect}
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
                  enableSelectOption={multipleImport}
                  footerProgressBarEnabled={false}
                  footerButtonEnabled={true}
                  isSelect={Array.from(selectedProducts).some((product) => product.vpid === item.vpid && product.link === item.link)}
                  handleSelect={handleSelect}
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
              currentPage: Math.floor(offset/limit)+1,
              pageCount: Math.ceil(count/limit),
              nextPage: ()=>handleNextPage(),
              prevPage: ()=>handlePreviousPage(),
              hasNext: offset+limit<=count,
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

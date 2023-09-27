import { useQuery } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import React, { useEffect, useState } from "react"
import MedusaAPI from "../../../services/api"
import { IInventoryProductDataType, IInventoryProductPayloadType, IInventoryProductSelectType, IInventoryQuery } from "../../../types/inventoryProduct"
import ListIcon from "../../fundamentals/icons/list-icon"
import TileIcon from "../../fundamentals/icons/tile-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"
import QuickViewModal from "../../organisms/quick-view-modal"
import { filterForTemporal } from "../../../utils/filterFixedData"
import InventoryProductFilters from "../inventory-product-filter"
import InventoryProductSort from "../inventory-product-sort"
import useInventoryProductFilters from "../../../hooks/use-inventory-product-filter"
import { useLocation, useNavigate } from "react-router-dom"
import queryString from "query-string"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"
import LoadingContainer from "../../atoms/loading-container"
import { TablePagination } from "../../organisms/table-container/pagination"
import { defaultMoveonInventoryFilter } from "../../../utils/filters"
import Button from "../../fundamentals/button"
import CrossIcon from "../../fundamentals/icons/cross-icon"
import Tooltip from "../../atoms/tooltip"
import DownloadIcon from "../../fundamentals/icons/download-icon"
import { useAdminCreateBatchJob } from "medusa-react"
import useNotification from "../../../hooks/use-notification"
import { usePolling } from "../../../providers/polling-provider"
import { getErrorMessage } from "../../../utils/error-messages"
import { queryClient } from "../../../constants/query-client"
import InventoryProductSortByShop from "../inventory-product-sort-by-shop"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import { IPriceSettingReturnType } from "../../../types/inventory-price-setting"
import InputField from "../../molecules/input"
import SearchIcon from "../../fundamentals/icons/search-icon"
import { getRandomValueForMoveonInventory } from "../../../utils/get-random-value-for-moveon"

const MoveOnProduct = () => {
  const { resetInterval } = usePolling()
  const navigate = useNavigate()
  const createBatchJob = useAdminCreateBatchJob()
  const notification = useNotification()
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSort, setSelectedSort] = useState<{
    label: string
    value: string
  } | null>(null)
  const [selectedSortByShop, setSelectedSortByShop] = useState<{
    label: string
    value: string
  }>({label:"1688", value:"10"})
  const [newFiltersData, setNewFilersData] = useState<IInventoryQuery>(defaultMoveonInventoryFilter)
  const [limit, setLimit] = useState(defaultMoveonInventoryFilter.limit);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<IInventoryProductSelectType[]>([]);
  const [multipleImport, setMultipleImport] = useState(false);
  const dialog = useImperativeDialog()

  const { isLoading, isError, data, error, refetch } = useQuery<
    AxiosResponse<IInventoryProductPayloadType>
  >(["inventory-fetch",newFiltersData], () =>
    MedusaAPI.moveOnInventory.list({ keyword: searchTerm.length? searchTerm: getRandomValueForMoveonInventory(), shop_id: selectedSortByShop.value, ...newFiltersData }))

    const selectedSortByShopData = filterForTemporal.shop.values.find(
      (x) => x.value === selectedSortByShop.value
    )  

    const { isLoading: isPriceSettingLoading, data: priceSettingData } = useQuery<
    AxiosResponse<IPriceSettingReturnType>
    >(["single-price-setting-retrieve", selectedSortByShopData], () =>
    MedusaAPI.InventoryPriceSettings.list(selectedSortByShopData?.key))
  
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

    useEffect(()=>{
      setSelectedProducts([])
      setMultipleImport(false)
    }, [selectedSortByShop])
    

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
        params.limit = defaultMoveonInventoryFilter.limit.toString();
        setLimit(defaultMoveonInventoryFilter.limit)
      }
      if (!params.shop_id) {
        params.shop_id = defaultMoveonInventoryFilter.shop_id;
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
    setSelectedSort(null)
    setSelectedSortByShop({label:"1688", value:"10"})
    setSearchTerm("")
    handleSearch(getRandomValueForMoveonInventory())
    setFilters(defaultMoveonInventoryFilter)
    setNewFilersData(defaultMoveonInventoryFilter)
  }

  const handleSorting = (value: { value: string; label: string }) => {
    setSelectedSort(value)
    const selectedSortData = filterForTemporal.sorter.values.find(
      (x) => x.title === value.label
    )
    if (selectedSortData) {
      const key = "sortType" as string
      const orderValue = "sortOrder" as string

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

  const handleSortingByShop = (value: { value: string; label: string }) => {
    setSelectedSortByShop(value)
    const selectedSortByShopData = filterForTemporal.shop.values.find(
      (x) => x.title === value.label
    )
    if (selectedSortByShopData) {
      const key = "shop_id" as string

      if (selectedSortByShopData?.key === defaultMoveonInventoryFilter.shop_id) {
        updateQueryParams({ [key]: undefined})
      } else {
        updateQueryParams({
          [key]: selectedSortByShopData?.value
        })
      }
      setIsParamsUpdated(true)
      refetch()
    }
  }

const handleSearch = (searchKeyword?:string) => {
      const key = "keyword" as string

      if (searchTerm === "") {
        updateQueryParams({ [key]: undefined})
      } else {
        updateQueryParams({
          [key]: searchKeyword ? searchKeyword : searchTerm
        })
      }
      setIsParamsUpdated(true)
      refetch()
}

  const handleMultipleImport = async() =>{  
    if(!priceSettingData?.data.count){
const shouldImport = await dialog({
heading: "Attention",
text: "No price role found for this store, set at least 1 price rule to import product",
confirmText: "Set Price Role", 
buttonVariant: "primary"
});
if (!shouldImport) {
  return
} else {
  navigate(`/a/settings/inventory-pricing`)
}
}
   setMultipleImport(!multipleImport)
  }

  const handleNextPage = () => {
     setOffset(offset + limit);
     handleFilterChange({offset: offset+limit, limit:limit})
  }

  const handlePreviousPage = () => {
    setOffset(offset - limit);
    handleFilterChange({offset: offset-limit, limit:limit})
  }

  const handleSelect = ({ vpid, link, title }: IInventoryProductSelectType) => {
    const productKey = `${vpid}_${link}`;
  
    setSelectedProducts(prevSelectedProducts => {
      const isSelected = prevSelectedProducts.some(product =>
        `${product.vpid}_${product.link}` === productKey
      );
  
      if (isSelected) {
        // Remove the item if it's already selected
        return prevSelectedProducts.filter(product =>
          `${product.vpid}_${product.link}` !== productKey
        );
      } else {
        // Add the item if it's not selected
        return [...prevSelectedProducts, { vpid, link, title }];
      }
    });
  };
  

  const handleImport = async(product?: IInventoryProductSelectType) =>{
    const productsToImport = product ? [product] : selectedProducts;
    if(selectedProducts.length===0 && !product){
      notification("Error", "You must select at least one product to import", "warning")
    }
    else {
      const selectedSortByShopData = filterForTemporal.shop.values.find(
        (x) => x.value === selectedSortByShop.value
      )  
      const shouldImportText = !priceSettingData?.data.count  ? "No price role found for this store, set at least 1 price rule to import product"
  : "Are you sure you want to import this product(s) with current price role?";

const shouldImport = await dialog({
  heading: !priceSettingData?.data.count?"Attention":"Confirm Import",
  text: shouldImportText,
  confirmText: !priceSettingData?.data.count? "Set Price Role":"Yes, confirm", 
  buttonVariant: !priceSettingData?.data.count?"primary":"nuclear"
});
  
      if (!shouldImport) {
        return
      }
      if(!priceSettingData?.data.count){
        navigate(`/a/settings/inventory-pricing`)
      }else {
      const reqObj = {
        dry_run: false,
        type: "moveOn-inventory-product-import",
        context: {
          products: productsToImport,
          store_slug: selectedSortByShopData?.key
        },
      }

      setSelectedProducts([])
      setMultipleImport(false)
  
      createBatchJob.mutate(reqObj, {
        onSuccess: (res) => {
          resetInterval()
          queryClient.invalidateQueries({ queryKey: ['inventory-retrive'] })
          notification("Success", `Successfully initiated import of ${productsToImport.length} products`, "success")
        },
        onError: (err) => {
          notification("Error", getErrorMessage(err), "error")
        },
      })
    }
  }
  }

  return (
    <>
      <div className="container"> 
        <div className="flex flex-wrap justify-between">
          <div className="px-3 py-3">
            <div className="flex justify-start gap-5">
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
             <InventoryProductSortByShop
                selectedValue={selectedSortByShop}
                sorter={filterForTemporal.shop}
                onChange={handleSortingByShop}
              />
            </div>
          </div>
          <div className="px-3 py-3 flex gap-4 items-center">
            <Tooltip side="top" content="Paste product link or Search from million of products...">
             <InputField
              value={searchTerm}
              suffix={<SearchIcon size="20" />}
              suffixHandler={()=>handleSearch(searchTerm)}
              className="w-[250px]"
              placeholder={"Search..."}
              onChange={(e)=>setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchTerm);
                }
              }
            } />
             </Tooltip>
          <Button
          loading={isPriceSettingLoading}
            variant={multipleImport?"primary":"secondary"}
            size="medium"
            onClick={handleMultipleImport}
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
                  <ListIcon size={20}
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
                  <TileIcon size={20}
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
        <LoadingContainer isLoading={isLoading || isPriceSettingLoading}>

        {data?.data.products.length===0 ?
      <div className="flex flex-col justify-center items-center h-[500px] gap-6">
       <div className="font-semibold text-lg tracking-twenty text-orange-50">Product Not Found</div>
        <button onClick={clearFilters} className="px-small py-xsmall">
          <div className="gap-x-xsmall text-grey-50 inter-grey-40 inter-small-semibold flex items-center">
            <ArrowLeftIcon size={20} />
             <span className="ml-1">Go back</span>
          </div>
        </button>
     </div> :
         layOut === "grid" ? (
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
                rightButtonOnClick={()=>{
                  handleImport({link:item.link, vpid: item.vpid, title: item.title})
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
                  rightButtonOnClick={()=>{
                    handleImport({link:item.link, vpid: item.vpid, title: item.title})
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

export default React.memo(MoveOnProduct)

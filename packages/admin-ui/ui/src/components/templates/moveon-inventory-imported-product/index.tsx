import { useQuery } from "@tanstack/react-query"
import { ProductLayoutType } from "../../../domain/moveon-inventory/overview"
import EditIcon from "../../fundamentals/icons/edit-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"
import { AxiosResponse } from "axios"
import Medusa from "../../../services/api"
import React, { useEffect, useState } from "react"
import { defaultMoveonInventoryFilter } from "../../../utils/filters"
import LoadingContainer from "../../atoms/loading-container"
import { TablePagination } from "../../organisms/table-container/pagination"
import { useNavigate } from "react-router-dom"
import { IRetrieveInventoryProductReturnType } from "../../../types/medusaProduct"

interface IProps {
  layout: ProductLayoutType
}

const MoveOnInventoryImportedProduct: React.FC<IProps> = ({ layout }) => {

  const navigate = useNavigate()
  const [limit, setLimit] = useState(defaultMoveonInventoryFilter.limit);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const { isLoading, isError, data, error } = useQuery<
  AxiosResponse<IRetrieveInventoryProductReturnType>
>(["inventory-retrieve", limit, offset], () =>
  Medusa.moveOnInventory.retrieveCollectionProduct({limit, offset})
)

  // if data is fetched from backend set new count and limit
  useEffect(()=>{
    if(data?.data){
      setCount(data?.data.count);
    }
    }, [data?.data])


    const handleNextPage = () => {
      setOffset(offset + limit);
   }
 
   const handlePreviousPage = () => {
     setOffset(offset - limit);
   }

  return (
    <>
    <LoadingContainer isLoading={isLoading}>
    {data?.data.products.length===0 ?
     <div className="flex flex-col justify-center items-center h-[500px] gap-6">
      <div className="font-semibold text-lg tracking-twenty text-orange-50">You have not imported any product yet.</div>
    </div>
     :
    <div className="container mx-auto px-2 py-2">
      <div className="-mx-4 flex flex-wrap justify-center">
        {layout === "grid" ? (
          <>
    {data?.data?.products.map((item, index) => (
              <ProductGridCard
              productData={
                {
                  title: item.title,
                  id: item.id,
                  shop_id: 0,
                  vpid: "",
                  vendor: "",
                  link: "",
                  image: item.thumbnail,
                  updated_at: item.updated_at,
                  discount: 0,
                  price: 0,
                  price_real: 0,
                }
              }
                route="imported-product"
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={true}
                footerButtonEnabled={true}
                isSelect={false}
                rightButtonIcon={
                  <EditIcon
                    style={{
                      marginRight: "6px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                }
                leftButtonTitle="View"
                rightButtonTitle="Edit"
                leftButtonOnClick={()=>{
                  navigate(`/a/products/${item.id}`, {state: "/a/moveon-inventory"})
                }}
                rightButtonOnClick={()=>{
                  navigate(`/a/products/${item.id}`, {state: "/a/moveon-inventory"})
                 }}
              />
            ))}
          </>
        ) : (
          <>
        {data?.data?.products.map((item, index) => (
              <ProductListCard
              productData={
                {
                  title: item.title,
                  id: item.id,
                  shop_id: 0,
                  vpid: "",
                  vendor: "",
                  link: "",
                  image: item.thumbnail,
                  updated_at: item.updated_at,
                  created_at: item.created_at,
                  discount: 0,
                  price: 0,
                  price_real: 0,
                }
              }
                route="imported-product"
                key={index}
                enableSelectOption={false}
                isSelect={false}
                footerProgressBarEnabled={false}
                footerButtonEnabled={true}
                rightButtonIcon={
                  <EditIcon
                    style={{
                      marginRight: "6px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                }
                leftButtonTitle="View"
                rightButtonTitle="Edit"
                leftButtonOnClick={()=>navigate(`/a/products/${item.id}`, {state: "/a/moveon-inventory"})}
                rightButtonOnClick={()=>navigate(`/a/products/${item.id}`, {state: "/a/moveon-inventory"})}
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
</>
  )
}

export default React.memo(MoveOnInventoryImportedProduct)

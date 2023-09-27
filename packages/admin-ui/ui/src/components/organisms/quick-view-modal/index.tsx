import React, { useState } from "react"
import { Rating } from "react-simple-star-rating"
import { AxiosResponse } from "axios"
import { useQuery } from "@tanstack/react-query"
import clsx from "clsx"

import Medusa from "../../../services/api"
import ProductDetailsAccordion from "../product-details-accordion"
import Button from "../../fundamentals/button"
import ChevronDownIcon from "../../fundamentals/icons/chevron-down"
import ChevronUpIcon from "../../fundamentals/icons/chevron-up"
import CrossIcon from "../../fundamentals/icons/cross-icon"
import ThumbnailCarousel from "../../molecules/carousel/thumbnail-carousel-bottom"
import Modal from "../../molecules/modal"
import LoadingContainer from "../../atoms/loading-container"
import MoveonInventoryHelpers from "../../../utils/moveon-inventory-helpers"
import { IProductDetailsResponse } from "../../../types/inventory-product-details"

type QuickViewModalProps = {
  handleClose: () => void
  onSubmit?: () => void
  loading: boolean
  title: string
  productLink: string
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  handleClose,
  title,
  loading,
  onSubmit,
  productLink}) => {

  const { isLoading, isError, data, error } = useQuery<
  AxiosResponse<IProductDetailsResponse>
>(["inventory-single-product-fetch", productLink], () =>
  Medusa.moveOnInventory.retrieveSingleProduct(productLink))


  const [skusToShow, setSkusToShow] = useState(3)
  const [isMinimized, setIsMinimized] = useState(false)

  const handleLoadMore = (skuLength: number) => {
    const newSkusToShow = skusToShow + 10;
    if (newSkusToShow >= skuLength) {
      // If the newSkusToShow value exceeds or equals the total number of skus, set it to the maximum value (skuLength).
      setSkusToShow(skuLength);
      setIsMinimized(true);
    } else {
      // If the newSkusToShow value is less than the total number of skus, increase it by 10.
      setSkusToShow(newSkusToShow);
    }
  };

  const valueClasses = clsx("mb-2 p-2 mr-2 border border-gray-100 rounded-md hover:bg-[#f26623] hover:text-white cursor-pointer")

  return (
    <Modal isLargeModal={false} handleClose={handleClose}>
      <Modal.Body className="max-w-[1000px]">
        <div className="flex justify-end">
          <span onClick={handleClose} className="mx-4 p-1 my-2 cursor-pointer hover:bg-red-400 hover:text-white">
            <CrossIcon size={20} />
          </span>
        </div>
        <LoadingContainer isLoading={isLoading}>
        {data?.data?.data ?
        <>
        <div>
          <p className="text-slate-950 px-8 py-1	text-[17px] font-semibold">
            {data.data.data.title}
          </p>
        </div>
        <Modal.Content>
          <div className="mx-auto flex  flex-wrap justify-between ">
            {Array.isArray(data.data.data.gallery) &&
            <ThumbnailCarousel
              gallery={data.data.data.gallery}
              thumbnailClassName="xl:w-[700px] 2xl:w-[850px]"
              galleryClassName="xl:w-[100px] 2xl:w-[120px]"
            />
            }

            <div className="mt-6 ml-3 w-1/2">
              {/* <h2 className="title-font text-sm tracking-widest text-gray-500">
                {data.data.data.vendor}
              </h2> */}
              <h2 className="title-font mb-1 text-3xl font-medium text-gray-900">
                {data.data.data.shop.name}
              </h2>
              <div className="mb-1 flex flex-row items-center">
               <Rating initialValue={Number(data.data.data.ratings_average) ?? 0} SVGstyle={ { 'display':'inline' } } readonly allowFraction size={20} />
                  <span className="ml-3 text-gray-600">{data.data.data.ratings_count ?? 0} Reviews</span>
                
                {/* Share icons */}
                <span className="ml-3 flex border-l-2 border-gray-200 py-2 pl-3">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="ml-2 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>

              {/* Price and Stock */}
              <div className="mb-3">
                <div className="flex  h-[70px] w-[130px] items-center justify-center rounded-sm	 border-[1.5px] border-[#D9D9D9] drop-shadow-sm ">
                  <div className="my-auto flex flex-col">
                    {data.data.data.price.original.max && <p className="text-center text-lg font-bold text-gray-900">
                    Ұ{data.data.data.price.original.max}
                    </p>}
                    <p className="text-center">{data.data.data.stock===0?"No stock available.":`1-${data.data.data.stock} Pieces`}</p>
                  </div>
                </div>
              </div>

              {/* Variation Props */}

              <div className="mt-6  items-center  border-gray-200 ">
                {data.data.data.variation.props && data.data.data.variation.props.map(prop=>
                <div className="flex flex-col" key={prop.id}>
                <div className="my-2">
                  <p>
                    <span className="mr-3 font-bold">{prop.name} : </span>
                  </p>
                </div>
               
                {/* if theres images available in color show it otherwise show the name */}
                {prop.name.toLowerCase().includes("color") ?
                <div className="flex  flex-wrap">
                    {prop.values.map((value) =>
                        value.thumb ?
                        <div key={value.id} className="h-[45px] w-[45px] m-1 hover:border-[#f26623] hover:border">
                          <img className="object-cover rounded-lg border cursor-pointer h-[100%] w-[100%]" src={value.thumb} alt="" />
                        </div>
                        :
                        <span className={valueClasses} key={value.id}>{value.name}</span>
                      )
                    }
                  </div>
                  :
                <div className="flex  flex-wrap">
                {prop.values.map((value)=>
                <span className={valueClasses} key={value.id}>{value.name}</span>
                )}
                </div>
                }
                </div>
                )}
              </div>

              {/* Size/Color and Price */}
              {data.data.data.variation.props && data.data.data.variation.skus &&
              <div className="mt-6 mb-5  items-center  border-gray-200 pb-5">
                <div className="flex flex-col">
                  <div className="flex justify-between px-3">
                    <div>
                      {!MoveonInventoryHelpers.checkIfSizeVariantExists(data.data.data.variation.props)?
                        "Color":"Size"
                      }
                    </div>
                    <div>Price</div>
                  </div>


                  {!MoveonInventoryHelpers.checkIfSizeVariantExists(data.data.data.variation.props)?
                  data.data.data.variation.skus.slice(0, skusToShow).map((sku) => (
                    <div
                      key={sku.id}
                      className="my-1 flex justify-between rounded-md border border-gray-200 px-3 py-1 font-semibold text-black"
                    >
                      <div className="flex items-center">{MoveonInventoryHelpers.getNameForColorIds(sku.props, data.data.data.variation.props)}</div>
                      <div className="pl-5">
                      {sku.price.offer?
                        <p>
                        <span>Ұ{sku.price.offer}</span>
                        <span className="-mt-2 text-center !text-[12px] text-gray-500 line-through">
                        Ұ{sku.price.actual}
                        </span>
                        </p>
                        :
                        <p>Ұ{sku.price.actual}</p>
                        }
                      </div>
                    </div>
                    ))
                    :
                    data.data.data.variation.skus.slice(0, skusToShow).map((sku) => (
                    <div
                      key={sku.id}
                      className="my-1 flex justify-between rounded-md border border-gray-200 px-3 py-1 font-semibold text-black"
                    >
                      <div className="flex items-center">{MoveonInventoryHelpers.getNameForSizeIds(sku.props, data.data.data.variation.props)}</div>
                      <div className="pl-5">
                      Ұ{sku.price.offer?
                        <span>
                        <span>Ұ{sku.price.offer}</span>
                        <span className="-mt-2 text-center !text-[12px] text-gray-500 line-through">
                        Ұ{sku.price.actual}
                        </span>
                        </span>
                        :
                        <span>Ұ{sku.price.actual}</span>
                        }
                      </div>
                    </div>
                  ))
                  }
                  <div className="mx-auto flex">
                    {data.data.data.variation.skus && skusToShow < data.data.data.variation.skus.length && (
                      <Button
                        icon={<ChevronDownIcon />}
                        variant="secondary"
                        size="medium"
                        className="mt-3 rounded border-none  bg-none py-2 px-4 font-semibold text-black focus:border-none"
                        onClick={()=>handleLoadMore(data.data.data.variation.skus?.length ?? 0)}
                      >
                        View more
                      </Button>
                    )}
                    {skusToShow > 3 && (
                      <Button
                        icon={<ChevronUpIcon />}
                        variant="secondary"
                        size="medium"
                        className="mt-3 ml-3  rounded border-none py-2 px-4 font-semibold "
                        onClick={() => {
                          setSkusToShow(3)
                          setIsMinimized(false)
                        }}
                      >
                        View less
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              }

              <ProductDetailsAccordion specifications= {data.data.data.specifications} />
            </div>
          </div>
        </Modal.Content>
        </>
        :
        <div className="font-semibold text-lg tracking-twenty text-orange-50 h-[500px] flex items-center justify-center">Product Details Not Found</div>
        }
        </LoadingContainer>
      </Modal.Body>
    </Modal>
  )
}

export default QuickViewModal



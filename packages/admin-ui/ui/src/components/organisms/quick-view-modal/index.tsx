import React, { useState } from "react"
import Button from "../../fundamentals/button"
import ChevronDownIcon from "../../fundamentals/icons/chevron-down"
import ChevronUpIcon from "../../fundamentals/icons/chevron-up"
import CrossIcon from "../../fundamentals/icons/cross-icon"
import ThumbnailCarousel from "../../molecules/carousel/thumbnail-carousel-bottom"
import Modal from "../../molecules/modal"
import ProductDetailsAccordion from "../product-details-accordion"

type QuickViewModalProps = {
  handleClose: () => void
  onSubmit?: () => void
  loading: boolean
  title: string
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({
  handleClose,
  title,
  loading,
  onSubmit,
}) => {
  const [skusToShow, setSkusToShow] = useState(3)
  const [isMinimized, setIsMinimized] = useState(false)

  const images = [
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 1,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 2,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 2,
    },
    
  ]

  const skus = [
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
    { price: 12.568, size: 34 },
 
  ]

  const handleLoadMore = () => {
    if (skusToShow >= 4) {
      setIsMinimized(true)
    }
    setSkusToShow(skusToShow + 10)
  }

  return (
    <Modal isLargeModal={false} handleClose={handleClose}>
      <Modal.Body className="max-w-[1000px]">
        {/* <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Product details</span>
        </Modal.Header> */}
        <div className="flex justify-end">
          {" "}
          <span onClick={handleClose} className="mx-4 my-2 cursor-pointer">
            {" "}
            <CrossIcon size={20} />
          </span>
        </div>
        <div>
          {" "}
          <p className="text-slate-950 px-8 py-1	text-[17px] font-semibold">
            {" "}
            Women s Slippers- Spring and Autumn Months Shoes Summer Pregnant
            Women Slippers Bag with Thin Section Postpartum Breathable Maternity
            Non-Slip Indoor Flat Shoes Summer
          </p>{" "}
        </div>
        <Modal.Content>
          <div className="mx-auto flex  flex-wrap justify-between ">
            <ThumbnailCarousel
              gallery={images}
              thumbnailClassName="xl:w-[700px] 2xl:w-[850px]"
              galleryClassName="xl:w-[100px] 2xl:w-[120px]"
            />

            <div className="mt-6 ml-3 w-1/2">
              <h2 className="title-font text-sm tracking-widest text-gray-500">
                BRAND NAME
              </h2>
              <h1 className="title-font mb-1 text-3xl font-medium text-gray-900">
                The Catcher in the Rye
              </h1>
              <div className="mb-1 flex">
                <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="ml-3 text-gray-600">4 Reviews</span>
                </span>
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
              <div className="mb-3">
                <div className="flex  h-[70px] w-[130px] items-center justify-center rounded-sm	 border-[1.5px] border-[#D9D9D9] drop-shadow-sm ">
                  <div className="my-auto flex flex-col">
                    <p className="text-center text-lg font-bold text-gray-900">
                      {" "}
                      ৳ 127.08
                    </p>
                    <p className="text-center">1-8999 Pieces</p>
                  </div>
                </div>
              </div>
              {/* color or images */}

              <div className="mt-6  items-center  border-gray-200 ">
                <div className="flex flex-col">
                  <div className="my-2">
                    <p>
                      {" "}
                      <span className="mr-3">Color : </span>
                    </p>
                  </div>

                  <div className="flex  flex-wrap">
                    {images.map((x, index) => {
                      return (
                        <div key={index} className="h-[45px] w-[45px] m-1">
                          <img className="object-contain rounded-lg border cursor-pointer h-[100%] w-[100%]" src={x.url} alt="" />
                        </div>
                      )
                    })}

                    {/* <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                    <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                    <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-red-500 focus:outline-none"></button> */}
                  </div>
                </div>
              </div>

              {/* size */}
              <div className="mt-6 mb-5  items-center  border-gray-200 pb-5">
                <div className="flex flex-col">
                  <div className="flex justify-between px-3">
                    <div>Size</div>
                    <div>Price</div>
                  </div>

                  {skus.slice(0, skusToShow).map((sku, index) => (
                    <div
                      key={index}
                      className="my-1 flex justify-between rounded-md border border-gray-200 px-3 py-1 font-semibold text-black"
                    >
                      <div className="flex items-center">{sku.size}</div>
                      <div className="">
                        <p>{sku.price}</p>
                        <p className="-mt-2 text-center !text-[12px] text-gray-500 line-through">
                          {sku.price}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="mx-auto flex">
                    {skusToShow < skus.length && (
                      <Button
                        icon={<ChevronDownIcon />}
                        variant="secondary"
                        size="medium"
                        className="mt-3 rounded border-none  bg-none py-2 px-4 font-semibold text-black focus:border-none"
                        onClick={handleLoadMore}
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
              <ProductDetailsAccordion />
            </div>
          </div>
        </Modal.Content>
      </Modal.Body>
    </Modal>
  )
}

export default QuickViewModal

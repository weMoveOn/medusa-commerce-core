import React from "react"
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
      id: 3,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 4,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 5,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 6,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 7,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 8,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 9,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 10,
    },
    {
      url: "https://www.whitmorerarebooks.com/pictures/medium/2465.jpg",
      id: 11,
    },
    {
      url: "https://static.import-staging.baharcart.com/uploads/images/cc809576-bf8c-467c-b516-845e1b15293f-1688457897.jpg",
      id: 12,
    },
  ]
  return (

    <Modal isLargeModal={false} handleClose={handleClose}> 
      <Modal.Body   className="max-w-[1000px]">
        {/* <Modal.Header handleClose={handleClose}>
          <span className="inter-xlarge-semibold">Product details</span>
        </Modal.Header> */}
        <div className="flex justify-end"> <span onClick={handleClose} className="mx-4 my-2 cursor-pointer"> <CrossIcon size={20} /></span></div>
        <div> <p className="px-8 py-1 text-slate-950	font-semibold text-[17px]"> Women s Slippers- Spring and Autumn Months Shoes Summer Pregnant Women Slippers Bag with Thin Section Postpartum Breathable Maternity Non-Slip Indoor Flat Shoes Summer</p> </div>
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
                    <div className="w-[130px]  border-[1.5px] flex items-center justify-center drop-shadow-sm	 h-[70px] rounded-sm border-[#D9D9D9] ">   
                     <div className="flex flex-col my-auto">
                        <p className="text-center text-gray-900 font-bold text-lg"> ৳ 127.08</p>
                        <p className="text-center">1-8999 Pieces</p>
                     </div>
                    </div>
                  </div>
               


                <div>
                <p className="leading-relaxed 	">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
       
                  umami cardigan.
                </p>


                </div>
            
                <div className="mt-6 mb-5 flex items-center border-b-2 border-gray-200 pb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                    <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                    <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-red-500 focus:outline-none"></button>
                  </div>
                  <div className="ml-6 flex items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="appearance-none rounded border border-gray-400 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="pointer-events-none absolute right-0 top-0 flex h-full w-10 items-center justify-center text-center text-gray-600">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>

                <ProductDetailsAccordion/>
                {/* <div className="flex">
                  <span className="title-font text-2xl font-medium text-gray-900">
                    $58.00
                  </span>
                  <button className="ml-auto flex rounded border-0 bg-red-500 py-2 px-6 text-white hover:bg-red-600 focus:outline-none">
                    Button
                  </button>
                  <button className="ml-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-gray-200 p-0 text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div> */}
             </div>

         
              {/* <img alt="ecommerce" className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://www.whitmorerarebooks.com/pictures/medium/2465.jpg"/> */}
          </div>
        </Modal.Content>
      </Modal.Body>
      
    </Modal>
  )
}

export default QuickViewModal

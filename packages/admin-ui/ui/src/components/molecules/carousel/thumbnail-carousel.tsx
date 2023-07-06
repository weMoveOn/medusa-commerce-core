import {
  Navigation,
  Swiper,
  SwiperOptions,
  SwiperSlide,
  Thumbs,
} from "./slider"

import cn from "classnames"
import React, { useRef, useState } from "react"

interface Props {
  gallery: any
  thumbnailClassName?: string
  galleryClassName?: string
  showBtnLightBox?: boolean
}

// product gallery breakpoints
const galleryCarouselBreakpoints = {
  1280: {
    slidesPerView: 4,
    direction: "vertical",
  },
  0: {
    slidesPerView: 3,
  },
}

const swiperParams: SwiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
}

const ThumbnailCarousel: React.FC<Props> = ({
  gallery,
  thumbnailClassName = "xl:w-[480px] 2xl:w-[650px]",
  galleryClassName = "xl:w-[100px] 2xl:w-[120px]",
  showBtnLightBox = false,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full xl:flex xl:flex-row-reverse">
      <div
        className={cn(
          "xl:ms-5 relative  flex w-full overflow-hidden rounded-md",
          thumbnailClassName
        )}
      >
        <Swiper
          id="productGallery"
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Navigation, Thumbs]}
          navigation={{
            prevEl: prevRef.current!, // Assert non-null
            nextEl: nextRef.current!, // Assert non-null
          }}
          {...swiperParams}
        >
          {gallery.map((item: any) => (
            <SwiperSlide key={`product-gallery-${item.id}`} className="flex">
              <img
                src={""}
                alt={`Product gallery ${item.id}`}
                width={650}
                height={590}
                className="rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute top-2/4 z-10 flex w-full items-center justify-between px-2.5">
          <div
            ref={prevRef}
            className="bg-skin-fill hover:bg-skin-primary hover:text-skin-inverted shadow-navigation flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full text-base transition duration-300 focus:outline-none md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl"
          >
            {">"}
          </div>
          <div
            ref={nextRef}
            className="bg-skin-fill hover:bg-skin-primary hover:text-skin-inverted shadow-navigation flex h-7 w-7 -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full text-base transition duration-300 focus:outline-none  md:h-8 md:w-8 lg:h-9 lg:w-9 lg:text-lg xl:h-10 xl:w-10 xl:text-xl"
          >
            {"<"}
          </div>
        </div>
      </div>
      {/* End of product main slider */}

      <div className={`flex-shrink-0 ${galleryClassName}`}>
        <Swiper
          id="productGalleryThumbs"
          onSwiper={setThumbsSwiper}
          spaceBetween={15}
          watchSlidesProgress={true}
          freeMode={true}
          effect={"slide"}
          breakpoints={{
            1280: {
              slidesPerView: 4,
              direction: "vertical",
            },
            767: {
              slidesPerView: 4,
              direction: "horizontal",
            },
            0: {
              slidesPerView: 3,
              direction: "horizontal",
            },
          }}
        >
          {gallery.map((item: any) => (
            <SwiperSlide
              key={`product-thumb-gallery-${item.id}`}
              className="border-skin-base flex cursor-pointer overflow-hidden rounded border transition hover:opacity-75"
            >
              <img
                src={"#"}
                alt={`${item.attributes.alt}`}
                width={170}
                height={170}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default ThumbnailCarousel

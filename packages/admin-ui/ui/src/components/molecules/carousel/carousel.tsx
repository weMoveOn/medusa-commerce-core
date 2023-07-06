import cn from "classnames"
import { useRouter } from "next/router"
import React, { useRef } from "react"
import "swiper/css/autoplay"
import "swiper/css/grid"
import "swiper/css/pagination"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"
import ArrowRightIcon from "../../fundamentals/icons/arrow-right-icon"
import { Autoplay, Grid, Navigation, Pagination, Swiper } from "./slider"

type CarouselPropsType = {
  className?: string
  buttonGroupClassName?: string
  prevActivateId?: string
  nextActivateId?: string
  prevButtonClassName?: string
  nextButtonClassName?: string
  buttonSize?: "default" | "small"
  centeredSlides?: boolean
  loop?: boolean
  slidesPerColumn?: number
  spaceBetween?: number
  breakpoints?: {} | any
  pagination?: {} | any
  navigation?: {} | any
  autoplay?: {} | any
  grid?: {} | any
  children: React.ReactNode
}

const Carousel: React.FunctionComponent<CarouselPropsType> = ({
  children,
  className = "",
  buttonGroupClassName = "",
  prevActivateId = "",
  nextActivateId = "",
  prevButtonClassName = "start-1 xl:start-5",
  nextButtonClassName = "end-1 xl:end-5",
  buttonSize = "default",
  breakpoints,
  navigation = true,
  pagination = false,
  loop = true,
  slidesPerColumn = 1,
  spaceBetween = 20,
  grid,
  autoplay,
  ...props
}) => {
  const { locale } = useRouter()
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const nextButtonClasses = cn(
    "swiper-next w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded bg-skin-fill absolute transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    nextButtonClassName
  )
  const prevButtonClasses = cn(
    "swiper-prev w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10 text-base lg:text-lg xl:text-xl cursor-pointer flex items-center justify-center rounded bg-skin-fill absolute transition duration-300 hover:bg-skin-primary hover:text-skin-inverted focus:outline-none transform shadow-navigation",
    { "3xl:text-2xl": buttonSize === "default" },
    prevButtonClassName
  )
  return (
    <div
      className={`carouselWrapper  relative ${className} ${
        pagination ? "dotsCircle" : "dotsCircleNone"
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay, Pagination, Grid]}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        pagination={pagination}
        grid={grid}
        navigation={
          navigation
            ? {
                prevEl: prevActivateId.length
                  ? `#${prevActivateId}`
                  : prevRef.current!, // Assert non-null
                nextEl: nextActivateId.length
                  ? `#${nextActivateId}`
                  : nextRef.current!, // Assert non-null
              }
            : {}
        }
        {...props}
      >
        {children}
      </Swiper>
      {Boolean(navigation) && (
        <div
          className={`swiper-button absolute top-2/4 z-10 flex w-full items-center ${buttonGroupClassName}`}
        >
          {prevActivateId.length > 0 ? (
            <div className={prevButtonClasses} id={prevActivateId}>
              <ArrowLeftIcon />
            </div>
          ) : (
            <div ref={prevRef} className={prevButtonClasses}>
              <ArrowLeftIcon />
            </div>
          )}

          {nextActivateId.length > 0 ? (
            <div className={nextButtonClasses} id={nextActivateId}>
              <ArrowRightIcon />
            </div>
          ) : (
            <div ref={nextRef} className={nextButtonClasses}>
              <ArrowRightIcon />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Carousel

import * as React from "react"
import { IconProps } from "./types"

const StepperArrowIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", width = 200, height = 56, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        height={`${height}`}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <g filter="url(#filter0_d_748_8709)">
          <path
            d="M4 4H174.623L196 28L174.623 52H4L23.3963 28L4 4Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_748_8709"
            x="0"
            y="0"
            width={`${width}`}
            height={`${height}`}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.333333 0 0 0 0 0.333333 0 0 0 0 0.333333 0 0 0 0.2 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_748_8709"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_748_8709"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    )
  }
)

StepperArrowIcon.displayName = "StepperArrow"

export default StepperArrowIcon

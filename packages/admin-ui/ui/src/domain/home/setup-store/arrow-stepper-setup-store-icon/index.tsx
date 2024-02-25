import * as React from "react"

interface IconProps extends React.SVGAttributes<SVGElement> {
  children?: never
  color?: string
}

const StepperArrowSetupStoreIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", width = 200, height = 56, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="171"
        height="56"
        viewBox="0 0 171 56"
        fill={color}
      >
        <g filter="url(#filter0_d_457_3980)">
          <path
            d="M4 4H148.852L167 28L148.852 52H4L20.4667 28L4 4Z"
            fill={color}
          />
        </g>
        <defs>
          <filter
            id="filter0_d_457_3980"
            x="0"
            y="0"
            width="171"
            height="56"
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
              result="effect1_dropShadow_457_3980"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_457_3980"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    )
  }
)

StepperArrowSetupStoreIcon.displayName = "IconStepperArrowSetupStore"

export default StepperArrowSetupStoreIcon

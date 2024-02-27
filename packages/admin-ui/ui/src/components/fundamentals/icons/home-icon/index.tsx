import * as React from "react"
import { IconProps } from "./types"

const HomeIcon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", width = 24, height = 24, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
      >
        <path
          d="M7.99932 21L7.74868 17.4911C7.61394 15.6046 9.10803 14 10.9993 14C12.8906 14 14.3847 15.6046 14.25 17.4911L13.9993 21"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M1.35139 12.2135C0.998371 9.91624 0.821861 8.76763 1.25617 7.74938C1.69047 6.73112 2.65403 6.03443 4.58114 4.64106L6.02099 3.6C8.41829 1.86667 9.61694 1 11 1C12.3831 1 13.5817 1.86667 15.979 3.6L17.4189 4.64106C19.346 6.03443 20.3095 6.73112 20.7438 7.74938C21.1781 8.76763 21.0016 9.91624 20.6486 12.2135L20.3476 14.1724C19.8471 17.4289 19.5969 19.0572 18.429 20.0286C17.2611 21 15.5537 21 12.1388 21H9.86119C6.44633 21 4.73891 21 3.571 20.0286C2.40309 19.0572 2.15287 17.4289 1.65243 14.1724L1.35139 12.2135Z"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

HomeIcon.displayName = "HomeIcon"

export default HomeIcon

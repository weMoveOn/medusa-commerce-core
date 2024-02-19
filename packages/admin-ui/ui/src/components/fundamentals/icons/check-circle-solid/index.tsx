import * as React from "react"
import { IconProps } from "./types"

const CheckCircleSolid = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "black", width = 24, height = 24, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        height={`${height}`}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d="M20.5 4C29.3366 4 36.5 11.1634 36.5 20C36.5 28.8366 29.3366 36 20.5 36C11.6634 36 4.5 28.8366 4.5 20C4.5 11.1634 11.6634 4 20.5 4ZM27.4071 14.8929C27.0426 14.5284 26.4668 14.5041 26.0741 14.82L25.9929 14.8929L17.9 22.9858L15.0071 20.0929C14.6166 19.7024 13.9834 19.7024 13.5929 20.0929C13.2284 20.4574 13.2041 21.0332 13.52 21.4259L13.5929 21.5071L17.1929 25.1071C17.5574 25.4716 18.1332 25.4959 18.5259 25.18L18.6071 25.1071L27.4071 16.3071C27.7976 15.9166 27.7976 15.2834 27.4071 14.8929Z"
          fill={color}
        />
      </svg>
    )
  }
)

CheckCircleSolid.displayName = "CheckCircleSolid"

export default CheckCircleSolid

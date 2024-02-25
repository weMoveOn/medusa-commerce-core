import * as React from "react"
import { IconProps } from "./types"

const TriangleUp = React.forwardRef<SVGSVGElement, IconProps>(
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
          d="M6.60204 16.9814C5.5281 16.9814 4.95412 15.7165 5.66132 14.9083L11.1831 8.59765C11.8804 7.80083 13.1199 7.80083 13.8172 8.59765L19.339 14.9083C20.0462 15.7165 19.4722 16.9814 18.3983 16.9814H6.60204Z"
          fill={color}
        />
      </svg>
    )
  }
)

TriangleUp.displayName = "TriangleUp"

export default TriangleUp

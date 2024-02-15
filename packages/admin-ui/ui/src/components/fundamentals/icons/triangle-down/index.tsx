import * as React from "react"
import { IconProps } from "./types"

const TriangleDown = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", width = 24, height = 24, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={`${width}`}
        height={`${height}`}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
      >
        <path
          d="M4.63594 8.65781L4.72031 8.75625L11.0953 16.0922C11.3109 16.3406 11.6344 16.4953 11.9953 16.4953C12.3562 16.4953 12.6797 16.3359 12.8953 16.0922L19.2656 8.77031L19.3734 8.64844C19.4531 8.53125 19.5 8.39063 19.5 8.24063C19.5 7.83281 19.1531 7.5 18.7219 7.5H5.27812C4.84687 7.5 4.5 7.83281 4.5 8.24063C4.5 8.39531 4.55156 8.54062 4.63594 8.65781Z"
          fill="black"
        />
      </svg>
    )
  }
)

TriangleDown.displayName = "TriangleDown"

export default TriangleDown

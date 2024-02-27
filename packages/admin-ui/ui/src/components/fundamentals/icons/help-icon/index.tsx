import * as React from "react"
import { IconProps } from "./types"

const HelpIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
          d="M1.5 11C1.5 6.52166 1.5 4.28249 2.89124 2.89124C4.28249 1.5 6.52166 1.5 11 1.5C15.4783 1.5 17.7175 1.5 19.1088 2.89124C20.5 4.28249 20.5 6.52166 20.5 11C20.5 15.4783 20.5 17.7175 19.1088 19.1088C17.7175 20.5 15.4783 20.5 11 20.5C6.52166 20.5 4.28249 20.5 2.89124 19.1088C1.5 17.7175 1.5 15.4783 1.5 11Z"
          stroke="#141B34"
          strokeWidth="2"
        />
        <path
          d="M9 8C9 6.89543 9.89543 6 11 6C12.1046 6 13 6.89543 13 8C13 8.39815 12.8837 8.76913 12.6831 9.08079C12.0854 10.0097 11 10.8954 11 12V12.5"
          stroke="#141B34"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10.992 16H11.001"
          stroke="#141B34"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

HelpIcon.displayName = "HelpIcon"

export default HelpIcon

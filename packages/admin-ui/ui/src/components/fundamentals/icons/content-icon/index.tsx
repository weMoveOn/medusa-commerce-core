import * as React from "react"
import { IconProps } from "./types"

const ContentIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
          stroke="#262B28"
          strokeWidth="2"
        />
        <circle cx="15.5" cy="6.5" r="1.5" stroke="#262B28" strokeWidth="2" />
        <path
          d="M1 13.1354C1.66663 13.0455 2.3406 13.0011 3.01569 13.0027C5.87163 12.9466 8.65761 13.7729 10.8765 15.3342C12.9345 16.7821 14.3805 18.7749 15 21"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M12 17C13.7015 15.6733 15.5345 14.9928 17.3862 15.0001C18.4362 14.999 19.4812 15.2216 20.5 15.6617"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

ContentIcon.displayName = "ContentIcon"

export default ContentIcon

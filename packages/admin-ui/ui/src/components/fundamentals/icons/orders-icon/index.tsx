import * as React from "react"
import { IconProps } from "./types"

const OrdersIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5 12.5H15.5743C14.7322 12.5 14.0706 13.2036 13.6995 13.9472C13.2963 14.7551 12.4889 15.5 11 15.5C9.51113 15.5 8.70373 14.7551 8.30054 13.9472C7.92942 13.2036 7.26777 12.5 6.42566 12.5H1.5"
          stroke={color}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
)

OrdersIcon.displayName = "OrdersIcon"

export default OrdersIcon

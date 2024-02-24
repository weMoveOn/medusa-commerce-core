import * as React from "react"
import { IconProps } from "./types"

const ProductsIcon = React.forwardRef<SVGSVGElement, IconProps>(
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
          d="M1 12.4286V7H21V12.4286C21 16.4692 21 18.4895 19.6983 19.7447C18.3965 21 16.3014 21 12.1111 21H9.88889C5.69863 21 3.6035 21 2.30175 19.7447C1 18.4895 1 16.4692 1 12.4286Z"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 7L1.96154 4.69231C2.70726 2.90257 3.08013 2.0077 3.8359 1.50385C4.59167 1 5.56112 1 7.5 1H14.5C16.4389 1 17.4083 1 18.1641 1.50385C18.9199 2.0077 19.2927 2.90257 20.0385 4.69231L21 7"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M11 7V1"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M9 11H13"
          stroke="#262B28"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }
)

ProductsIcon.displayName = "ProductsIcon"

export default ProductsIcon

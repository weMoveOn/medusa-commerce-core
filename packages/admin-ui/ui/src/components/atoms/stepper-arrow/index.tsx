import React, { ReactNode } from "react"
import "./stepper-arrow.module.css"
import IconCircle from "../../fundamentals/icon-circle"
const StepperArrow = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <div className="relative flex gap-3">
        <div
          id="pointer1"
          className="absolute z-20 flex items-center justify-center"
        >
          <div className="flex gap-1 text-white">
            <IconCircle className="bg-white" />
            <h4>Business Need</h4>
          </div>
        </div>
        <div
          id="pointer2"
          className="absolute z-10 flex items-center justify-center"
        >
          <div className="flex gap-1 text-white">
            <IconCircle className="bg-white" />
            <h4>Product Type</h4>
          </div>
        </div>
        <div id="pointer3" className="absolute "></div>
      </div>
    </>
  )
}

export default StepperArrow

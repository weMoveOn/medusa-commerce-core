import { Check } from "@medusajs/icons"
import { clx } from "../../../../../utils/clx"
const IconStepperArrowInComplete = ({
  className,
  cssId,
}: {
  className?: string
  cssId: string
}) => {
  return (
    <div
      id={cssId}
      className={clx("absolute  flex items-center justify-center", className)}
    >
      <div className="flex gap-1 text-black">
        <div className="h-[24px] w-[24px] rounded-full border border-black">
          <Check className="hidden" />
        </div>
        <h4>Product Type</h4>
      </div>
    </div>
  )
}

export default IconStepperArrowInComplete

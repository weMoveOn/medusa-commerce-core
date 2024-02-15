import React, { ReactNode } from "react"
import StepperArrow from "../../../../components/fundamentals/icons/stepper-arrow"
import { clx } from "../../../../utils/clx"

interface StepProps {
  label: string
  icon?: ReactNode
  color?: string
  className?: string
}

interface StepProviderProps {
  children: ReactNode
  color?: string
}

const StepProvider: React.FC<StepProviderProps> = ({
  children,
  color = "#EEE",
}) => {
  return (
    <div className="relative">
      <div>
        <StepperArrow color={color} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div>{children}</div>
      </div>
    </div>
  )
}

const Step: React.FC<StepProps> = ({ label, icon, color, className }) => {
  return (
    <StepProvider color={color}>
      <div className={clx("flex items-center justify-center gap-1 ")}>
        <div className="h-6 w-6 rounded-full border bg-white ">
          <div className="flex flex-col items-center justify-center">
            {icon}
          </div>
        </div>
        <p className={clx(className)}>{label}</p>
      </div>
    </StepProvider>
  )
}

export default Step

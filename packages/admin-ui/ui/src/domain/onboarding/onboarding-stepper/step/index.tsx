import React, { ReactNode } from "react"
import StepperArrow from "../../../../components/fundamentals/icons/stepper-arrow"
import { clx } from "../../../../utils/clx"

interface StepProps {
  label: string
  icon?: ReactNode
  color?: string
  className?: string
  textColor?: string
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
    <div className="relative -ml-[12px]">
      <div>
        <StepperArrow color={color} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div>{children}</div>
      </div>
    </div>
  )
}

const Step: React.FC<StepProps> = ({
  label,
  icon,
  color,
  className,
  textColor,
}) => {
  return (
    <div className={clx(className)}>
      <StepProvider color={color}>
        <div className={clx("flex items-center justify-center gap-1 ")}>
          <div className="h-6 w-6 rounded-full border bg-white ">
            <div className="flex flex-col items-center justify-center">
              {icon}
            </div>
          </div>
          <p className={clx(textColor)}>{label}</p>
        </div>
      </StepProvider>
    </div>
  )
}

export default Step

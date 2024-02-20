import React, { ReactNode } from "react"
import { clx } from "../../../utils/clx"

interface StepProps {
  label: string
  icon?: ReactNode
  color?: string
  className?: string
  textColor?: string
  width?: number
  height?: number
  IconArrowBg: ReactNode
  iconBorderClassName?: string
}

interface StepProviderProps {
  children: ReactNode
  color?: string
  width?: number
  height?: number
  IconArrowBg: ReactNode
}

const StepProvider: React.FC<StepProviderProps> = ({
  children,
  color = "#EEE",
  width,
  height,
  IconArrowBg,
}) => {
  return (
    <div className="relative -ml-[12px]">
      <div>{IconArrowBg}</div>
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
  width,
  height,
  IconArrowBg,
  iconBorderClassName,
}) => {
  return (
    <div className={clx(className)}>
      <StepProvider
        IconArrowBg={IconArrowBg}
        width={width}
        height={height}
        color={color}
      >
        <div className={clx("flex items-center justify-center gap-1 ")}>
          <div
            className={clx(
              "h-6 w-6 rounded-full border border-black bg-white ",
              iconBorderClassName
            )}
          >
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

import clsx from "clsx"
import React from "react"

type IconBadgeProps = {
  variant?:
    | "primary"
    | "danger"
    | "success"
    | "warning"
    | "ghost"
    | "default"
    | "disabled"
} & React.HTMLAttributes<HTMLDivElement>

const IconCircle: React.FC<IconBadgeProps> = ({
  children,
  variant,
  className,
  ...rest
}) => {
  return (
    <>
      <div
        className={clsx("h-[24px] w-[24px] rounded-full bg-black", className)}
      ></div>
    </>
  )
}

export default IconCircle

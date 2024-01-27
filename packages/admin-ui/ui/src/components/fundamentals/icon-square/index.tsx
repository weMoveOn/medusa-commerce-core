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
    | "size"
} & React.HTMLAttributes<HTMLDivElement>

const IconSquare: React.FC<IconBadgeProps> = ({
  children,
  variant,
  className,
  ...rest
}) => {
  return (
    <>
      <div className={clsx("h-4  w-4 bg-black", className)}></div>
    </>
  )
}

export default IconSquare

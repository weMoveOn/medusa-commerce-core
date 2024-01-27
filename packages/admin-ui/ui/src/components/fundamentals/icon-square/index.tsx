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
      <div className={clsx(`bg-black `, className)}></div>
    </>
  )
}

export default IconSquare

import clsx from "clsx"
import React, { ReactNode, useImperativeHandle } from "react"

export type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode
  inputFiledClassName?: string
}

const Checkbox = React.forwardRef(
  (
    {
      label,
      value,
      className,
      inputFiledClassName,
      id,
      ...rest
    }: CheckboxProps,
    ref
  ) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => checkboxRef.current)
    return (
      <label
        className={clsx("flex cursor-pointer items-center", className)}
        htmlFor={id}
      >
        <input
          type="checkbox"
          ref={checkboxRef}
          className={clsx(
            "form-checkbox rounded-base text-violet-60 border-grey-30  h-[20px] w-[20px] cursor-pointer focus:ring-0",
            inputFiledClassName
          )}
          value={value}
          id={id}
          {...rest}
        />
        {label ?? null}
      </label>
    )
  }
)
Checkbox.displayName = "CheckBox"
export default Checkbox

import React from "react"
import { useCallback, useRef, useState } from "react"
import useSelect from "../../../hooks/use-select"
import clsx from "clsx"
import SelectDropdown from "../Dropdown"
import { SelectProps } from "../types"

const SelectBadge = ({
  value,
  options,
  setSelected,
  addSelected,
  removeSelected,
  multiple,
  className,
  addAll = multiple,
  handleAddAll,
  ...props
}: SelectProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { isValueSelected, isAllSelected, handleChange, handleSelectAll } =
    useSelect({
      value,
      options,
      multiple,
      setSelected,
      removeSelected,
      addSelected,
      handleAddAll,
    })

  const getSelectedText = useCallback(() => {
    let str = ""
    const selectedOptions = options.filter((option) =>
      value.includes(option.value)
    )

    if (isAllSelected) {
      str = "All Areas"
    } else {
      if (
        (!Array.isArray(value) && !value) ||
        (Array.isArray(value) && !value.length)
      ) {
        str = "None selected"
      } else {
        str = selectedOptions[0].label
      }
    }

    return (
      <>
        <span
          className={clsx(
            "text-medusa-fg-base dark:text-medusa-fg-base-dark",
            "text-compact-x-small-plus",
            "inline-block max-w-[60px] overflow-hidden text-ellipsis"
          )}
        >
          {str}
        </span>
        {!isAllSelected && selectedOptions.length > 1 && (
          <span
            className={clsx(
              "text-medusa-fg-subtle dark:text-medusa-fg-subtle-dark",
              "text-compact-x-small"
            )}
          >
            {" "}
            + {selectedOptions.length}
          </span>
        )}
      </>
    )
  }, [isAllSelected, options, value])

  return (
    <div className={clsx("relative", className)}>
      <div
        className={clsx(
          "border-medusa-border-base dark:border-medusa-border-base-dark rounded-sm border border-solid",
          "hover:bg-medusa-bg-subtle-hover dark:hover:bg-medusa-bg-subtle-hover-dark",
          "py-0.25 h-fit cursor-pointer px-0.5",
          "flex items-center gap-[6px] whitespace-nowrap",
          "text-medusa-fg-subtle dark:text-medusa-fg-subtle-dark",
          !open && "bg-medusa-bg-subtle dark:bg-medusa-bg-subtle-dark",
          open &&
            "bg-medusa-bg-subtle-hover dark:bg-medusa-bg-subtle-hover-dark",
          className
        )}
        ref={ref}
        onClick={(e) => {
          if (!dropdownRef.current?.contains(e.target as Element)) {
            setOpen((prev) => !prev)
          }
        }}
      >
        <span
          className={clsx(
            "text-medusa-fg-subtle dark:text-medusa-fg-subtle-dark",
            "text-compact-x-small"
          )}
        >
          Show results from:{" "}
        </span>
        {getSelectedText()}
      </div>
      <input
        type="hidden"
        name={props.name}
        value={Array.isArray(value) ? value.join(",") : value}
      />
      <SelectDropdown
        options={options}
        open={open}
        setOpen={setOpen}
        addAll={addAll}
        multiple={multiple}
        isAllSelected={isAllSelected}
        isValueSelected={isValueSelected}
        handleSelectAll={handleSelectAll}
        handleChange={handleChange}
        parentRef={ref}
        ref={dropdownRef}
        className={clsx(
          "!top-[unset] !bottom-full",
          open && "!-translate-y-0.5"
        )}
      />
    </div>
  )
}

export default SelectBadge

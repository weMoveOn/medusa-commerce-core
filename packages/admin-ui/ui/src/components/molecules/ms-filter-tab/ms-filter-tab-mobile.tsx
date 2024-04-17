import React from "react"
import clsx from "clsx"

import CrossIcon from "../../fundamentals/icons/cross-icon"

type FilterTabProps = {
  label?: string
  isActive?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  removable?: boolean
  onRemove?: () => void
  isFirstButton?: boolean
  isLastButton?: boolean
}

export const MsFilterTabMobile: React.FC<FilterTabProps> = ({
  label,
  isActive,
  onClick,
  removable,
  onRemove,
  isFirstButton,
  isLastButton,
}) => {
  const handleClick = (e) => {
    if (typeof onClick !== "undefined") {
      onClick(e)
    }
  }

  const handleRemove = () => {
    if (typeof onRemove !== "undefined") {
      onRemove()
    }
  }

  const handleKeyPress = (e) => {
    if (removable && onRemove) {
      if (e.key === "Backspace") {
        onRemove()
      }
    }
  }

  let firstButtonClasses = ""
  let lastButtonClass = ""
  if (isFirstButton) {
    firstButtonClasses += "rounded-l-rounded"
  }
  if (isLastButton) {
    lastButtonClass += "rounded-r-rounded"
  }

  return (
    <button
      onKeyUp={handleKeyPress}
      onClick={handleClick}
      className={clsx(
        "",
        {
          ["bg-grey-20 "]: isActive,
        },
        firstButtonClasses,
        lastButtonClass
      )}
    >
      {label}
      {removable && (
        <div onClick={handleRemove} className={"ml-1 cursor-pointer"}>
          <CrossIcon size={16} />
        </div>
      )}
    </button>
  )
}

export default MsFilterTabMobile

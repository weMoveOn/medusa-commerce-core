import React, { useEffect } from "react"
import useClipboard from "../../../hooks/use-clipboard"
import useNotification from "../../../hooks/use-notification"
import Button from "../../fundamentals/button"
import CopyIcon from "../../fundamentals/icons/copy-icon"
import { ReactElement } from "react"
import { clx } from "../../../utils/clx"

type CopyToClipboardProps = {
  value: string
  displayValue?: string
  successDuration?: number
  showValue?: boolean
  icon?: ReactElement // Changed prop to accept any valid React element
  iconSize?: number
  onCopy?: () => void
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  value,
  displayValue,
  successDuration = 3000,
  showValue = true,
  icon = <CopyIcon />, // Default icon
  iconSize = 20,
  onCopy = () => {},
}) => {
  const [isCopied, handleCopy] = useClipboard(value, {
    onCopied: onCopy,
    successDuration: successDuration,
  })
  const notification = useNotification()

  useEffect(() => {
    if (isCopied) {
      notification("Success", "Copied!", "success")
    }
  }, [isCopied, notification])

  return (
    <div className="inter-small-regular text-grey-50 gap-x-xsmall flex items-center">
      <button
        type="button"
        className={clx("text-grey-50 p-0", {})}
        onClick={handleCopy}
      >
        {icon} {/* Render the icon here */}
      </button>
      {showValue && (
        <span className="w-full truncate">{displayValue && displayValue}</span>
      )}
    </div>
  )
}

export default CopyToClipboard

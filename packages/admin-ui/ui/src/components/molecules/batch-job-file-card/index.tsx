import { ReactNode } from "react"
import clsx from "clsx"

import Tooltip from "../../atoms/tooltip"
import { BatchJobOperation } from "../../organisms/batch-jobs-activity-list/utils"

type Props = {
  operation?: BatchJobOperation
  fileName: string
  fileSize?: string
  errorMessage?: string
  hasError?: boolean
  icon?: ReactNode
  onClick?: () => void
}

const BatchJobFileCard = ({
  operation,
  fileName,
  fileSize,
  icon,
  onClick,
  hasError,
  errorMessage,
}: Props) => {
  const preparedOnClick = onClick ?? (() => void 0)

  return (
    <div
      className="mt-4 flex w-full cursor-pointer items-center"
      onClick={preparedOnClick}
    >
      <div
        className="border-grey-20 flex items-center justify-center rounded-lg border p-2.5"
        title={fileName}
      >
        {!!icon && icon}
      </div>

      <div className="relative w-full pl-4 text-left">
        <div className="inter-small-regular max-w-[80%] overflow-hidden truncate">
          {operation !== BatchJobOperation.Manual ? fileName : fileName.replace(/\.csv$/, '')}
        </div>

        <Tooltip
          side="top"
          open={hasError ? undefined : false}
          maxWidth={320}
          content={
            hasError && errorMessage ? (
              <span className="font-normal text-rose-500">{errorMessage}</span>
            ) : null
          }
        >
          {!!fileSize && (
            <div
              className={clsx("text-grey-40 inter-small-regular", {
                "text-rose-500": hasError,
              })}
            >
              {fileSize}
            </div>
          )}
        </Tooltip>
      </div>
    </div>
  )
}

export default BatchJobFileCard

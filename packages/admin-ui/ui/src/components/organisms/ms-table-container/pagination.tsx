import { useTranslation } from "react-i18next"
import { SkeletonProvider } from "../../../providers/skeleton-provider"
import Skeleton from "../../atoms/skeleton"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"
import ArrowRightIcon from "../../fundamentals/icons/arrow-right-icon"
import { PagingProps } from "./types"
import Button from "../../fundamentals/button"

type Props = {
  isLoading?: boolean
  pagingState: PagingProps
}

export const TablePagination = ({
  isLoading = false,
  pagingState: {
    title,
    currentPage,
    pageCount,
    pageSize,
    count,
    offset,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  },
}: Props) => {
  const { t } = useTranslation()
  const soothedOffset = count > 0 ? offset + 1 : 0
  const soothedPageCount = Math.max(1, pageCount)

  return (
    <SkeletonProvider isLoading={isLoading}>
      {/* <div
        className={
          "inter-small-regular text-grey-50 flex w-full justify-between"
        }
      >
        <Skeleton>
          <div>
            {t(
              "table-container-soothed-offset",
              "{{soothedOffset}} - {{pageSize}} of {{count}} {{title}}",
              {
                soothedOffset,
                pageSize,
                count,
                title,
              }
            )}
          </div>
        </Skeleton>
        <div className="flex space-x-4">
          <Skeleton>
            <div>
              {t(
                "table-container-current-page",
                "{{currentPage}} of {{soothedPageCount}}",
                {
                  currentPage,
                  soothedPageCount,
                }
              )}
            </div>
          </Skeleton>
          <div className="flex items-center space-x-4">
            <button
              className="disabled:text-grey-30 cursor-pointer disabled:cursor-default"
              disabled={!hasPrev || isLoading}
              onClick={() => prevPage()}
            >
              <ArrowLeftIcon />
            </button>
            <button
              className="disabled:text-grey-30 cursor-pointer disabled:cursor-default"
              disabled={!hasNext || isLoading}
              onClick={() => nextPage()}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div> */}
      <div className="grid grid-cols-12 gap-16">
        <div className="col-span-2">
          <Button
            title="Previous"
            // disabled={!hasPrev || isLoading}
            onClick={() => prevPage()}
            variant="secondary"
            className="h-9 w-[115px]"
          >
            <ArrowLeftIcon />
            Previous
          </Button>
        </div>
        <div className="col-span-8 grid place-content-center">
          <Skeleton>
            <div>
              {t(
                "table-container-soothed-offset",
                "{{soothedOffset}} - {{pageSize}} of {{count}} {{title}}",
                {
                  soothedOffset,
                  pageSize,
                  count,
                  title,
                }
              )}
            </div>
          </Skeleton>
        </div>
        <div className="col-span-2">
          <Button
            title="Next"
            // disabled={!hasNext || isLoading}
            onClick={() => nextPage()}
            variant="primary"
            className="h-9 w-[88px]"
          >
            Next
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </SkeletonProvider>
  )
}

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
      <div className="grid grid-cols-12 gap-16 w-full">
        <div className="col-span-2 place-self-start pl-4">
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
        <div className="col-span-2 place-self-end pr-4">
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

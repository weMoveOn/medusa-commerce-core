import { PropsWithChildren } from "react"
import Spinner from "../../atoms/spinner"
import { TablePagination } from "./pagination"
import { PagingProps } from "./types"

const ROW_HEIGHT = 40

type Props<T extends boolean> = PropsWithChildren<{
  isLoading?: boolean
  hasPagination?: T
  pagingState: T extends true ? PagingProps : undefined
  numberOfRows?: number
}>

const MsTableContainer = <T extends boolean>({
  children,
  // TODO: remove (redundant)
  hasPagination,
  pagingState,
  isLoading,
  numberOfRows = 12,
}: Props<T>) => {
  // We use the number of rows (query limit) plus the header row to calculate the minimum height of the table, to avoid the table jumping around while loading.
  const minHeight = (numberOfRows + 1) * ROW_HEIGHT

  return (
    <div className="border-grey-20 rounded-rounded border bg-white  shadow-sm">
      <div
        className="rounded-t-rounded relative overflow-hidden border bg-white pt-2"
        style={{
          minHeight,
        }}
      >
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <Spinner variant="secondary" />
          </div>
        )}
        {children}
      </div>
      {hasPagination && pagingState && (
        <div className="border-r-grey-20 border-b-grey-20 border-l-grey-20 flex h-[64px] items-center justify-center py-4">
          <TablePagination pagingState={pagingState} isLoading={isLoading} />
        </div>
      )}
    </div>
  )
}

export default MsTableContainer

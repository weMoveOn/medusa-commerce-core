import { useMemo, useState } from "react"
import Spinner from "../../../components/atoms/spinner"
import Button from "../../../components/fundamentals/button"
import MinusIcon from "../../../components/fundamentals/icons/minus-icon"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import UsersIcon from "../../../components/fundamentals/icons/users-icon"
import ImagePlaceholder from "../../../components/fundamentals/image-placeholder"
import Modal from "../../../components/molecules/modal"
import Table from "../../../components/molecules/table"
import TableContainer from "../../../components/organisms/table-container"
import { usePagination, useRowSelect, useTable } from "react-table"
import IndeterminateCheckbox from "../../../components/molecules/indeterminate-checkbox"
import StatusIndicator from "../../../components/fundamentals/status-indicator"
import { useAdminProducts, useAdminVariants } from "medusa-react"
import { useDebounce } from "../../../hooks/use-debounce"
import { getProductStatusVariant } from "../../../utils/product-status-variant"
import { useReactTable } from "@tanstack/react-table"
import { Product } from "@medusajs/medusa"

type SearchProductModalProps = {
  openSearchProductModal: boolean
  setOpenSearchProductModal: (open: boolean) => void
  title: string
}

const SearchProductModal = ({
  openSearchProductModal,
  setOpenSearchProductModal,
  title,
}: SearchProductModalProps) => {
    const [query, setQuery] = useState("")
     const [offset, setOffset] = useState(0)
     const [numPages, setNumPages] = useState(0)
     const [currentPage, setCurrentPage] = useState(0)

     const debouncedSearchTerm = useDebounce(query, 500)

      const { isLoading, count, variants } = useAdminVariants({
        q: debouncedSearchTerm,
        limit: 100,
        offset,
      })

      const {products} = useAdminProducts()
      console.log("products from search-product-modal", products)

    //   console.log("variants from search-product-modal", variants)

      // get the 


      const handleSearch = (q) => {
        setOffset(0)
        setCurrentPage(0)
        setQuery(q)
      }

       const columns = useMemo(() => {
         return [
           {
             Header: "Name",
             accessor: "title",
             Cell: ({ row: { original } }) => {
               return (
                 <div className="flex items-center">
                   <div className="my-1.5 mr-4 flex h-[40px] w-[30px] items-center">
                     {original.product.thumbnail ? (
                       <img
                         src={original.product.thumbnail}
                         className="rounded-soft h-full object-cover"
                       />
                     ) : (
                       <ImagePlaceholder />
                     )}
                   </div>
                   <div className="flex flex-col">
                     <span>{original.product.title}</span>
                     {original.title}
                   </div>
                 </div>
               )
             },
           },
           {
             Header: "Status",
             accessor: "status",
             Cell: ({ row: { original } }) => (
               <StatusIndicator
                 title={`${original.product.status
                   .charAt(0)
                   .toUpperCase()}${original.product.status.slice(1)}`}
                 variant={getProductStatusVariant(original.product.status)}
               />
             ),
           },
           {
             Header: (
               <div className="text-right">
                 In Stock
               </div>
             ),
             accessor: "inventory_quantity",
             Cell: ({ row: { original } }) => (
               <div className="text-right">{original.inventory_quantity}</div>
             ),
           },
         ]
       }, [])



  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    nextPage,
    previousPage,
    // Get the state from the instance
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: variants || [],
      manualPagination: true,
      initialState: {
        pageIndex: currentPage,
        pageSize:12,
      },
      pageCount: numPages,
      autoResetSelectedRows: false,
      autoResetPage: false,
      getRowId: (row) => row.id,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            )
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => {
            return (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            )
          },
        },
        ...columns,
      ])
    }
  )

  

  return (
    <>
      <Modal
        open={openSearchProductModal}
        handleClose={() => setOpenSearchProductModal(false)}
        handleSkip={() => false}
      >
        <Modal.Header
          className="h-[56px]"
          iconClass="self-center"
          handleClose={() => setOpenSearchProductModal(false)}
        >
          <div className="flex items-end justify-center gap-2 ">
            <UsersIcon size={20} />
            <p className="font-bold">{title}</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <TableContainer
            hasPagination ={false}
            pagingState={undefined}
          >
            <Table
              immediateSearchFocus
              enableSearch
              searchPlaceholder={"Search Products From Your Inventory.."}
              searchValue={query}
              handleSearch={handleSearch}
              {...getTableProps()}
            >
              <Table.Body {...getTableBodyProps()}>
                {isLoading ? (
                  <Table.Row>
                    <Table.Cell
                      colSpan={columns.length}
                      className="flex items-center justify-center"
                    >
                      <Spinner size="large" variant="secondary" />
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  rows.map((row, i) => {
                    prepareRow(row)
                    return (
                      <Table.Row {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Table.Cell {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </Table.Cell>
                          )
                        })}
                      </Table.Row>
                    )
                  })
                )}
              </Table.Body>
            </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <div className="gap-x-xsmall flex w-full justify-end">
            <Button
              variant="primary"
              className="w-[112px]"
              size="small"
              onClick={() => setOpenSearchProductModal(false)}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default SearchProductModal

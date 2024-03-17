import { useEffect, useMemo, useState } from "react"
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
import { Product, Region } from "@medusajs/medusa"
import MsTable from "../../../components/molecules/ms-table"
import { useNewOrderForm } from "../new/form"
import { extractUnitPrice } from "../../../utils/prices"
import { clx } from "../../../utils/clx"

type SearchProductModalProps = {
  openSearchProductModal: boolean
  setOpenSearchProductModal: (open: boolean) => void
  title: string
  setItems: (items: any) => void
}

const SearchProductModal = ({
  openSearchProductModal,
  setOpenSearchProductModal,
  title,
  setItems,
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

  // console.log("variants from search-product-modal", variants)
  const { products } = useAdminProducts()

  const {
    context: { region, items },
    form: { control, register, setValue },
  } = useNewOrderForm()

  // console.log("region", region)

  const { fields, append, remove, update } = items

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
          // console.log("original", original)
          const price = extractUnitPrice(original, region as Region, false)
          // console.log("price", price, region)
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
                <span> {original.title}</span>
              </div>
            </div>
          )
        },
      },
      {
        Header: <div className="text-right">In Stock</div>,
        accessor: "inventory_quantity",
        Cell: ({ row: { original } }) => (
          <div className="text-left">{original.inventory_quantity} Available</div>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row: { original } }) => (
          <div className="text-right pr-2">
            {/* {original.product.unit_price } */}
            500 BDT
          </div>
        ),
      },
    ]
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    rows,
    prepareRow,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data: variants || [],
      manualPagination: true,
      initialState: {
        pageIndex: currentPage,
        pageSize: 12,
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
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => {
            return (
              <div className="pl-8">
                <IndeterminateCheckbox
                  checked={true}
                  {...getToggleAllRowsSelectedProps()}
                />
              </div>
            )
          },
          Cell: ({ row }) => {
            const { id } = row.original
            const shouldChecked =
              fields.findIndex((item) => item.variant_id === id) > -1
            const rowProps = {
              ...row.getToggleRowSelectedProps(),
            }
            return (
              <div className="flex items-center justify-center pl-4">
              {
                shouldChecked ? (
                  <IndeterminateCheckbox checked={true} className="bg-black"/>
                ) : (
                  <IndeterminateCheckbox {...rowProps}/>
                )
              }
              </div>
            )
          },
        },
        ...columns,
      ])
    }
  )

  const [selectedVariants, setSelectedVariants] = useState<any[]>([])

  useEffect(() => {
    setSelectedVariants((selectedVariants) => [
      ...selectedVariants.filter(
        (sv) => Object.keys(selectedRowIds).findIndex((id) => id === sv.id) > -1
      ),
      ...(variants?.filter(
        (v) =>
          selectedVariants.findIndex((sv) => sv.id === v.id) < 0 &&
          Object.keys(selectedRowIds).findIndex((id) => id === v.id) > -1
      ) || []),
    ])
  }, [selectedRowIds])

  const handleAddButtonClick = async () => {
    if (!selectedVariants.length) {
      return
    }
    if (!variants) return
    if (!region) return alert("Please select a region")
    append(
      selectedVariants.map((item) => ({
        quantity: 1,
        variant_id: item.id,
        title: item.title as string,
        unit_price: extractUnitPrice(item, region as Region, false),
        product_title: (item.product as Product)?.title,
        thumbnail: (item.product as Product)?.thumbnail,
      }))
    )
    setItems(selectedVariants)
    setOpenSearchProductModal(false)
  }


  return (
    <>
      <Modal
        open={openSearchProductModal}
        handleClose={() => setOpenSearchProductModal(false)}
        handleSkip={() => false}
        isLargeModal={true}
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
        <Modal.Body className="w-[812px] overflow-y-auto">
          <TableContainer hasPagination={false} pagingState={undefined}>
            <MsTable
              immediateSearchFocus
              enableSearch
              searchPlaceholder={"Search Products From Your Inventory.."}
              searchValue={query}
              handleSearch={handleSearch}
              {...getTableProps()}
              searchClassName="!w-full mb-2 !h-[44px]"
              tableHeight="h-[450px] overflow-auto"
            >
              <MsTable.Body {...getTableBodyProps()}>
                {isLoading ? (
                  <MsTable.Row>
                    <MsTable.Cell
                      colSpan={columns.length}
                      className="flex items-center justify-center"
                    >
                      <Spinner size="large" variant="secondary" />
                    </MsTable.Cell>
                  </MsTable.Row>
                ) : (
                  rows.map((row, i) => {
                    prepareRow(row)
                    let addMargin = true
                    if (i > 0) {
                      addMargin =
                        row.cells[0].row.original.product_id !==
                        rows[i - 1].cells[0].row.original.product_id
                    }

                    let productNameRow = null
                    if (addMargin && products) {
                      const product = products.find(
                        (product) =>
                          product.id === row.cells[0].row.original.product_id
                      )
                      productNameRow = (
                        <MsTable.Row
                          key={i}
                          className="bg-[#dadada]"
                        >
                          <MsTable.Cell
                            colSpan={columns.length}
                            className="pl-4 font-bold"
                          >
                            <div className="flex items-center gap-4">
                              {product?.thumbnail ? (
                                <img
                                  src={product.thumbnail}
                                  className="rounded-soft h-8 w-8 object-cover"
                                />
                              ) : (
                                <ImagePlaceholder />
                              )}
                              <h2>
                                {product ? product.title : "Unknown Product"}
                              </h2>
                            </div>
                          </MsTable.Cell>
                          <MsTable.Cell colSpan={columns.length}></MsTable.Cell>
                        </MsTable.Row>
                      )
                    }

                    const isAdded = fields.findIndex(
                      (item) => item.variant_id === row.original.id
                    ) > -1
                    return (
                      <>
                        {productNameRow}
                        <MsTable.Row
                          {...row.getRowProps()}
                          className={`${isAdded && "bg-[#EFEFEF]"}`}
                        >
                          {row.cells.map((cell) => {
                            return (
                              <MsTable.Cell {...cell.getCellProps()}>
                                {cell.render("Cell")}
                              </MsTable.Cell>
                            )
                          })}
                        </MsTable.Row>
                      </>
                    )
                  })
                )}
              </MsTable.Body>
            </MsTable>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <div className="gap-x-xsmall flex w-full justify-end">
            <Button
              variant="primary"
              className="w-[112px]"
              size="small"
              onClick={handleAddButtonClick}
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

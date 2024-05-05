import moment from "moment"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import { getColor } from "../../../utils/color"
import Tooltip from "../../atoms/tooltip"
import StatusDot from "../../fundamentals/status-indicator"
import CustomerAvatarItem from "../../molecules/customer-avatar-item"
import CheckIcon from "../../fundamentals/icons/check-icon"
import { Order } from "@medusajs/medusa"
import { createColumnHelper } from "@tanstack/react-table"
import { Checkbox } from "@medusajs/ui"

const useOrderTableColumsMobile = () => {
  const { t } = useTranslation()
  const columnHelper = createColumnHelper<Order>()

  const decideStatus = (status) => {
    switch (status) {
      case "captured":
        return (
          <div className="flex w-fit items-center justify-center rounded-[40px] bg-green-100 px-2 py-1 text-green-800">
            <CheckIcon className="text-green-800" size={12} />
            <span>Paid</span>
          </div>
        )
      case "awaiting":
        return (
          <StatusDot
            variant="default"
            title={t("order-table-awaiting", "Awaiting")}
          />
        )
      case "requires_action":
        return (
          <StatusDot
            variant="danger"
            title={t("order-table-requires-action", "Requires action")}
          />
        )
      case "canceled":
        return (
          <StatusDot
            variant="warning"
            title={t("order-table-canceled", "Canceled")}
          />
        )
      default:
        return (
          <StatusDot variant="primary" title={t("order-table-n-a", "N/A")} />
        )
    }
  }

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: "select",
        header: ({ table }) => {
          return (
            <Checkbox
              checked={
                table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : table.getIsAllPageRowsSelected()
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label={
                t(
                  "price-list-products-form-select-all",
                  "Select all products on the current page"
                ) ?? undefined
              }
            />
          )
        },
        cell: ({ table, row }) => {
          const { productIds } = table.options.meta as {
            productIds: string[]
          }

          const isSelected = row.getIsSelected() || productIds.includes(row.id)

          return (
            <Checkbox
              checked={isSelected}
              disabled={productIds.includes(row.id)}
              onCheckedChange={(value) => {
                row.toggleSelected(!!value)
              }}
              aria-label={
                t("price-list-products-form-select-row", "Select row") ??
                undefined
              }
            />
          )
        },
      }),
      {
        Header: (
          <div className="pl-2">{t("order-table-order-id", "Order id")}</div>
        ),
        accessor: "display_id",
        Cell: ({ cell: { value } }) => (
          <p className="text-grey-90 group-hover:text-violet-60 min-w-[100px] pl-2">{`#${value}`}</p>
        ),
      },
      {
        Header: t("order-table-date", "Date"),
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <div className="w-[120px]">
            <Tooltip content={moment(value).format("DD MMM YYYY hh:mm a")}>
              {moment(value).format("DD MMM YYYY")}
            </Tooltip>
          </div>
        ),
      },
      {
        Header: t("order-table-customer", "Customer"),
        accessor: "customer",
        Cell: ({ row, cell: { value } }) => (
          <div>
            <CustomerAvatarItem
              customer={{
                first_name:
                  value?.first_name ||
                  row.original.shipping_address?.first_name,
                last_name:
                  value?.last_name || row.original.shipping_address?.last_name,
                email: row.original.email,
              }}
              color={getColor(row.index)}
            />
          </div>
        ),
      },
      {
        Header: t("order-table-fulfillment", "Fulfillment"),
        accessor: "fulfillment_status",
        Cell: ({ cell: { value } }) => value,
      },
      {
        Header: t("order-table-payment-status", "Payment status"),
        accessor: "payment_status",
        Cell: ({ cell: { value } }) => decideStatus(value),
      },
      {
        Header: t("order-table-sales-channel", "Sales Channel"),
        accessor: "sales_channel",
        Cell: ({ cell: { value } }) => value?.name ?? "N/A",
      },
      {
        Header: t("order-table-total", "Total"),
        accessor: "total",
        Cell: ({ row, cell: { value } }) =>
          value + " " + row.original.currency_code.toUpperCase(),
      },
    ],
    []
  )

  return [columns]
}

export default useOrderTableColumsMobile

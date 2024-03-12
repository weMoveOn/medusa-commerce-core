import moment from "moment"
import { useMemo } from "react"
import ReactCountryFlag from "react-country-flag"
import { useTranslation } from "react-i18next"
import { getColor } from "../../../utils/color"
import { isoAlpha2Countries } from "../../../utils/countries"
import { formatAmountWithSymbol } from "../../../utils/prices"
import Tooltip from "../../atoms/tooltip"
import StatusDot from "../../fundamentals/status-indicator"
import CustomerAvatarItem from "../../molecules/customer-avatar-item"
import CheckIcon from "../../fundamentals/icons/check-icon"

const useOrderTableColums = () => {
  const { t } = useTranslation()
  const decideStatus = (status) => {
    switch (status) {
      case "captured":
        return (
          <div className="flex items-center justify-center text-green-800 py-1 rounded-[40px] w-fit bg-green-100 px-2">
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
      {
        Header: <div className="pl-2">{t("order-table-order-id", "Order id")}</div>,
        accessor: "display_id",
        Cell: ({ cell: { value } }) => (
          <p className="text-grey-90 group-hover:text-violet-60 min-w-[100px] pl-2">{`#${value}`}</p>
        ),
      },
      {
        Header: t("order-table-date", "Date"),
        accessor: "created_at",
        Cell: ({ cell: { value } }) => (
          <div>
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
        Cell: ({ row, cell: { value } }) => value + " " + row.original.currency_code.toUpperCase(),
      }
    ],
    []
  )

  return [columns]
}

export default useOrderTableColums

import {
  AdminGetVariantsVariantInventoryRes,
  Order,
  VariantInventory,
} from "@medusajs/medusa"
import React, { useContext, useEffect, useMemo } from "react"
import { DisplayTotal, PaymentDetails } from "../templates"
import { useTranslation } from "react-i18next"

import { ActionType } from "../../../../components/molecules/actionables"
import Badge from "../../../../components/fundamentals/badge"

import CopyToClipboard from "../../../../components/atoms/copy-to-clipboard"
import { OrderEditContext } from "../../edit/context"
import OrderLine from "../order-line"
import { ReservationItemDTO } from "@medusajs/types"
import ReserveItemsModal from "../reservation/reserve-items-modal"
import { Response } from "@medusajs/medusa-js"
import { sum } from "lodash"
import { useAdminCreateOrderEdit, useMedusa } from "medusa-react"
import StatusIndicator from "../../../../components/fundamentals/status-indicator"
import useToggleState from "../../../../hooks/use-toggle-state"
import { useFeatureFlag } from "../../../../providers/feature-flag-provider"
import ItemsEdit from "./ItemsEdit"
import BodyCard from "../../../../components/organisms/ms-body-card"
import OrderEditContainer, { OrderEditModal } from "./order-summery"
import useNotification from "../../../../hooks/use-notification"

type SummaryCardProps = {
  order?: Order
  reservations?: ReservationItemDTO[]
}
let isRequestRunningFlag = false
const MsSummaryCard: React.FC<SummaryCardProps> = ({ order, reservations }) => {
  console.log("order MsSummaryCard:>> ", order)
  // const notification = useNotification()

  // const { hideModal, orderEdits, activeOrderEditId, setActiveOrderEdit } =
  //   useContext(OrderEditContext)

  // const { mutateAsync: createOrderEdit } = useAdminCreateOrderEdit()

  // const orderEdit = orderEdits?.find((oe) => oe.id === activeOrderEditId)

  // useEffect(() => {
  //   if (activeOrderEditId || isRequestRunningFlag) {
  //     return
  //   }

  //   isRequestRunningFlag = true

  //   createOrderEdit({ order_id: order?.id })
  //     .then(({ order_edit }) => setActiveOrderEdit(order_edit.id))
  //     .catch(() => {
  //       notification(
  //         "Error",
  //         "There is already an active order edit on this order",
  //         "error"
  //       )
  //       hideModal()
  //     })
  //     .finally(() => (isRequestRunningFlag = false))
  // }, [activeOrderEditId])

  // const onClose = () => {
  //   // setActiveOrderEdit(undefined) -> context will unset active edit after flag toggle
  //   hideModal()
  // }

  // if (!orderEdit) {
  //   return null
  // }

  return (
    <BodyCard
      className={"my-4 h-auto min-h-0 w-full rounded-lg bg-white p-5 shadow"}
      title="Order Summary"
    >
      <h1>test</h1>

      <OrderEditContainer order={order} />
    </BodyCard>
  )
}

export default MsSummaryCard

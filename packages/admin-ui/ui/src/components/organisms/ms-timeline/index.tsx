import clsx from "clsx"
import { useAdminCreateNote, useAdminOrder } from "medusa-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import RegisterClaimMenu from "../../../domain/orders/details/claim/register-claim-menu"
import useOrdersExpandParam from "../../../domain/orders/details/utils/use-admin-expand-paramter"
import {
  ClaimEvent,
  ExchangeEvent,
  ItemsFulfilledEvent,
  ItemsShippedEvent,
  NoteEvent,
  NotificationEvent,
  OrderEditEvent,
  OrderEditRequestedEvent,
  OrderPlacedEvent,
  PaymentRequiredEvent,
  RefundEvent,
  RefundRequiredEvent,
  ReturnEvent,
  TimelineEvent,
  useBuildTimeline,
} from "../../../hooks/use-build-timeline"
import useNotification from "../../../hooks/use-notification"
import useToggleState from "../../../hooks/use-toggle-state"
import { getErrorMessage } from "../../../utils/error-messages"
import Spinner from "../../atoms/spinner"
import AlertIcon from "../../fundamentals/icons/alert-icon"
import BackIcon from "../../fundamentals/icons/back-icon"
import RefreshIcon from "../../fundamentals/icons/refresh-icon"
import Actionables, { ActionType } from "../../molecules/actionables"
import Claim from "../../molecules/timeline-events/claim-event"
import ItemsShipped from "../../molecules/timeline-events/items-shipped"
import Note from "../../molecules/timeline-events/note"
import Notification from "../../molecules/timeline-events/notification"
import OrderCanceled from "../../molecules/timeline-events/order-canceled"
import EditCanceled from "../../molecules/timeline-events/order-edit/canceled"
import EditDeclined from "../../molecules/timeline-events/order-edit/declined"
import PaymentRequired from "../../molecules/timeline-events/order-edit/payment-required"
import RefundRequired from "../../molecules/timeline-events/order-edit/refund-required"
import OrderPlaced from "../../molecules/timeline-events/order-placed"
import Refund from "../../molecules/timeline-events/refund"
import NoteInput from "../../molecules/note-input"
import MsReturn from "../../molecules/ms-timeline-events/return"
import MsExchange from "../../molecules/ms-timeline-events/exchange"
import MsItemsFulfilled from "../../molecules/ms-timeline-events/items-fulfilled"
import MsEditConfirmed from "../../molecules/ms-timeline-events/order-edit/confirmed"
import MsEditCreated from "../../molecules/ms-timeline-events/order-edit/created"
import MsSwapMenu from "../../../domain/orders/ms-details/ms-swap/create"
import MsReturnMenu from "../../../domain/orders/ms-details/ms-returns"
import MsEditRequested from "../../molecules/ms-timeline-events/order-edit/requested"

type TimelineProps = {
  orderId: string
}

const MsTimeline: React.FC<TimelineProps> = ({ orderId }) => {
  const { t } = useTranslation()
  const { orderRelations } = useOrdersExpandParam()

  const { events, refetch } = useBuildTimeline(orderId)
  const notification = useNotification()
  const createNote = useAdminCreateNote()
  const { order } = useAdminOrder(orderId, {
    expand: orderRelations,
  })

  const [showRequestReturn, setShowRequestReturn] = useState(false)
  const [showCreateSwap, setshowCreateSwap] = useState(false)

  const {
    state: showRegisterClaim,
    close: closeRegisterClaim,
    open: openRegisterClaim,
  } = useToggleState()

  const actions: ActionType[] = [
    {
      icon: <BackIcon size={20} />,
      label: t("timeline-request-return", "Request Return"),
      onClick: () => setShowRequestReturn(true),
    },
    {
      icon: <RefreshIcon size={20} />,
      label: t("timeline-register-exchange", "Register Exchange"),
      onClick: () => setshowCreateSwap(true),
    },
    {
      icon: <AlertIcon size={20} />,
      label: t("timeline-register-claim", "Register Claim"),
      onClick: openRegisterClaim,
    },
  ]

  const handleCreateNote = (value: string | undefined) => {
    if (!value) {
      return
    }
    createNote.mutate(
      {
        resource_id: orderId,
        resource_type: "order",
        value: value,
      },
      {
        onSuccess: () =>
          notification(
            t("timeline-success", "Success"),
            t("timeline-added-note", "Added note"),
            "success"
          ),
        onError: (err) =>
          notification(
            t("timeline-error", "Error"),
            getErrorMessage(err),
            "error"
          ),
      }
    )
  }
  // w-5/12 h-full
  return (
    <>
      <div className="rounded-rounded border-grey-20 bg-grey-0   border">
        <div className="border-grey-20 py-large px-xlarge border-b">
          <div className="flex items-center justify-between">
            <h3 className="inter-xlarge-semibold">
              {t("timeline-timeline", "Timeline")}
            </h3>
            <div
              className={clsx({
                "pointer-events-none opacity-50": !events,
              })}
            >
              <Actionables actions={actions} />
            </div>
          </div>
          <div
            className={clsx("mt-base", {
              "pointer-events-none opacity-50": !events,
            })}
          >
            <NoteInput onSubmit={handleCreateNote} />
          </div>
        </div>
        <div className="py-large px-xlarge">
          {!events ? (
            <div className="flex h-96 w-full items-center justify-center">
              <Spinner variant="secondary" size="large" />
            </div>
          ) : (
            <div className="flex flex-col">
              {events.map((event, i) => {
                return <div key={i}>{switchOnType(event, refetch)}</div>
              })}
            </div>
          )}
        </div>
      </div>
      {showRequestReturn && order && (
        <MsReturnMenu
          order={order}
          onDismiss={() => setShowRequestReturn(false)}
        />
      )}
      {showCreateSwap && order && (
        <MsSwapMenu order={order} onDismiss={() => setshowCreateSwap(false)} />
      )}
      {showRegisterClaim && order && (
        <RegisterClaimMenu order={order} onClose={closeRegisterClaim} />
      )}
    </>
  )
}

function switchOnType(event: TimelineEvent, refetch: () => void) {
  switch (event.type) {
    case "placed":
      return <OrderPlaced event={event as OrderPlacedEvent} />
    case "fulfilled":
      return <MsItemsFulfilled event={event as ItemsFulfilledEvent} />
    case "note":
      return <Note event={event as NoteEvent} />
    case "shipped":
      return <ItemsShipped event={event as ItemsShippedEvent} />
    case "canceled":
      return <OrderCanceled event={event as TimelineEvent} />
    case "return":
      return <MsReturn event={event as ReturnEvent} refetch={refetch} />
    case "exchange":
      return (
        <MsExchange
          key={event.id}
          event={event as ExchangeEvent}
          refetch={refetch}
        />
      )
    case "claim":
      return <Claim event={event as ClaimEvent} />
    case "notification":
      return <Notification event={event as NotificationEvent} />
    case "refund":
      return <Refund event={event as RefundEvent} />
    case "edit-created":
      return <MsEditCreated event={event as OrderEditEvent} />
    case "edit-canceled":
      return <EditCanceled event={event as OrderEditEvent} />
    case "edit-declined":
      return <EditDeclined event={event as OrderEditEvent} />
    case "edit-confirmed":
      return <MsEditConfirmed event={event as OrderEditEvent} />
    case "edit-requested":
      return <MsEditRequested event={event as OrderEditRequestedEvent} />
    case "refund-required":
      return <RefundRequired event={event as RefundRequiredEvent} />
    case "payment-required":
      return <PaymentRequired event={event as PaymentRequiredEvent} />
    default:
      return null
  }
}

export default MsTimeline

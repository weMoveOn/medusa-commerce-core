import clsx from "clsx"
import { useAdminCreateNote, useAdminOrder } from "medusa-react"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

import useOrdersExpandParam from "../../../domain/orders/details/utils/use-admin-expand-paramter"
import {
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
import MsNoteInput from "../../molecules/ms-note-input"

type TimelineProps = {
  orderId: string
}

const MsNote: React.FC<TimelineProps> = ({ orderId }) => {
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
            <MsNoteInput onSubmit={handleCreateNote} />
          </div>
        </div>
      </div>
    </>
  )
}


export default MsNote

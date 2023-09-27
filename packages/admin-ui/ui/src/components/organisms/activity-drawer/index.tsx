import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

import useOutsideClick from "../../../hooks/use-outside-click"
import { usePolling } from "../../../providers/polling-provider"
import Spinner from "../../atoms/spinner"
import SadFaceIcon from "../../fundamentals/icons/sad-face-icon"
import SidedMouthFaceIcon from "../../fundamentals/icons/sided-mouth-face"
import BatchJobActivityList from "../batch-jobs-activity-list"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import medusaRequest from "../../../services/request"
import useNotification from "../../../hooks/use-notification"

const ActivityDrawer = ({ onDismiss }) => {
  const { t } = useTranslation()
  const dialog = useImperativeDialog()
  const notification = useNotification()
  const ref = React.useRef<HTMLDivElement>(null)
  const { batchJobs, hasPollingError, refetch } = usePolling()
  useOutsideClick(onDismiss, ref)

  useEffect(() => {
    refetch()
  }, [])

  const handleClearAll = async()=> {
    const shouldDelete = await dialog({
      heading: "Clear All",
      text: `Are you sure you want to clear all activities? This is also going to stop all running processes.`,
    })

    if(shouldDelete){
      const path = `/admin/batch-job-extended`
      const res = await medusaRequest("delete", path);
      if(res.status===200){
        refetch();
        notification(
          "Activities deleted",
          "All activities deleted successfully",
          "success"
        )
      } else  notification(
        "Failed",
        "Failed to delete activities",
        "error"
      )
    }
  }

  return (
    <div
      ref={ref}
      className="bg-grey-0 shadow-dropdown fixed top-[64px] bottom-2 right-3 flex w-[400px] flex-col overflow-x-hidden rounded"
    >
      <div className="flex flex-row justify-between">
      <div className="inter-large-semibold pt-7 pl-8 pb-1">
        {t("activity-drawer-activity", "Activity")}
      </div>
      {!hasPollingError && batchJobs?.length ? <div className="pt-7 pr-8 pb-1 cursor-pointer inter-large-thin" onClick={handleClearAll}>Clear All</div>:<></>}
      </div>
      {!hasPollingError ? (
        batchJobs?.length ? (
          <BatchJobActivityList batchJobs={batchJobs} refetchBatchJob={refetch} />
        ) : (
          <EmptyActivityDrawer />
        )
      ) : (
        <ErrorActivityDrawer />
      )}
    </div>
  )
}

const EmptyActivityDrawer = () => {
  const { t } = useTranslation()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <SidedMouthFaceIcon size={36} />
      <span className={"inter-large-semibold text-grey-90 mt-4"}>
        {t("activity-drawer-no-notifications-title", "It's quiet in here...")}
      </span>
      <span className={"text-grey-60 inter-base-regular mt-4 text-center"}>
        {t(
          "activity-drawer-no-notifications-description",
          "You don't have any notifications at the moment, but once you do they will live here."
        )}
      </span>
    </div>
  )
}

const ErrorActivityDrawer = () => {
  const { t } = useTranslation()
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-4">
      <SadFaceIcon size={36} />
      <span className={"inter-large-semibold text-grey-90 mt-4"}>
        {t("activity-drawer-error-title", "Oh no...")}
      </span>
      <span className={"text-grey-60 inter-base-regular mt-2 text-center"}>
        {t(
          "activity-drawer-error-description",
          "Something went wrong while trying to fetch your notifications - We will keep trying!"
        )}
      </span>

      <div className="mt-4 flex items-center">
        <Spinner size={"small"} variant={"secondary"} />
        <span className="ml-2.5">
          {t("activity-drawer-processing", "Processing...")}
        </span>
      </div>
    </div>
  )
}

export default ActivityDrawer

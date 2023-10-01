import React, { ReactNode } from "react"
import StatusIndicator from "../../fundamentals/status-indicator"
import Tooltip from "../../atoms/tooltip"
import clsx from "clsx"
import { BatchJob } from "@medusajs/medusa"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import useNotification from "../../../hooks/use-notification"
import medusaRequest from "../../../services/request"
import CrossIcon from "../../fundamentals/icons/cross-icon"

export type ActivityCardProps = {
  key?: string
  title: string
  icon?: ReactNode
  relativeTimeElapsed?: string
  date?: string | Date
  shouldShowStatus?: boolean
  children?: ReactNode[]
  batchJob: BatchJob
  refetchBatchJob?: ()=>void
}

export const ActivityCard: React.FC<ActivityCardProps> = (
  props: ActivityCardProps
) => {
  const { key, title, icon, relativeTimeElapsed, shouldShowStatus, children, batchJob, refetchBatchJob } =
    props

  const dialog = useImperativeDialog()
  const notification = useNotification()
  const date =
    !!props.date &&
    new Date(props.date).toLocaleDateString("en-us", {
      hour12: true,
      day: "2-digit",
      month: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  const formattedDate = !!date && date.replace(",", " at")

  const getTimeElement = () => {
    return (
      <div className="flex cursor-default">
        {!!relativeTimeElapsed && <span>{relativeTimeElapsed}</span>}
        {shouldShowStatus && (
          <StatusIndicator variant={"primary"} className="ml-2" />
        )}
      </div>
    )
  }

  const handleDelete = async()=> {
    const shouldDelete = await dialog({
      heading: "Delete Activity",
      text: `Are you sure you want to delete this activity?`,
    })
  
    if(shouldDelete){
      const path = `/admin/api/v1/batch-job-extended/${batchJob.id}`
      const res = await medusaRequest("delete", path);
      if(res.status===200){
        refetchBatchJob && refetchBatchJob();
        notification(
          "Activity deleted",
          "Activity deleted successfully",
          "success"
        )
      } else notification(
        "Failed",
        "Failed to delete activity",
        "error"
      )
    }
  }

  return (
    <div key={key} className="border-grey-20 mx-8 border-b last:border-b-0">
      {(batchJob.status==="failed" || batchJob.status==="completed") && <div className="flex flex-row-reverse  text-rose-500 pt-2">
       <Tooltip side="left" content="Delete"><CrossIcon size={18} className="cursor-pointer"  onClick={handleDelete} /></Tooltip>
      </div>}
      <div className="hover:bg-grey-5 -mx-8 flex px-8 py-3">
        <div className="relative h-full w-full">
          <div className="inter-small-semibold text-grey-90 flex justify-between">
            <div className="flex">
              {!!icon && icon}
              <span>{title}</span>
            </div>

            {(!!relativeTimeElapsed || shouldShowStatus) &&
              (formattedDate ? (
                <Tooltip content={formattedDate}>{getTimeElement()}</Tooltip>
              ) : (
                getTimeElement()
              ))}
          </div>

          <div className={clsx(!!icon && "pl-8")}>{children}</div>
        </div>
      </div>
    </div>
  )
}

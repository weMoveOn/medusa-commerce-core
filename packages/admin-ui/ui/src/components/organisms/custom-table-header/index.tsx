import clsx from "clsx"
import { capitalize } from "lodash"
import React from "react"
import { ViewsType } from "../../../domain/moveon-inventory/overview"

type TableViewHeaderProps<T = string> = {
  views: T[]
  activeView?: T
  setActiveView?: (view: T) => void
}

const TableViewHeader: React.FC<TableViewHeaderProps<ViewsType>> = ({
  views,
  activeView = views[0],
  setActiveView,
}) => {
  return (
    <div className="inter-large-semibold gap-x-base text-grey-40 flex">
      {views.map((k, i) => (
        <div
          key={i}
          className={clsx("cursor-pointer", {
            ["text-grey-90"]: k === activeView,
          })}
          onClick={() => {
            if (setActiveView) {
              setActiveView(k)
            }
          }}
        >
          {capitalize(k)}
        </div>
      ))}
    </div>
  )
}

export default TableViewHeader

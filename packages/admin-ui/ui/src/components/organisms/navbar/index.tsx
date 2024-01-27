import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Button from "../../fundamentals/button"
import HelpCircleIcon from "../../fundamentals/icons/help-circle"

import Input from "../../atoms/text-input"
import { t } from "i18next"
const Navbar: React.FC = () => {
  const {
    state: activityDrawerState,
    toggle: toggleActivityDrawer,
    close: activityDrawerClose,
  } = useToggleState(false)

  const { batchJobs } = usePolling()

  const [showSupportform, setShowSupportForm] = useState(false)

  const onNotificationBellClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      toggleActivityDrawer()
    },
    [toggleActivityDrawer]
  )

  return (
    <div className="min-h-topbar max-h-topbar pr-xlarge pl-base bg-grey-0 border-grey-20 flex w-full items-center justify-between border-b">
      <div className="border">
        <img
          className="h-[37px] w-[116px]  "
          src="https://source.unsplash.com/user/c_v_r/100x100"
          alt="logo"
        />
      </div>
      <Input
        className="w-[592px] border p-2 "
        // onChange={onChange}
        // value={q}
        // @ts-ignore
        placeholder={t("search...")}
      />
      <div className="flex items-center">
        <Button size="small" variant="ghost">
          My Business Store
        </Button>
        <HelpCircleIcon />
        <HelpCircleIcon />
      </div>
    </div>
  )
}

export default Navbar
function getInputProps(): import("react/jsx-runtime").JSX.IntrinsicAttributes &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.")
}

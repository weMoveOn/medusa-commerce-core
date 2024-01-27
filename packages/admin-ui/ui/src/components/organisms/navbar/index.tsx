import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Button from "../../fundamentals/button"

import Input from "../../atoms/text-input"
import { t } from "i18next"
import IconCircle from "../../fundamentals/icon-circle"
import InputField from "../../molecules/input"
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
    <div className=" border-grey-20 py-base  border-b bg-[#D9D9D9]">
      <div className="px-xlarge  flex  w-full items-center justify-between ">
        <div className="">
          <IconCircle />
        </div>

        <InputField type="search" placeholder="search..." className="w-1/3" />
        <div className="flex items-center gap-3">
          <Button size="small" variant="secondary">
            My Business Store
          </Button>
          <IconCircle />
          <IconCircle />
        </div>
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

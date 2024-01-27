import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Button from "../../fundamentals/button"
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
    <div className=" border-grey-20 medium:py-base   border-b bg-[#D9D9D9]">
      <div className="medium:px-xlarge flex w-full  items-center  justify-between gap-1 p-2 ">
        <div className="">
          <IconCircle />
        </div>

        <InputField
          type="search"
          placeholder="search..."
          className="medium:w-1/3"
        />
        <div className="medium:gap-3 flex items-center gap-1">
          <Button
            size="small"
            variant="secondary"
            className="medium:block hidden"
          >
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

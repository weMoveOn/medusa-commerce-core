import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Button from "../../fundamentals/button"

import InputField from "../../molecules/input"
import Logo from "../../fundamentals/Logo"
import { BellAlert, MagnifyingGlass } from "@medusajs/icons"
import Avatar from "../../atoms/avatar"

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
    <div className=" w-full bg-[#1B241F] px-6 py-[14px]">
      <div className=" flex w-full  items-center  justify-between  ">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="font-['Futura'] text-[22px] font-bold tracking-tight text-white">
            MoveShop
          </h1>
        </div>

        {/* <InputField
          type="search"
          placeholder="search..."
          className="medium:w-1/3"
        /> */}

        <form>
          <div className="inline-flex h-12 w-[812px] items-center justify-start gap-2 rounded-lg border border-neutral-700 bg-white bg-opacity-10 px-4 py-2.5 shadow">
            <div className="flex h-6 shrink grow basis-0 items-start justify-start gap-2">
              <div className="relative h-6 w-6 text-white">
                <MagnifyingGlass />
              </div>
              {/* FIXME: here is input field */}
              <div className="font-['Inter'] text-base font-normal leading-normal text-white">
                Search
              </div>
            </div>
          </div>
        </form>

        <div className="medium:gap-3 flex items-center gap-1">
          <div className="inline-flex h-12 w-44 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 shadow">
            <div className="font-['Inter'] text-base font-semibold leading-normal text-gray-100">
              My Business Store
            </div>
          </div>

          <div className="ml-12 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#323A37]">
              <BellAlert color="#fff" />
            </div>

            <div className="h-12 w-12 ">
              <Avatar
                user={{
                  img: "https://source.unsplash.com/user/c_v_r/100x100",
                }}
              />
            </div>
          </div>
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

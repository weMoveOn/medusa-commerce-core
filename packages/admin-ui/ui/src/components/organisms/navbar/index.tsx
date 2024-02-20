import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Logo from "../../fundamentals/Logo"
import { BellAlert, MagnifyingGlass } from "@medusajs/icons"
import Avatar from "../../atoms/avatar"
import { useForm } from "react-hook-form"

const Navbar: React.FC = () => {
  const { register, handleSubmit, reset, formState } = useForm()
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

  const onSubmit = (data: any) => {
    // console.log("data :>> ", data)
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  }, [formState, reset])
  return (
    <div className=" w-full bg-[#1B241F] px-6 py-[14px]">
      <div className=" flex w-full  items-center  justify-between  ">
        <div className="flex items-center gap-3">
          <Logo />
          <h1 className="font-['Futura'] text-[22px] font-bold tracking-tight text-white">
            MoveShop
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <button
              type="submit"
              className=" pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            >
              <MagnifyingGlass className="h-5 w-5 text-white" />
            </button>
            <input
              {...register("search")}
              className="h-12 w-[812px] rounded-lg border border-neutral-700 bg-white bg-opacity-10 px-4 py-2.5 pl-10 text-white shadow"
              type="search"
              name="search"
              id="search"
              placeholder="Search"
            />
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

import React, { useCallback, useState, type MouseEvent } from "react"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import Logo from "../../fundamentals/Logo"
import { BarsThree, BellAlert, MagnifyingGlass } from "@medusajs/icons"
import Avatar from "../../atoms/avatar"
import { useForm } from "react-hook-form"
import MenuSideModal from "./menu/side-bar-menu"

const Navbar: React.FC = () => {
  const { register, handleSubmit, reset, formState } = useForm()
  const {
    state: activityDrawerState,
    toggle: toggleActivityDrawer,
    close: activityDrawerClose,
  } = useToggleState(false)
  const [isModalVisible, showModal, hideModal] = useToggleState(false)
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
    <>
      <MenuSideModal close={hideModal} isVisible={isModalVisible} />
      <div className=" w-full bg-[#1B241F] px-6 py-[14px]">
        <div className=" flex w-full  items-center  justify-between gap-2  ">
          <div className="medium:flex medium:gap-3 hidden items-center gap-1 ">
            <Logo />
            <h1 className="font-['Futura'] text-[22px] font-bold tracking-tight text-white">
              MoveShop
            </h1>
          </div>

          <button className="medium:hidden" onClick={showModal}>
            <BarsThree className="text-2xl text-white  " />
          </button>
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
                className="medium:w-[812px] h-12  w-full rounded-lg border border-neutral-700 bg-white bg-opacity-10 px-4 py-2.5 pl-10 text-white shadow"
                type="search"
                name="search"
                id="search"
                placeholder="Search"
              />
            </div>
          </form>

          <div className="medium:gap-3 flex items-center gap-1">
            <div className="medium:inline-flex hidden h-12 w-44 items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-3 shadow">
              <div className=" text-base font-semibold leading-normal text-gray-100">
                My Business Store
              </div>
            </div>

            <div className="medium:ml-12 medium:gap-4  flex items-center gap-3">
              <div className="medium:h-12 medium:w-12 flex h-6 w-6 items-center justify-center rounded-full bg-[#323A37]">
                <BellAlert color="#fff" />
              </div>

              <div className="medium:h-12 medium:w-12 h-6 w-6 ">
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
    </>
  )
}

export default Navbar
function getInputProps(): import("react/jsx-runtime").JSX.IntrinsicAttributes &
  React.InputHTMLAttributes<HTMLInputElement> &
  React.RefAttributes<HTMLInputElement> {
  throw new Error("Function not implemented.")
}

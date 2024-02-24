import React from "react"

const PhoneMenu: React.FC = () => {
  const styles =
    "group py-1.5 my-0.5 rounded-rounded flex font-bold justify-between text-large text-grey-50 hover:bg-grey-10 items-center px-2"
  const activeStyles = "bg-grey-10 is-active"
  const classNameFn = useCallback(({ isActive }: any) => {
    const str = isActive ? `${styles} ${activeStyles}` : styles
    return str
  }, [])
  return (
    <>
      <div>
        <div className="inline-flex h-16 w-[360px] items-start justify-between bg-white px-4 shadow">
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
            <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
              <div className="relative h-5 w-5"></div>
            </div>
            <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
              <NavLink className={classNameFn} to={"a/home"}>
                <div className="flex items-center gap-3">
                  <span className="group-[.is-active]:text-grey-90">home</span>
                </div>
              </NavLink>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
            <div className="inline-flex h-6 w-6 items-center justify-center p-[2.50px]">
              <div className="relative h-[19px] w-[19px]"></div>
            </div>
            <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-green-700">
              Order
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
            <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
              <div className="relative h-5 w-5"></div>
            </div>
            <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
              Product
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PhoneMenu

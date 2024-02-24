import React, { useCallback } from "react"
import { NavLink } from "react-router-dom"
import HomeIcon from "../../../../fundamentals/icons/home-icon"
import OrdersIcon from "../../../../fundamentals/icons/orders-icon"
import ProductsIcon from "../../../../fundamentals/icons/products-icon"

const PhoneMenu: React.FC = () => {
  const styles =
    "group  flex font-bold justify-between text-large text-grey-50  items-center px-2"
  const activeStyles = "is-active text-green-500"
  const classNameFn = useCallback(({ isActive }: any) => {
    const str = isActive ? `${styles} ${activeStyles}` : styles
    return str
  }, [])
  return (
    <>
      <div className="fixed bottom-0 z-50 w-full ">
        <div>
          <div className="flex h-16   items-center justify-between border bg-white px-4  shadow-lg">
            <NavLink className={classNameFn} to={"/a/home"}>
              <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
                <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
                  <div className="relative h-5 w-5">
                    <HomeIcon />
                  </div>
                </div>
                <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="group-[.is-active]:text-green-500">
                        home
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>

            <NavLink className={classNameFn} to={"/a/orders"}>
              <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
                <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
                  <div className="relative h-5 w-5">
                    <OrdersIcon />
                  </div>
                </div>
                <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="group-[.is-active]:text-green-500">
                        Orders
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>

            <NavLink className={classNameFn} to={"/a/products"}>
              <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
                <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
                  <div className="relative h-5 w-5">
                    <ProductsIcon />
                  </div>
                </div>
                <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="group-[.is-active]:text-green-500">
                        Products
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default PhoneMenu

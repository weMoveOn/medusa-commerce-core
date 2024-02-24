import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Navbar from "../organisms/navbar"

import { useTranslation } from "react-i18next"
import SidebarMenuItem from "../molecules/sidebar-menu-item"
import HomeIcon from "../fundamentals/icons/home-icon"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()

  return (
    <>
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />

      <div className="inter-base-regular text-grey-90">
        <div className="medium:block ">
          <Navbar />
        </div>
        <div className="fixed bottom-0 z-50 w-full">
          <div>
            <div className="flex h-16   items-center justify-between border bg-white px-4  shadow-lg">
              <div className="inline-flex shrink grow basis-0 flex-col items-center justify-center gap-1 self-stretch py-3">
                <div className="inline-flex h-6 w-6 items-center justify-center p-0.5">
                  <div className="relative h-5 w-5">
                    <SidebarMenuItem
                      pageLink={"/a/home"}
                      icon={<HomeIcon />}
                      triggerHandler={() => {}}
                      text={t("home", "Home")}
                    />
                  </div>
                </div>
                <div className="self-stretch text-center font-['Inter'] text-xs font-medium leading-none tracking-wide text-zinc-900">
                  Home
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
        </div>
        <div className="  flex  w-full ">
          <div className="medium:block hidden">
            <Sidebar />
          </div>
          <div className="flex h-screen flex-1 flex-col">
            {/* min-h-content */}
            <div className=" overflow-y-auto   bg-[#F2F4F6]">
              {/*  medium:mx-4xlarge large:mx-auto large:max-w-7xl large:w-full h-full */}
              <main className="h-full w-full">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout

import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Navbar from "../organisms/navbar"

import { useTranslation } from "react-i18next"
import BottomMenu from "../organisms/navbar/menu/bottom-menu"

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

        <div className="flex w-full bg-[#F2F4F6]">
          <div className="medium:block hidden">
            <Sidebar />
          </div>
          <div className="flex h-screen flex-1 flex-col">
            <div className="overflow-y-auto">
              <main className="h-full w-full p-6">{children}</main>
            </div>
          </div>
        </div>
      </div>

      <BottomMenu />
    </>
  )
}

export default Layout

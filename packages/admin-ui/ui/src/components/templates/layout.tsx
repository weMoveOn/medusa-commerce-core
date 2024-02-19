import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Navbar from "../organisms/navbar"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1600px] border shadow-lg ">
      <Navbar />
      <div className="inter-base-regular text-grey-90 flex h-screen w-full ">
        <Toaster
          containerStyle={{
            top: 74,
            left: 24,
            bottom: 24,
            right: 24,
          }}
        />

        <Sidebar />
        <div className="flex flex-1 flex-col">
          {/* min-h-content */}
          <div className=" overflow-y-auto  bg-[#F2F4F6]">
            {/*  medium:mx-4xlarge large:mx-auto large:max-w-7xl large:w-full h-full */}
            <main className="">{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout

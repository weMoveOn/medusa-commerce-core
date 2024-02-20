import React from "react"
import { Toaster } from "react-hot-toast"
import Sidebar from "../organisms/sidebar"
import Navbar from "../organisms/navbar"
import useToggleState from "../../hooks/use-toggle-state"
import { useTranslation } from "react-i18next"
import Button from "../fundamentals/button"
import MenuSideModal from "../organisms/navbar/menu/side-modal"

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation()
  const [isModalVisible, showModal, hideModal] = useToggleState(false)

  return (
    <div className="inter-base-regular text-grey-90">
      <Toaster
        containerStyle={{
          top: 74,
          left: 24,
          bottom: 24,
          right: 24,
        }}
      />
      <Button
        size="small"
        variant="secondary"
        className="h-[40px]"
        onClick={showModal}
      >
        {t("pages-add-sales-channels", "Add sales channels")}
      </Button>

      <MenuSideModal close={hideModal} isVisible={isModalVisible} />
      <div className="medium:block hidden">
        <Navbar />
      </div>
      <div className=" flex h-screen w-full ">
        <div>
          <Sidebar />
        </div>
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

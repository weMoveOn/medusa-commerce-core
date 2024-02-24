import { useRef, useState } from "react"
import { useAdminSalesChannels } from "medusa-react"
import { SalesChannel } from "@medusajs/medusa"
import { useTranslation } from "react-i18next"
import SideModal from "../../../../molecules/modal/side-modal"
import Button from "../../../../fundamentals/button"
import CrossIcon from "../../../../fundamentals/icons/cross-icon"
import Sidebar from "../../../sidebar"

type AddSalesChannelsSideModalProps = {
  close: () => void
  isVisible: boolean
}

function MenuSideModal(props: AddSalesChannelsSideModalProps) {
  const { isVisible, close } = props

  const { t } = useTranslation()

  const onSave = () => {
    close()
  }

  const onClose = () => {
    close()
  }

  return (
    <SideModal close={onClose} isVisible={!!isVisible}>
      <div className="flex h-screen flex-col justify-between ">
        {/* === HEADER === */}

        <div className="mb-4 mr-4 mt-4 flex items-center justify-end">
          <Button
            variant="secondary"
            className="h-8 w-8 p-2"
            onClick={props.close}
          >
            <CrossIcon size={20} className="text-grey-50" />
          </Button>
        </div>
        {/* === BODY === */}
        <Sidebar />
        {/* === FOOTER === */}

        <div className="flex justify-end gap-2 p-4">
          <div className="h-8 w-8 rounded-full border bg-black"></div>
        </div>
      </div>
    </SideModal>
  )
}

export default MenuSideModal

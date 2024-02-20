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
      <div className="flex h-full flex-col justify-between p-6">
        {/* === HEADER === */}

        <div className="flex items-center justify-between">
          <h3 className="inter-large-semibold flex items-center gap-2 text-xl text-gray-900">
            {t("modals-add-sales-channels", "MoveShop")}
          </h3>
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

        <div className="flex justify-end gap-2">
          <Button size="small" variant="ghost" onClick={onClose}>
            {t("modals-cancel", "Cancel")}
          </Button>
        </div>
      </div>
    </SideModal>
  )
}

export default MenuSideModal

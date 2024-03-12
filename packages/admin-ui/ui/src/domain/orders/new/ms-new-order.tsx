import { useAdminCreateDraftOrder } from "medusa-react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { LayeredModalContext } from "../../../components/molecules/modal/layered-modal"
import SteppedModal, {
  SteppedContext,
} from "../../../components/molecules/modal/stepped-modal"
import useNotification from "../../../hooks/use-notification"
import isNullishObject from "../../../utils/is-nullish-object"
import Billing from "./components/billing-details"
import Items from "./components/items"
import SelectRegionScreen from "./components/select-region"
import SelectShippingMethod from "./components/select-shipping"
import ShippingDetails from "./components/shipping-details"
import Summary from "./components/summary"
import { useNewOrderForm } from "./form"
import MsItems from "./components/ms-items"
import Modal, { ModalContext } from "../../../components/molecules/modal"

type NewOrderProps = {
  onDismiss: () => void
  setItems: (items: any) => void
}

const MsNewOrder = ({ onDismiss,setItems }: NewOrderProps) => {
  const steppedContext = React.useContext(SteppedContext)
  const layeredContext = React.useContext(LayeredModalContext)

  const { t } = useTranslation()
  const navigate = useNavigate()
  const notification = useNotification()
  // const { mutate } = useAdminCreateDraftOrder()

  const {
    form: { handleSubmit, reset },
    context: { region },
  } = useNewOrderForm()

  const onSubmit = handleSubmit((data) => {
    console.log("data ms-new-order:>> ", data)
    setItems(data.items)
  })

  return (
    <>
      <SteppedModal
        layeredContext={layeredContext}
        context={steppedContext}
        onSubmit={onSubmit}
        steps={[<MsItems />]}
        title={t("new-create-manual-order", "Create Manual Order")}
        handleClose={onDismiss}
      />
    </>
  )
}

export default MsNewOrder

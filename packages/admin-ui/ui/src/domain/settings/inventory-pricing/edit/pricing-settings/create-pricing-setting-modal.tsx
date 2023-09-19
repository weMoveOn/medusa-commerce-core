import { Region } from "@medusajs/medusa"
import { useAdminCreateShippingOption, useAdminStore } from "medusa-react"
import { useForm } from "react-hook-form"
import { getSubmittableMetadata } from "../../../../../components/forms/general/metadata-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { useShippingOptionFormData } from "../../components/price-setting-form/use-pricing-option-form-data"
import { IInventoryStore } from "../../../../../types/inventory-store"
import PricingOptionForm, { PricingOptionFormType } from "../../components/price-setting-form"

type Props = {
  open: boolean
  onClose: () => void
  store: IInventoryStore
}

const CreatePricingOptionModal = ({ open, onClose, store }: Props) => {
  const form = useForm<PricingOptionFormType>()
  const { store : medusaStore, status, error } = useAdminStore({})

  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form
  const { mutate, isLoading } = useAdminCreateShippingOption()
  const notifcation = useNotification()

  const closeAndReset = () => {
    reset()
    onClose()
  }

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    console.log(store)
    // mutate(
    //   {
    //     is_return: false,
    //     region_id: region.id,
    //     profile_id: data.shipping_profile?.value,
    //     name: data.name!,
    //     data: fData,
    //     price_type: data.price_type!.value,
    //     provider_id,
    //     admin_only: !data.store_option,
    //     amount: data.amount!,
    //     requirements: getRequirementsData(data),
    //     metadata: getSubmittableMetadata(data.metadata),
    //   },
    //   {
    //     onSuccess: () => {
    //       notifcation("Success", "Shipping option created", "success")
    //       closeAndReset()
    //     },
    //     onError: (error) => {
    //       notifcation("Error", getErrorMessage(error), "error")
    //     },
    //   }
    // )
  })

  return (
    <Modal open={open} handleClose={closeAndReset}>
      <Modal.Body>
        <Modal.Header handleClose={closeAndReset}>
          <h1 className="inter-xlarge-semibold">Set Price</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            {medusaStore && <PricingOptionForm form={form} store={store} medusaStore={medusaStore} />}
          </Modal.Content>
          <Modal.Footer>
            <div className="gap-x-xsmall flex w-full items-center justify-end">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={closeAndReset}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                type="submit"
                loading={isLoading}
                disabled={isLoading || !isDirty}
              >
                Save and close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePricingOptionModal

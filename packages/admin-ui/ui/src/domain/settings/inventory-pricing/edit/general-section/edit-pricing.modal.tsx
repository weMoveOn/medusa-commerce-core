import { AdminPostRegionsRegionReq, Region } from "@medusajs/medusa"
import { useAdminUpdateRegion } from "medusa-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import MetadataForm, {
  getMetadataFormValues,
  getSubmittableMetadata,
  MetadataFormType,
} from "../../../../../components/forms/general/metadata-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { useFeatureFlag } from "../../../../../providers/feature-flag-provider"
import { currencies } from "../../../../../utils/currencies"
import { getErrorMessage } from "../../../../../utils/error-messages"
import fulfillmentProvidersMapper from "../../../../../utils/fulfillment-providers.mapper"
import { nestedForm } from "../../../../../utils/nested-form"
import paymentProvidersMapper from "../../../../../utils/payment-providers-mapper"
import RegionDetailsForm, {
  RegionDetailsFormType,
} from "../../components/region-form/region-details-form"
import RegionProvidersForm, {
  RegionProvidersFormType,
} from "../../components/region-form/region-providers-form"
import { IPriceSetting } from "../../../../../types/inventory-price-setting"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Medusa from "../../../../../services/api"

type Props = {
  data: IPriceSetting
  open: boolean
  onClose: () => void
}

const EditPricingModal = ({ data, onClose, open }: Props) => {
  const queryClient = useQueryClient()
  const form = useForm<IPriceSetting>({
    defaultValues: getDefaultValues(data),
  })
  const { isFeatureEnabled } = useFeatureFlag()

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = form

  const closeAndReset = () => {
    reset(getDefaultValues(data))
    onClose()
  }

  useEffect(() => {
    reset(getDefaultValues(data))
  }, [data, reset])

  const notifcation = useNotification()

  const updatePriceSettingMutation = useMutation(
    (data: IPriceSetting) => Medusa.InventoryPriceSettings.update(data.id, { ...data }),
    {
      onSuccess: () => {
        notifcation("Success", "Price role updated", "success");
        queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
        closeAndReset();
      },
      onError: (error) => {
        notifcation("Error", getErrorMessage(error), "error");
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    // const newData: CreatePricingOptionFormType = {
    //   conversion_rate: data.conversion_rate,
    //   currency_code: data.currency_code.value,
    //   profit_amount: data.profit_amount,
    //   profit_operation: data.profit_operation.value,
    //   shipping_charge: data.shipping_charge,
    //   store_slug: store.slug
    // };
    // createPriceSettingMutation.mutate(newData)
  })

  return (
    <Modal handleClose={closeAndReset} open={open}>
      <Modal.Body>
        <Modal.Header handleClose={closeAndReset}>
          <h1 className="inter-xlarge-semibold">Edit Region Details</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <div>
              <h3 className="inter-base-semibold mb-base">Details</h3>
            </div>
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
                // loading={isLoading}
                // disabled={isLoading || !isDirty}
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

const getDefaultValues = (editData: IPriceSetting): IPriceSetting => {
  return editData;
}


export default EditPricingModal

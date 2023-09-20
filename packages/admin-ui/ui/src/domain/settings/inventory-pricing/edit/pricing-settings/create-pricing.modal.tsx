import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { CreatePricingOptionFormType, ICurrencyOptions, IInventoryStore, IPriceSettingReturnType, PricingOptionFormType } from "../../../../../types/inventory-price-setting"
import PriceSettingForm from "../../components/price-setting-form"
import Medusa from "../../../../../services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getErrorMessage } from "../../../../../utils/error-messages"

type Props = {
  open: boolean
  onClose: () => void
  store: IInventoryStore
  data?: IPriceSettingReturnType
  currencyOptions: ICurrencyOptions[]
}

const CreatePricingOptionModal = ({ open, onClose, store, data, currencyOptions }: Props) => {
  const form = useForm<PricingOptionFormType>()
  const {
    formState: { isDirty },
    handleSubmit,
    reset,
  } = form
  const notifcation = useNotification()
  const queryClient = useQueryClient()

  const closeAndReset = () => {
    reset()
    onClose()
  }

  const createPriceSettingMutation = useMutation(
    (data: CreatePricingOptionFormType) => Medusa.InventoryPriceSettings.add({ ...data, store_slug: store.slug }),
    {
      onSuccess: () => {
        notifcation("Success", "New price role created", "success");
        queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
        closeAndReset();
      },
      onError: (error) => {
        notifcation("Error", getErrorMessage(error), "error");
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    const newData: CreatePricingOptionFormType = {
      conversion_rate: data.conversion_rate,
      currency_code: data.currency_code.value,
      profit_amount: data.profit_amount,
      profit_operation: data.profit_operation.value,
      shipping_charge: data.shipping_charge,
      store_slug: store.slug
    };
    createPriceSettingMutation.mutate(newData)
  })

  return (
    <Modal open={open} handleClose={closeAndReset}>
      <Modal.Body>
        <Modal.Header handleClose={closeAndReset}>
          <h1 className="inter-xlarge-semibold">Set Price</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
           <PriceSettingForm form={form} currencyOptions={currencyOptions} />
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
                disabled={!isDirty}
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

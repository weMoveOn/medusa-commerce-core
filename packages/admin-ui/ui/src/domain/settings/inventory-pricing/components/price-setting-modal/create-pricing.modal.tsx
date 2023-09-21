import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { CreatePricingOptionFormType, ICurrencyOptions, IInventoryStore, IPriceSettingReturnType, PricingOptionFormType, ProfitOperation } from "../../../../../types/inventory-price-setting.d"
import AddPriceRoleForm from "../price-setting-form/add_price_role_form"
import Medusa from "../../../../../services/api"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getCustomErrorMessage, getErrorMessage } from "../../../../../utils/error-messages"

type Props = {
  open: boolean
  onClose: () => void
  store: IInventoryStore
  currencyOptions: ICurrencyOptions[]
}

const CreatePricingOptionModal = ({ open, onClose, store, currencyOptions }: Props) => {
  const form = useForm<PricingOptionFormType>({
    defaultValues: {
      profit_operation: {
        label: "Addition", 
        value: ProfitOperation.ADDITION
      }
    }
  })
  const {
    formState: { isDirty },
    handleSubmit,
    reset,
    setError,
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
        const errors = getCustomErrorMessage(error);
        if(typeof errors === "string")
        notifcation("Error", errors, "error")
        else errors.forEach(
          (err : { key: "store_slug" | "currency_code" | "conversion_rate" | "profit_amount" | "shipping_charge" | "profit_operation",
           message: string
          }) => {
            if(err.key!=="store_slug")
          setError(err.key, {
            type: "manual",
            message: err.message,
          })})
    }
  }
);

  const onSubmit = handleSubmit((data) => {
    console.log("first")
    const newData: CreatePricingOptionFormType = {
      conversion_rate: Number(data.conversion_rate ?? 1),
      currency_code: data.currency_code?.value,
      profit_amount: Number(data.profit_amount ?? 0),
      profit_operation: data.profit_operation?.value ?? ProfitOperation.ADDITION,
      shipping_charge: Number(data.shipping_charge ?? 0),
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
           <AddPriceRoleForm form={form} currencyOptions={currencyOptions} />
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

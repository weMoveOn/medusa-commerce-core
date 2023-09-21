import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { getCustomErrorMessage, getErrorMessage } from "../../../../../utils/error-messages"
import { IPriceSetting, IPriceSettingReturnType, IUpdatePriceOptionFormType, IUpdatePriceSetting, ProfitOperation } from "../../../../../types/inventory-price-setting.d"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Medusa from "../../../../../services/api"
import EditPriceRoleForm from "../price-setting-form/edit_price-role-form"
import { Currency } from "@medusajs/medusa"
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store"

type Props = {
  data: IPriceSettingReturnType
  editData: IUpdatePriceSetting
  medusaStore: ExtendedStoreDTO
  open: boolean
  onClose: () => void
}

const EditPricingModal = ({ data, editData, medusaStore, onClose, open }: Props) => {
  const queryClient = useQueryClient()
  const notifcation = useNotification()
  const form = useForm<IUpdatePriceSetting>({
    defaultValues: getDefaultValues(editData),
  })

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isDirty },
  } = form

  const closeAndReset = () => {
    reset(getDefaultValues(editData))
    onClose()
  }

  useEffect(() => {
    reset(getDefaultValues(editData))
  }, [editData, reset])

  const updatePriceSettingMutation = useMutation(
    (data: IUpdatePriceSetting) => Medusa.InventoryPriceSettings.update(data.id, { ...data }),
    {
      onSuccess: () => {
        notifcation("Success", "Price role updated", "success");
        queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
        closeAndReset();
      },
      onError: (error) => {
        const errors = getCustomErrorMessage(error);
        if(typeof errors === "string")
        notifcation("Error", errors, "error")
        else errors.forEach(
          (err : { key:"store_slug" | "currency_code" | "conversion_rate" | "profit_amount" | "shipping_charge" |
          "profit_operation",
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
    const updatedData : IUpdatePriceOptionFormType = data as any;
    const formattedData = {
      conversion_rate: Number(updatedData.conversion_rate ?? 1),
      currency_code: updatedData.currency_code?.value,
      profit_amount: Number(updatedData.profit_amount ?? 0),
      profit_operation: updatedData.profit_operation.value ?? ProfitOperation.ADDITION,
      shipping_charge: Number(updatedData.shipping_charge ?? 0),
      store_slug: updatedData.store_slug,
      id: updatedData.id
    } ;
    updatePriceSettingMutation.mutate(formattedData)
  })

  const availableCurrencyOptions = useMemo(() => {
    let currencyCodesInData : Array<string> = [];
    let filteredCurrencies: Currency[] = [];
    currencyCodesInData = data.result.map((item) => item.currency_code);
    filteredCurrencies = medusaStore.currencies.filter((currency) =>
    !currencyCodesInData.includes(currency.code)
  );
  return filteredCurrencies && filteredCurrencies.map((currency) => {
    return {
      value: currency.code,
      label: currency.name,
      prefix: currency.symbol
    }
  })
}, [data, medusaStore])

const allCurrencyOptions = useMemo(() => {
  const currencies = medusaStore.currencies.map((currency) => {
  return {
    value: currency.code,
    label: currency.name,
    prefix: currency.symbol
  }
})
return currencies
}, [medusaStore])

  return (
    <Modal handleClose={closeAndReset} open={open}>
      <Modal.Body>
        <Modal.Header handleClose={closeAndReset}>
          <h1 className="inter-xlarge-semibold">Edit Price Role</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <div>
              <EditPriceRoleForm form={form} availableCurrencyOptions={availableCurrencyOptions} allCurrencyOptions={allCurrencyOptions} />
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

const getDefaultValues = (editData: IPriceSetting): IPriceSetting => {
  return editData;
}


export default EditPricingModal

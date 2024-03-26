import { useContext, useEffect, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/fundamentals/button"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import Select from "../../../../components/molecules/select"
import CurrencyInput from "../../../../components/organisms/currency-input"
import { extractOptionPrice } from "../../../../utils/prices"
import { useNewOrderForm } from "../form"
import TruckIcon from "../../../../components/fundamentals/icons/truck-icon"
import RadioGroup from "../../../../components/organisms/ms-radio-group"

const MsSelectShippingMethod = () => {
  const { t } = useTranslation()
  const { disableNextPage, enableNextPage } = useContext(SteppedContext)
  const [showCustomPrice, setShowCustomPrice] = useState(false)

  const {
    context: { region, shippingOptions },
    form: { control, setValue },
  } = useNewOrderForm()

  const currentCustomPrice = useWatch({
    control,
    name: "custom_shipping_price",
  })

  useEffect(() => {
    if (!showCustomPrice && currentCustomPrice) {
      setShowCustomPrice(true)
    }
  }, [currentCustomPrice])

  const selectedShippingOption = useWatch({
    control,
    name: "shipping_option",
  })

  // console.log("selectedShippingOption", selectedShippingOption)

  const removeCustomPrice = () => {
    setShowCustomPrice(false)
    setValue("custom_shipping_price", undefined)
  }

  useEffect(() => {
    if (!selectedShippingOption) {
      disableNextPage()
    }

    if (selectedShippingOption) {
      enableNextPage()
    }
  }, [selectedShippingOption])

  const handleChange = (value) => {
    if (shippingOptions.length) {
      const foundOption = shippingOptions.find((so) => so.id === value)
      if (foundOption) {
        setValue("shipping_option", {
          value: value,
          label: foundOption.name || "",
        })
      }
    }
  }

  return (
    <div className="pb-8">
      {!shippingOptions?.length && !region ? (
        <div className="flex flex-col items-center justify-center">
          <div className="bg-grey-100 mb-4 flex h-[90px] w-[90px] items-center justify-center rounded-[50%]">
            <TruckIcon size={54} />
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h3>
              Add your Shipping MethodAdd your Shipping MethodAdd your Shipping
              your Shipping MethodAdd your Shipping MethodAdd your Shipping
              Method
            </h3>
            <Button className="mt-6" variant="primary">
              Add Shipping Method
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div>
            <h2 className="mb-2 text-lg font-bold">Most Popular</h2>
            <RadioGroup.Root
              onValueChange={handleChange}
              className="grid grid-cols-3 gap-6"
            >
              {shippingOptions.map((r, index) => {
                return (
                  <div key={r.id}>
                    <RadioGroup.Item
                      label={r.name}
                      description={r.name}
                      value={r.id}
                      key={r.id}
                    />
                  </div>
                )
              })}
            </RadioGroup.Root>
          </div>
          <Controller
            control={control}
            name="shipping_option"
            render={({ field: { value, onChange } }) => {
              return (
                <Select
                  placeholder="Pathao Currier"
                  onChange={onChange}
                  value={value}
                  options={
                    shippingOptions?.map((so) => ({
                      value: so.id,
                      label: `${so.name} - ${extractOptionPrice(
                        so.amount,
                        region
                      )}`,
                    })) || []
                  }
                />
              )
            }}
          />
          <div className="mt-4">
            {!showCustomPrice && (
              <div className="flex w-full justify-end">
                <Button
                  variant="ghost"
                  size="small"
                  className="border-grey-20 w-[125px] border"
                  disabled={!selectedShippingOption}
                  onClick={() => setShowCustomPrice(true)}
                >
                  {t("components-set-custom-price", "Set custom price")}
                </Button>
              </div>
            )}
            {showCustomPrice && (
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <Controller
                    control={control}
                    name="custom_shipping_price"
                    render={({ field: { value, onChange } }) => {
                      return (
                        <CurrencyInput.Root
                          readOnly
                          size="small"
                          currentCurrency={region.currency_code}
                        >
                          <CurrencyInput.Amount
                            label={t("components-custom-price", "Custom Price")}
                            amount={value}
                            onChange={onChange}
                          />
                        </CurrencyInput.Root>
                      )
                    }}
                  />
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={removeCustomPrice}
                  className="text-grey-40 ml-8 mt-7 h-8 w-8"
                >
                  <TrashIcon size={20} />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MsSelectShippingMethod

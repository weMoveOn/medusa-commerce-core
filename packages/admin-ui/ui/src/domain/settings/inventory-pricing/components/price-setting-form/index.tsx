import { Controller, UseFormReturn } from "react-hook-form"
import InputField from "../../../../../components/molecules/input"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import FormValidator from "../../../../../utils/form-validator"
import { useMemo } from "react"
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store"
import { IInventoryStore, PricingOptionFormType, ProfitOperation } from "../../../../../types/inventory-price-setting.d"

type Props = {
  
  form: UseFormReturn<PricingOptionFormType, any>
  store: IInventoryStore
  medusaStore: ExtendedStoreDTO
  isEdit?: boolean
}

const PriceSettingForm = ({ form, store, medusaStore, isEdit = false }: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form

  const currencyOptions = useMemo(() => {
    return medusaStore.currencies.map((currency) => {
      return {
        value: currency.code,
        label: currency.name,
        prefix: currency.code.toUpperCase(),
      }
    })
  }, [store])

  return (
    <div>
      {/* <div className="bg-grey-20 my-xlarge h-px w-full" /> */}
      <div>
        <div className="gap-large grid grid-cols-2">
        <div className="gap-large flex items-center">
            <Controller
              control={control}
              name="currency_code"
              render={({ field: { onChange, value, onBlur } }) => {
                return (
            <NextSelect
            label="Currency Type"
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={currencyOptions}
            placeholder="Choose a currency type"
            errors={errors}
          />
          )
              }}
            />
         </div> 
         
         <InputField
            label="Conversion Rate"
            required
            {...register("conversion_rate", {
              pattern: FormValidator.whiteSpaceRule("Conversion rate"),
              minLength: FormValidator.minOneCharRule("Conversion rate"),
            })}
            errors={errors}
          />
      
        </div>
      </div>

      <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
        <div className="gap-large grid grid-cols-2">
        <div className="gap-large flex items-center">
            <Controller
              control={control}
              name="profit_operation"
              render={({ field: { onChange, value, onBlur } }) => {
                return (
            <NextSelect
            label="Profit Operation"
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={[
                {
                  label: "Addition", value: ProfitOperation.ADDITION
                },
                {
                  label: "Multiplication", value: ProfitOperation.MULTIPLICATION
                },
                {
                  label: "Percent", value: ProfitOperation.PERCENT
                }
            ]}
            placeholder="Choose a profit operation"
            errors={errors}
          />
          )
          }}
        />
         </div> 
         
         <InputField
            label="Profit Value"
            required
            {...register("profit_amount", {
              pattern: FormValidator.whiteSpaceRule("Profit Value"),
              minLength: FormValidator.minOneCharRule("Profit Value"),
            })}
            errors={errors}
          />
        </div>

        <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
        <div className="gap-large grid grid-cols-2">
        <InputField
            label="Shipping Charge"
            required
            {...register("shipping_charge", {
              pattern: FormValidator.whiteSpaceRule("Shipping Charge"),
              minLength: FormValidator.minOneCharRule("Shipping Charge"),
            })}
            errors={errors}
          />
        </div> 
       </div> 
      </div>
     </div>
  )
}

export default PriceSettingForm

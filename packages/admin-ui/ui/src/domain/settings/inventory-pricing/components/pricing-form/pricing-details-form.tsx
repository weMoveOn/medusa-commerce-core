import { Controller, UseFormReturn } from "react-hook-form"
import InputField from "../../../../../components/molecules/input"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import FormValidator from "../../../../../utils/form-validator"
import { CurrencyCodeSelectOption, ICurrencyOptions, IPriceSetting, ProfitOperation, ProfitOperationSelectOption } from "../../../../../types/inventory-price-setting.d"
import { useMemo } from "react"

type Props = {
  form: UseFormReturn<IPriceSetting, any>
  availableCurrencyOptions: CurrencyCodeSelectOption[]
  allCurrencyOptions: CurrencyCodeSelectOption[]
}

const profitOperationOptions: ProfitOperationSelectOption[] = [
  {
    label: "Addition", value: ProfitOperation.ADDITION
  },
  {
    label: "Multiplication", value: ProfitOperation.MULTIPLICATION
  },
  {
    label: "Percent", value: ProfitOperation.PERCENT
  }
]

const PricingDetailsForm = ({ form, availableCurrencyOptions, allCurrencyOptions }: Props) => {
  const {
    control,
    register,
    formState: { errors },
  } = form

  function findOptionByValue(arr: ProfitOperationSelectOption[] | ICurrencyOptions[], targetValue: ProfitOperation | string) {
    return arr.find(obj => obj.value === targetValue);
  }

  function findAvilableCurrencyOptions(targetValue: string): CurrencyCodeSelectOption[] {
    const currentlyActiveCurrencyOption = useMemo(() => {
      return allCurrencyOptions.find(option => option.value === targetValue) as CurrencyCodeSelectOption;
    }, []);
  
    return useMemo(() => {
      return [...availableCurrencyOptions, currentlyActiveCurrencyOption];
    }, [availableCurrencyOptions, currentlyActiveCurrencyOption]);
  }

  return (
    <div>
      <div>
        <div className="gap-large grid grid-cols-2">
        <div className="gap-large flex items-center">
            <Controller
              control={control}
              name="currency_code"
              render={({ field: { onChange, value, onBlur } }) => {
                console.log(findOptionByValue(allCurrencyOptions, value))
                return (
            <NextSelect
            label="Currency Type"
            required
            defaultValue={findOptionByValue(allCurrencyOptions, value)}
            onChange={onChange}
            onBlur={onBlur}
            options={findAvilableCurrencyOptions(value)}
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
                pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Enter a valid number with up to 2 decimal places",
              },
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
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={findOptionByValue(profitOperationOptions, value as ProfitOperation)}
            options={profitOperationOptions}
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
                pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Enter a valid number with up to 2 decimal places",
    },
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
                pattern: {
      value: /^\d+(\.\d{1,2})?$/,
      message: "Enter a valid number with up to 2 decimal places",
    },
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

export default PricingDetailsForm

import { Controller, UseFormReturn } from "react-hook-form"
import { useMemo } from "react"
import { CurrencyCodeSelectOption, ICurrencyOptions, IPriceSetting, ProfitOperation, ProfitOperationSelectOption } from "../../../../../types/inventory-price-setting.d"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import InputField from "../../../../../components/molecules/input"
import { AppConst } from "../../../../../utils/app_const"

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

const EditPriceRoleForm = ({ form, availableCurrencyOptions, allCurrencyOptions }: Props) => {
  const {
    control,
    register,
    watch,
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
                return (
            <NextSelect
            helperText={!watch('currency_code') ? AppConst.FORM_CURRENCY_TYPE_HELPER_TEXT as string : ""}
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
            tooltipContent={AppConst.FORM_CONVERSION_RATE_TOOLTIP_CONTENT as string}
            label="Conversion Rate"
            required
            {...register("conversion_rate", {
            validate: (value) => {
              const pattern = /^(\d+(\.\d{1,2})?|\.\d{1,2})$/;
              if (!pattern.test(value.toString())) {
                return "Enter a valid number with up to 2 decimal places";
              }
             if (value < 1) {
              return "Conversion rate must be at least 1";
             }
             return true;
             },
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
            helperText={!watch('profit_operation') ? AppConst.FORM_PROFIT_OPERATION_HELPER_TEXT as string : ""}
            label="Profit Operation"
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
  label="Profit Amount"
  tooltipContent={AppConst.FORM_PROFIT_AMOUNT_TOOLTIP_CONTENT as string}
  {...register("profit_amount", {
    validate: (value) => {
      const pattern = /^(\d+(\.\d{1,2})?|\.\d{1,2})$/;
      if (!pattern.test(value.toString())) {
        return "Enter a valid number with up to 2 decimal places";
      }
      const selectedProfitOperation: any = watch("profit_operation");
      if (selectedProfitOperation && (selectedProfitOperation?.value === ProfitOperation.MULTIPLICATION || selectedProfitOperation === ProfitOperation.MULTIPLICATION)) {
        // If profit operation is Multiplication, require the amount to be at least 1
        if (parseFloat(value.toString()) < 1) {
          return "Profit Amount must be at least 1 when Profit Operation is Multiplication.";
        }
      } else {
        // For other profit operations, require the amount to be at least 0
        if (parseFloat(value.toString()) < 0) {
          return "Profit Amount must be at least 0.";
        }
      }
      return true;
    },
  })}
  errors={errors}
/>

        </div>

        <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
        <div className="gap-large grid grid-cols-2">
        <InputField
            tooltipContent={AppConst.FORM_SHIPPING_CHARGE_TOOLTIP_CONTENT as string}
            label="Shipping Charge"
            {...register("shipping_charge", {
              validate: (value) => {
                const pattern = /^(\d+(\.\d{1,2})?|\.\d{1,2})$/;
                if (!pattern.test(value.toString())) {
                  return "Enter a valid number with up to 2 decimal places";
                }
              }
            })}
            errors={errors}
          />
        </div> 
       </div> 
      </div>
     </div>
  )
}

export default EditPriceRoleForm

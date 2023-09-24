import { Controller, UseFormReturn } from "react-hook-form"
import { ICurrencyOptions, PricingOptionFormType, ProfitOperation } from "../../../../../types/inventory-price-setting.d"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import { AppConst } from "../../../../../utils/app_const"
import InputField from "../../../../../components/molecules/input"
import FormValidator from "../../../../../utils/form-validator"

type Props = {
  form: UseFormReturn<PricingOptionFormType, any>
  currencyOptions: ICurrencyOptions[]
}

const AddPriceRoleForm = ({ form, currencyOptions }: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form

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
            name="currency_code"
            helperText={!watch('currency_code') ? AppConst.FORM_CURRENCY_TYPE_HELPER_TEXT as string : ""}
            label="Currency Type"
            required
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            options={currencyOptions}
            placeholder="Choose a currency type"
            errors={errors}
          />
          )}}
          />
        </div> 
         
         <InputField
            tooltipContent={AppConst.FORM_CONVERSION_RATE_TOOLTIP_CONTENT as string}
            label="Conversion Rate"
            required
            {...register("conversion_rate", {
            pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Enter a valid number with up to 2 decimal places",
            },
            validate: (value) => {
            if (isNaN(value)) {
             return "Please enter a valid number.";
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
            name="profit_operation"
            helperText={!watch('profit_operation') ? AppConst.FORM_PROFIT_OPERATION_HELPER_TEXT as string : ""}
            label="Profit Operation"
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
          label="Profit Amount"
          tooltipContent={AppConst.FORM_PROFIT_AMOUNT_TOOLTIP_CONTENT as string}
          {...register("profit_amount", {
          pattern: {
          value: /^\d+(\.\d{1,2})?$/,
          message: "Enter a valid number with up to 2 decimal places",
          },
          minLength: FormValidator.minOneCharRule("Profit Amount"),
          validate: (value) => {
          if (isNaN(value)) {
           return "Please enter a valid number.";
          }
          const selectedProfitOperation = watch("profit_operation");

          if (selectedProfitOperation && selectedProfitOperation.value.toLowerCase() === 'multiplication') {
            // If profit operation is Multiplication, require the amount to be at least 1
            if (value < 1) {
              return "Profit Amount must be at least 1 when Profit Operation is Multiplication.";
            }
          } else {
            // For other profit operations, require the amount to be at least 0
            if (value < 0) {
              return "Profit Amount must be at least 0.";
            }
          }
          return true;
        }})}
         errors={errors}
         />
        </div>

        <div className="bg-grey-20 my-xlarge h-px w-full" />
        <div>
        <div className="gap-large grid grid-cols-2">
        <InputField
            label="Shipping Charge"
            tooltipContent={AppConst.FORM_SHIPPING_CHARGE_TOOLTIP_CONTENT as string}
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

export default AddPriceRoleForm

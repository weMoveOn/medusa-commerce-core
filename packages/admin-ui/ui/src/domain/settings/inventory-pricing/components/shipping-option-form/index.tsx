import { Region } from "@medusajs/medusa"
import { Controller, UseFormReturn } from "react-hook-form"
import IncludesTaxTooltip from "../../../../../components/atoms/includes-tax-tooltip"
import Switch from "../../../../../components/atoms/switch"
import MetadataForm, {
  MetadataFormType,
} from "../../../../../components/forms/general/metadata-form"
import PriceFormInput from "../../../../../components/forms/general/prices-form/price-form-input"
import InputHeader from "../../../../../components/fundamentals/input-header"
import InputField from "../../../../../components/molecules/input"
import { NextSelect } from "../../../../../components/molecules/select/next-select"
import { Option, ShippingOptionPriceType } from "../../../../../types/shared"
import FormValidator from "../../../../../utils/form-validator"
import { nestedForm } from "../../../../../utils/nested-form"
import { useShippingOptionFormData } from "./use-shipping-option-form-data"
import { IInventoryStore } from "../../../../../types/inventory-store"

type Requirement = {
  amount: number | null
  id: string | null
}

export type ShippingOptionFormType = {
  store_option: boolean
  name: string | null
  price_type: ShippingOptionPriceType | null
  amount: number | null
  shipping_profile: Option | null
  fulfillment_provider: Option | null
  requirements: {
    min_subtotal: Requirement | null
    max_subtotal: Requirement | null
  }
  metadata: MetadataFormType
}

type Props = {
  form: UseFormReturn<ShippingOptionFormType, any>
  store: IInventoryStore
  isEdit?: boolean
}

const PricingOptionForm = ({ form, store, isEdit = false }: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = form

  // const { shippingProfileOptions, fulfillmentOptions } =
  //   useShippingOptionFormData(region.id)

  return (
    <div>
      <div>
        <div className="gap-y-2xsmall flex flex-col">
          Set a default formula for your imported product pricing.
        </div>
      </div>
      <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
        <h3 className="inter-base-semibold mb-base">Details</h3>
        <div className="gap-large grid grid-cols-2">
          <InputField
            label="Title"
            required
            {...register("name", {
              required: "Title is required",
              pattern: FormValidator.whiteSpaceRule("Title"),
              minLength: FormValidator.minOneCharRule("Title"),
            })}
            errors={errors}
          />
          <div className="gap-large flex items-center">
            <Controller
              control={control}
              name="price_type"
              render={({ field: { onChange, value, onBlur } }) => {
                return (
                  <NextSelect
                    label="Price Type"
                    required
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={[
                      {
                        label: "Flat Rate",
                        value: "flat_rate",
                      },
                      {
                        label: "Calculated",
                        value: "calculated",
                      },
                    ]}
                    placeholder="Choose a price type"
                    errors={errors}
                  />
                )
              }}
            />
          </div>

        </div>
      </div>
      <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
      </div>
      <div className="bg-grey-20 my-xlarge h-px w-full" />
      <div>
        <h3 className="inter-base-semibold mb-base">Metadata</h3>
        <MetadataForm form={nestedForm(form, "metadata")} />
      </div>
    </div>
  )
}

export default PricingOptionForm

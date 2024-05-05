import {  useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import InputField from "../../../../components/molecules/input"
import { Option } from "../../../../types/shared"
import { useNewOrderForm } from "../form"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"
import { NextSelect } from "../../../../components/molecules/select/next-select"
import CheckIcon from "../../../../components/fundamentals/icons/check-icon"

type AddCustomerFormProps = {
  openWithBillingAddress: boolean
}

const AddCustomerForm = ({ openWithBillingAddress }: AddCustomerFormProps) => {
  const { t } = useTranslation()
  const [showBillingAddress, setShowBillingAddress] = useState(
    openWithBillingAddress
  )

  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

  const {
    register,
    control,
    formState: { errors },
  } = form



  const onCustomerSelect = (val: Option) => {
    const email = /\(([^()]*)\)$/.exec(val?.label)

    if (email) {
      form.setValue("email", email[1])
    } else {
      form.setValue("email", "")
    }
  }

  const email = useWatch({
    control: form.control,
    name: "email",
  })

  const shippingAddress = useWatch({
    control: form.control,
    name: "shipping_address",
  })

  const shippingAddressId = useWatch({
    control: form.control,
    name: "shipping_address_id",
  })

  const sameAsShipping = useWatch({
    control: form.control,
    name: "same_as_shipping",
  })

  const updateSameAsShipping = () => {
    if (!sameAsShipping) {
      form.setValue("billing_address", shippingAddress)
      form.setValue("billing_address_id", shippingAddressId)
    } else {
      form.resetField("billing_address")
      form.resetField("billing_address_id")
    }

    form.setValue("same_as_shipping", !sameAsShipping)
  }

  return (
    <div className="min-h-auto flex w-[812px] flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-6 border-b-2 border-dotted pb-5">
        <div className="grid grid-cols-2 gap-6">
          <InputField
            {...register("shipping_address.first_name")}
            label={t("full-name", "Full Name")}
            placeholder="Full Name"
            required
          />
          <InputField
            {...register("shipping_address.company")}
            label={t("company", "Company")}
            placeholder="MoveOn Technologies"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            {...register("email")}
            label={t("components-email", "Email")}
            placeholder="lebron@james.com"
            required
          />
          <InputField
            {...register("shipping_address.phone")}
            label={t("phone-number", "Phone Number")}
            placeholder="018877558855"
          />
        </div>
      </div>
      <div className="flex flex-col gap-y-6">
        <span className="text-xl font-bold">
          {t("components-shipping", "Shipping")}
        </span>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            {...register("shipping_address.address_1")}
            label={t("address", "Address")}
            placeholder="Mirpur DOHS, Ave 9"
            required
          />
          <InputField
            {...register("shipping_address.city")}
            label={t("city", "City")}
            placeholder="Dhaka"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            {...register("shipping_address.postal_code")}
            label={t("postal-code", "Postal Code")}
            placeholder="5525"
            required
          />
          <Controller
            control={control}
            name="shipping_address.country_code"
            rules={{
              required: true 
            }}
            render={({ field: { value, onChange } }) => {
              return (
                <NextSelect
                  label={t("templates-country", "Country")}
                  required={true}
                  value={value}
                  options={validCountries}
                  onChange={onChange}
                  name={"country_code"}
                  errors={errors}
                  isClearable={!true}
                />
              )
            }}
          />
        </div>
      </div>
      {!showBillingAddress ? (
        <div className="flex justify-between">
          <div
            className="mb-6 mt-4 flex cursor-pointer items-center"
            onClick={updateSameAsShipping}
          >
            <div
              className={`text-grey-0 border-grey-30 rounded-base flex h-5 w-5 justify-center border ${
                sameAsShipping && "bg-violet-60"
              }`}
            >
              <span className="self-center">
                {sameAsShipping && <CheckIcon size={16} />}
              </span>
            </div>
            <input
              className="hidden"
              type="checkbox"
              {...form.register("same_as_shipping")}
              tabIndex={-1}
            />
            <span className="text-grey-90 ml-3">
              {t("components-use-same-as-shipping", "Use same as shipping")}
            </span>
          </div>
          <div className="flex items-center">
            <PlusIcon size={20} />
            <p
              className="cursor-pointer font-bold underline"
              onClick={() => setShowBillingAddress(true)}
            >
              {" "}
              Add Billing Address
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-y-6 border-t-2 border-dotted pt-5">
          <span className="text-xl font-bold">
            {t("components-billing", "Billing Address")}
          </span>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              {...register("billing_address.address_1")}
              label={t("address", "Address")}
              placeholder="Mirpur DOHS, Ave 9"
              required
            />
            <InputField
              {...register("billing_address.city")}
              label={t("city", "City")}
              placeholder="Dhaka"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              {...register("billing_address.postal_code")}
              label={t("postal-code", "Postal Code")}
              placeholder="5525"
              required
            />
            <InputField
              {...register("billing_address.country_code")}
              label={t("country", "Country")}
              placeholder="Bangladesh"
              required
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCustomerForm

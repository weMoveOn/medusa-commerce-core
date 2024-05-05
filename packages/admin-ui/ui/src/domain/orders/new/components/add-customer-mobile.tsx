import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import InputField from "../../../../components/molecules/input"
import { Option } from "../../../../types/shared"
import { useNewOrderForm } from "../form"
import { NextSelect } from "../../../../components/molecules/select/next-select"
import CheckIcon from "../../../../components/fundamentals/icons/check-icon"
import Button from "../../../../components/fundamentals/button"

type AddCustomerFormProps = {
  setOpenCreateCustomerModal: (open: boolean) => void
}

const AddCustomerFormMobile: React.FC<AddCustomerFormProps> = ({
  setOpenCreateCustomerModal,
}) => {
  const { t } = useTranslation()

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

  const firstName = useWatch({
    control: form.control,
    name: "shipping_address.first_name",
  })

  const city = useWatch({
    control: form.control,
    name: "shipping_address.city",
  })

  const postalCode = useWatch({
    control: form.control,
    name: "shipping_address.postal_code",
  })

  const country = useWatch({
    control: form.control,
    name: "shipping_address.country_code",
  })

  const billing_address = useWatch({
    control: form.control,
    name: "billing_address",
  })

  const shouldButtonDisabled =
    !email ||
    !shippingAddress ||
    !firstName ||
    !city ||
    !postalCode ||
    !country ||
    !billing_address

  const handleSaveCustomer = () => {
    if (!shouldButtonDisabled) {
      form.setValue("is_new_customer_form_saved", true)
      setOpenCreateCustomerModal(false)
    } else {
      alert("Please fill all the required fields")
    }
  }

  return (
    <div className="min-h-auto flex flex-col gap-y-8 p-4">
      <div className="flex flex-col gap-y-6 rounded-lg bg-white p-4">
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
      <div className="flex flex-col gap-y-6 rounded-lg bg-white p-4">
        <span className="text-xl font-bold">
          {t("components-shipping", "Shipping")}
        </span>
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
            required: true,
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
      <div className="">
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
        <div className="flex flex-col gap-y-6 rounded-lg bg-white p-4">
          <span className="text-xl font-bold">
            {t("components-billing", "Billing Address")}
          </span>
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
        <Button
          variant="primary"
          className="mt-4 mb-2 w-full"
          onClick={handleSaveCustomer}
          disabled={shouldButtonDisabled}
        >
          Save Customer
        </Button>
      </div>
    </div>
  )
}

export default AddCustomerFormMobile

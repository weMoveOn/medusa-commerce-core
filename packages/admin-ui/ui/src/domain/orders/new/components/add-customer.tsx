import qs from "query-string"
import { useContext, useEffect, useMemo, useState } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"

import { useAdminCustomer } from "medusa-react"

import Button from "../../../../components/fundamentals/button"
import AddressForm, {
  AddressType,
} from "../../../../components/templates/address-form"
import Medusa from "../../../../services/api"
import LockIcon from "../../../../components/fundamentals/icons/lock-icon"
import InputField from "../../../../components/molecules/input"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import Select from "../../../../components/molecules/select"
import RadioGroup from "../../../../components/organisms/radio-group"
import { Option } from "../../../../types/shared"
import isNullishObject from "../../../../utils/is-nullish-object"
import mapAddressToForm from "../../../../utils/map-address-to-form"
import { nestedForm } from "../../../../utils/nested-form"
import { isValidEmail } from "../../../../utils/email"
import { useNewOrderForm } from "../form"
import Checkbox from "../../../../components/atoms/checkbox"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"

type AddCustomerFormProps = {
  openWithBillingAddress: boolean
}

const AddCustomerForm = ({openWithBillingAddress}: AddCustomerFormProps) => {
  const { t } = useTranslation()
  const [addNew, setAddNew] = useState(false)
  const { disableNextPage, enableNextPage } = useContext(SteppedContext)
  const [showBillingAddress, setShowBillingAddress] = useState(openWithBillingAddress)

  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

  const debouncedFetch = async (filter: string): Promise<Option[]> => {
    const prepared = qs.stringify(
      {
        q: filter,
        offset: 0,
        limit: 10,
      },
      { skipNull: true, skipEmptyString: true }
    )

    return await Medusa.customers
      .list(`?${prepared}`)
      .then(({ data }) =>
        data.customers.map(({ id, first_name, last_name, email }) => ({
          label: `${first_name || ""} ${last_name || ""} (${email})`,
          value: id,
        }))
      )
      .catch(() => [])
  }

  const customerId = useWatch({
    control: form.control,
    name: "customer_id",
  })

  const { customer } = useAdminCustomer(customerId?.value!, {
    enabled: !!customerId?.value,
  })

  const validAddresses = useMemo(() => {
    if (!customer) {
      return []
    }

    const validCountryCodes = validCountries.map(({ value }) => value)

    return customer.shipping_addresses.filter(
      ({ country_code }) =>
        !country_code || validCountryCodes.includes(country_code)
    )
  }, [customer, validCountries])

  const onCustomerSelect = (val: Option) => {
    const email = /\(([^()]*)\)$/.exec(val?.label)

    if (email) {
      form.setValue("email", email[1])
    } else {
      form.setValue("email", "")
    }
  }

  const onCreateNew = () => {
    form.setValue("shipping_address_id", undefined)
    setAddNew(true)
  }

  const onSelectExistingAddress = (id: string) => {
    if (!customer) {
      return
    }

    const address = customer.shipping_addresses?.find((a) => a.id === id)

    if (address) {
      form.setValue("shipping_address", mapAddressToForm(address))
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

  /**
   * Effect used to enable next step.
   * A user can go to the next step if valid email is provided and all required address info is filled.
   */
  useEffect(() => {}, [])

  useEffect(() => {
    // reset shipping address info when a different customer is selected
    // or when "Create new" is clicked
    form.setValue("shipping_address.first_name", "")
  }, [customerId?.value, addNew])

  useEffect(() => {
    setAddNew(false)
  }, [customerId?.value])

  return (
    <div className="min-h-auto flex w-[812px] flex-col gap-y-8 p-6">
      <div className="flex flex-col gap-y-6 border-b-2 border-dotted pb-5">
        <div className="grid grid-cols-2 gap-6">
          <InputField
            //   {...form.register("email")}
            label={t("full-name", "Full Name")}
            placeholder="Full Name"
          />
          <InputField
            //   {...form.register("email")}
            label={t("company", "Company")}
            placeholder="MoveOn Technologies"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            //   {...form.register("email")}
            label={t("components-email", "Email")}
            placeholder="lebron@james.com"
          />
          <InputField
            //   {...form.register("email")}
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
            //   {...form.register("email")}
            label={t("address", "Address")}
            placeholder="Mirpur DOHS, Ave 9"
          />
          <InputField
            //   {...form.register("email")}
            label={t("city", "City")}
            placeholder="Dhaka"
          />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <InputField
            //   {...form.register("email")}
            label={t("postal-code", "Postal Code")}
            placeholder="5525"
          />
          <InputField
            //   {...form.register("email")}
            label={t("country", "Bangladesh")}
            placeholder="Bangladesh"
          />
        </div>
      </div>
      {!showBillingAddress ? (
        <div className="flex justify-between">
          <div>
            <Checkbox label="Use same as shipping" />
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
              //   {...form.register("email")}
              label={t("address", "Address")}
              placeholder="Mirpur DOHS, Ave 9"
            />
            <InputField
              //   {...form.register("email")}
              label={t("city", "City")}
              placeholder="Dhaka"
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <InputField
              //   {...form.register("email")}
              label={t("postal-code", "Postal Code")}
              placeholder="5525"
            />
            <InputField
              //   {...form.register("email")}
              label={t("country", "Bangladesh")}
              placeholder="Bangladesh"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AddCustomerForm

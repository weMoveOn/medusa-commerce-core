import { Customer } from "@medusajs/medusa"
import AddressDetailsCard from "./address-details-card"
import React from "react"
import { useNewOrderForm } from "../new/form"
import { useWatch } from "react-hook-form"

interface AddressDetailsCardProps {
  customer?: Customer | undefined
  className?: string
}

const AddressDetails: React.FC<AddressDetailsCardProps> = ({ customer,className }) => {
  const {
    form,
    context: { items, region: regionObj, selectedShippingOption },
  } = useNewOrderForm()

  const shipping = useWatch({
    defaultValue: undefined,
    control: form.control,
    name: "shipping_address",
  })
  const billing = useWatch({
    defaultValue: undefined,
    control: form.control,
    name: "billing_address",
  })
  const customerName = useWatch({
    defaultValue: undefined,
    control: form.control,
    name: "shipping_address.first_name",
  })

  // console.log("shipping from address details :>>", shipping)
  return (
    <div className={className}>
      <AddressDetailsCard
        title="Contact Details"
        content={[
          {
            label: "Name",
            value: customerName || "Name not provided.",
            register: "shipping_address.first_name",
          },
          {
            label: "Company",
            value: shipping?.company || "Company not provided.",
            register: "shipping_address.company",
          },
          { label: "Email", value: customer?.email!, register: "email" },
          {
            label: "Phone",
            value:
              shipping?.phone ||
              customer?.phone ||
              "Phone Number not provided.",
            register: "shipping_address.phone",
          },
        ]}
      />
      <AddressDetailsCard
        title="Shipping Details"
        content={[
          {
            label: "Address",
            value:
              shipping?.address_1 ||
              customer?.shipping_addresses[0]?.address_1 ||
              "Address not provided.",
            register: "shipping_address.address_1",
          },
          {
            label: "City",
            value:
              shipping?.city ||
              customer?.shipping_addresses[0]?.city ||
              "City not provided.",
            register: "shipping_address.city",
          },
          {
            label: "Postal",
            value:
              shipping?.postal_code ||
              customer?.shipping_addresses[0]?.postal_code ||
              "Postal Code not provided.",
            register: "shipping_address.postal_code",
          },
          {
            label: "Country",
            value:
              shipping?.country_code?.value ||
              customer?.shipping_addresses[0]?.country_code ||
              "Country not provided.",
            register: "shipping_address.country_code",
          },
        ]}
      />

      <AddressDetailsCard
        title="Billing Details"
        content={[
          {
            label: "Address",
            value:
              billing?.address_1 ||
              customer?.billing_address?.address_1 ||
              "Address not provided.",
            register: "billing_address.address_1",
          },
          {
            label: "City",
            value:
              billing?.city ||
              customer?.billing_address?.city ||
              "City not provided.",
            register: "billing_address.city",
          },
          {
            label: "Postal",
            value:
              billing?.postal_code ||
              customer?.billing_address?.postal_code ||
              "Postal Code not provided.",
            register: "billing_address.postal_code",
          },
          {
            label: "Country",
            value:
              billing?.country_code?.value ||
              customer?.billing_address?.country_code ||
              "Country not provided.",
            register: "billing_address.country_code",
          },
        ]}
      />
    </div>
  )
}

export default AddressDetails

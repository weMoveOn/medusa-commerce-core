import { Customer } from "@medusajs/medusa"
// import AddressDetailsCard from "./address-details-card"
import React from "react"
import { useNewOrderForm } from "../new/form"
import { useWatch } from "react-hook-form"
import AddressDetailsCard2 from "./address-details-card-2"

const AddressDetails2 = () => {
  // console.log("shipping from address details :>>", shipping)
  return (
    <div className="">
      <AddressDetailsCard2
        title="Contact Details"
        content={[
          {
            label: "Name",
            value: "Name not provided.",
            register: "shipping_address.first_name",
          },
          {
            label: "Company",
            value: "Company not provided.",
            register: "shipping_address.company",
          },
          { label: "Email", value: "customer?.email!", register: "email" },
          {
            label: "Phone",
            value: "Phone Number not provided.",
            register: "shipping_address.phone",
          },
        ]}
      />
      <AddressDetailsCard2
        title="Shipping Details"
        content={[
          {
            label: "Address",
            value: "Address not provided.",
            register: "shipping_address.address_1",
          },
          {
            label: "City",
            value: "City not provided.",
            register: "shipping_address.city",
          },
          {
            label: "Postal",
            value: "Postal Code not provided.",
            register: "shipping_address.postal_code",
          },
          {
            label: "Country",
            value: "Country not provided.",
            register: "shipping_address.country_code",
          },
        ]}
      />

      <AddressDetailsCard2
        title="Billing Details"
        content={[
          {
            label: "Address",
            value: "Address not provided.",
            register: "billing_address.address_1",
          },
          {
            label: "City",
            value: "City not provided.",
            register: "billing_address.city",
          },
          {
            label: "Postal",
            value: "Postal Code not provided.",
            register: "billing_address.postal_code",
          },
          {
            label: "Country",
            value: "Country not provided.",
            register: "billing_address.country_code",
          },
        ]}
      />
    </div>
  )
}

export default AddressDetails2

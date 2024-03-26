import { Customer } from "@medusajs/medusa"
import AddressDetailsCard from "./address-details-card"
import React from "react"

interface AddressDetailsCardProps {
  customer: Customer | undefined
}

const AddressDetails: React.FC<AddressDetailsCardProps> = ({ customer }) => {
  console.log("customer from address-details.tsx: ", customer)
  
  return (
    <div className="">
      <AddressDetailsCard
        title="Contact Details"
        content={[
          { label: "Name", value: customer?.first_name + " " + customer?.last_name},
          { label: "Company", value: "Company not provided."},
          { label: "Email", value: customer?.email! },
          { label: "Phone", value: customer?.phone || "Phone Number not provided." },
        ]}
      />
      <AddressDetailsCard
        title="Shipping Details"
        content={[
          { label: "Address", value: customer?.shipping_addresses[0]?.address_1 || "Address not provided."},
          { label: "City", value: customer?.shipping_addresses[0]?.city || "City not provided." },
          { label: "Postal", value: customer?.shipping_addresses[0]?.postal_code || "Postal Code not provided."},
          { label: "Country", value: customer?.shipping_addresses[0]?.country_code || "Country not provided."},
        ]}
      />

      <AddressDetailsCard
        title="Billing Details"
        content={[
          { label: "Address", value: "Mirpur DOHS" },
          { label: "City", value: "Dhaka" },
          { label: "Postal", value: "1234" },
          { label: "Country", value: "Bangladesh" },
        ]}
      />
    </div>
  )
}

export default AddressDetails

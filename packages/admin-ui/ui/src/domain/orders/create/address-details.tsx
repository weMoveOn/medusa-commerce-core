import AddressDetailsCard from "./address-details-card"

const AddressDetails = () => {
  return (
    <div className="">
      <AddressDetailsCard
        title="Contact Details"
        content={[
          { label: "Name", value: "Mohibullah Shafi" },
          { label: "Company", value: "MoveOn" },
          { label: "Email", value: "ceo@moveon.com.bd" },
          { label: "Phone", value: "451448528855" },
        ]}
      />
      <AddressDetailsCard
        title="Shipping Details"
        content={[
          { label: "Address", value: "Mirpur DOHS" },
          { label: "City", value: "Dhaka" },
          { label: "Postal", value: "1234" },
          { label: "Country", value: "Bangladesh" },
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

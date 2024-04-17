import UsersIcon from "../../../components/fundamentals/icons/users-icon"
import Modal from "../../../components/molecules/modal"
import AddCustomerForm from "../new/components/add-customer"
import { useNewOrderForm } from "../new/form"
import { useWatch } from "react-hook-form"
import Button from "../../../components/fundamentals/button"

type CreateNewCustomerModalProps = {
  openCreateCustomerModal: boolean
  setOpenCreateCustomerModal: (open: boolean) => void
  title: string
  openWithBillingAddress: boolean
}

const CreateNewCustomerModal = ({
  title,
  openWithBillingAddress,
  openCreateCustomerModal,
  setOpenCreateCustomerModal,
}: CreateNewCustomerModalProps) => {
  const { form } = useNewOrderForm()

  const email = useWatch({
    control: form.control,
    name: "email",
  })

  const shippingAddress = useWatch({
    control: form.control,
    name: "shipping_address.address_1",
  })

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
    !email || !shippingAddress || !firstName || !city || !postalCode || !country || !billing_address

  const handleSaveCustomer = () => {
    if (!shouldButtonDisabled) {
      form.setValue("is_new_customer_form_saved", true)
      setOpenCreateCustomerModal(false)
    } else {
      alert("Please fill all the required fields")
    }
  }

  return (
    <Modal
      open={openCreateCustomerModal}
      handleClose={() => setOpenCreateCustomerModal(false)}
    >
      <Modal.Header
        className="h-[56px]"
        iconClass="self-center"
        handleClose={() => setOpenCreateCustomerModal(false)}
      >
        <div className="flex items-end justify-center gap-2 ">
          <UsersIcon size={20} />
          <p className="font-bold">{title}</p>
        </div>
      </Modal.Header>
      <Modal.Body>
        <AddCustomerForm openWithBillingAddress={openWithBillingAddress} />
      </Modal.Body>
      <Modal.Footer className="justify-end !px-4">
        <div className="flex gap-4">
          <Button
            className="bg-gray-110 h-[40px]"
            variant="secondary"
            onClick={() => setOpenCreateCustomerModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="h-[40px]"
            variant="primary"
            onClick={handleSaveCustomer}
            disabled={shouldButtonDisabled}
          >
            Save customer
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default CreateNewCustomerModal

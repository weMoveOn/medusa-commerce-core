import { Pencil } from "@medusajs/icons"
import React, { useState } from "react"
import Modal from "../../../components/molecules/modal"
import InputField from "../../../components/molecules/input"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import Button from "../../../components/fundamentals/button"
import { useNewOrderForm } from "../new/form"
import { useWatch } from "react-hook-form"

type Field = {
  label: string
  value: string
  register: string
}

interface AddressDetails {
  title: string
  content: Field[]
}

const AddressDetailsCard2: React.FC<AddressDetails> = ({ title, content }) => {
  const [isAddressDetailsModalOpen, setIsAddressDetailsModalOpen] =
    useState(false)

  const openModal = () => {
    setIsAddressDetailsModalOpen(true)
  }

  const closeModal = () => {
    setIsAddressDetailsModalOpen(false)
  }
    const {
      context: { validCountries },
      form,
    } = useNewOrderForm()

    // const { handleSubmit } = form

    //  const shipping = useWatch({
    //    defaultValue: undefined,
    //    control: form.control,
    //    name: "shipping_address",
    //  })
    //  console.log("shipping from address details :>>", shipping)

    //  const billing = useWatch({
    //     defaultValue: undefined,
    //     control: form.control,
    //     name: "billing_address",
    //   })
      
    //   console.log("billing from address details :>>", billing)


  return (
    <>
      <div className="border-t-2">
        <div className="my-2 flex items-center justify-between py-4">
          <div>
            <h2 className="text-[20px] font-bold">{title}</h2>
          </div>
          <div>
            <Pencil className="cursor-pointer" color="gray" onClick={openModal} />
          </div>
        </div>
        <div className="pb-2">
          {/* {content.map((detail, index) => (
            <p key={index}>{detail.value}</p>
          ))} */}
          Lorem ipsum dolor sit amet.
        </div>
      </div>
      {isAddressDetailsModalOpen && (
        <Modal open={isAddressDetailsModalOpen} handleClose={closeModal}>
          <Modal.Header
            className="h-[56px]"
            iconClass="self-center"
            handleClose={closeModal}
          >
            <div className="flex items-end justify-center gap-2 ">
              <PlusIcon size={20} />
              <p className="font-bold">{title}</p>
            </div>
          </Modal.Header>
          <Modal.Body className="p-6 !w-[780px]">
            <div className="mb-4 grid grid-cols-2 gap-6">
              {/* {content.map((detail, index) => (
                console.log("detail from chipa :>>", detail),
                <InputField
                  placeholder={detail.value}
                  title={detail.label}
                  label={detail.label}
                  {...form.register(detail.register as any)}
                />
              ))} */}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-end !px-4">
            <div className="flex gap-4">
              <Button
                className="bg-gray-110 h-[40px]"
                variant="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                className="h-[40px]"
                variant="primary"
                onClick={closeModal}
              >
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default AddressDetailsCard2

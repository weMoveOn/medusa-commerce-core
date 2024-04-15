import { useForm } from "react-hook-form"
import Button from "../../../components/fundamentals/button"
import ProductLoadingIcon from "../../../components/fundamentals/icons/product-loading"
import InputField from "../../../components/molecules/input"
import Modal from "../../../components/molecules/modal"
import { useNewOrderForm } from "../new/form"

type AddCustomProductModalProps = {
  openAddCustomProductModal: boolean
  setOpenAddCustomProductModal: (open: boolean) => void
}

const AddCustomProductModal = ({
  openAddCustomProductModal,
  setOpenAddCustomProductModal,
}: AddCustomProductModalProps) => {
  const {
    context: { region, items },
  } = useNewOrderForm()

  const { append } = items

  const addCustomItem = (title: string, quantity: number, amount: number) => {
    append({
      title,
      unit_price: amount,
      quantity: quantity,
    })
  }

  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit((data) => {
    addCustomItem(data.title, data.quantity, data.unit_price)
    setOpenAddCustomProductModal(false)
  })

  return (
    <>
      <Modal
        open={openAddCustomProductModal}
        handleClose={() => setOpenAddCustomProductModal(false)}
      >
        <Modal.Header
          className="h-[56px]"
          iconClass="self-center"
          handleClose={() => setOpenAddCustomProductModal(false)}
        >
          <div className="flex items-end justify-center gap-2 ">
            <ProductLoadingIcon size={20} />
            <p className="font-bold">Add custom product</p>
          </div>
        </Modal.Header>
        <Modal.Body className="max-w-[812px] p-6">
          <div className="mb-4 grid gap-6">
            <InputField
              title="Title/Product Name"
              label="Title/Product Name"
              placeholder="MoveOn Sweatshirt"
              required
              {...register("title", { required: true })}
            />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <InputField
              title="Unit Price (BDT)"
              label="Unit Price (BDT)"
              placeholder="50)"
              className="col-span-3"
              required
              {...register("unit_price", { required: true })}
            />
            <InputField
              title="Quantity"
              label="Quantity"
              placeholder="50"
              className="col-span-9"
              required
              {...register("quantity", { required: true })}
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-end !px-4">
          <div className="flex gap-4">
            <Button
              className="bg-gray-110 h-[40px]"
              variant="secondary"
              onClick={() => setOpenAddCustomProductModal(false)}
            >
              Cancel
            </Button>
            <Button
              className="h-[40px]"
              variant="primary"
              onClick={onSubmit}
            >
              Add product
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddCustomProductModal

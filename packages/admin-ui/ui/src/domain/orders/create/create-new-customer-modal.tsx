import { Button } from "@medusajs/ui";
import UsersIcon from "../../../components/fundamentals/icons/users-icon";
import Modal from "../../../components/molecules/modal";
import AddCustomerForm from "../new/components/add-customer";

type CreateNewCustomerModalProps = {
    openCreateCustomerModal: boolean;
    setOpenCreateCustomerModal: (open: boolean) => void;
}

const CreateNewCustomerModal = ({openCreateCustomerModal, setOpenCreateCustomerModal}: CreateNewCustomerModalProps) => {
    
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
            <p className="font-bold">Create a new customer</p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AddCustomerForm />
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
              onClick={() => setOpenCreateCustomerModal(false)}
            >
              Save customer
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    )

}

export default CreateNewCustomerModal;
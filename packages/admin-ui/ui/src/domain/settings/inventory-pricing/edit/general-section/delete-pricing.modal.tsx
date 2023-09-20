import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import Button from "../../../../../components/fundamentals/button"
import Modal from "../../../../../components/molecules/modal"
import useNotification from "../../../../../hooks/use-notification"
import { getErrorMessage } from "../../../../../utils/error-messages"
import { IPriceSetting, IPriceSettingReturnType, IUpdatePriceOptionFormType, IUpdatePriceSetting } from "../../../../../types/inventory-price-setting"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Medusa from "../../../../../services/api"
import PricingDetailsForm from "../../components/pricing-form/pricing-details-form"
import { Currency } from "@medusajs/medusa"
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store"

type Props = {
  deleteData: string,
  open: boolean
  onClose: () => void
}

const DeletePricingModal = ({ deleteData, onClose, open }: Props) => {
  const queryClient = useQueryClient()
  const notifcation = useNotification()

  const deletePriceSettingMutation = useMutation(
    () => Medusa.InventoryPriceSettings.delete(deleteData),
    {
      onSuccess: () => {
        notifcation("Success", "Price role deleted", "success");
        queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
      },
      onError: (error) => {
        notifcation("Error", getErrorMessage(error), "error");
      },
    }
  );

  const onSubmit = () => {
    deletePriceSettingMutation.mutate()
  }

  return (
    <Modal handleClose={onClose} open={open}>
      <Modal.Body>
        <Modal.Header handleClose={onClose}>
          <h1 className="inter-xlarge-semibold">Delete Price Role</h1>
        </Modal.Header>
        <form onSubmit={onSubmit}>
          <Modal.Content>
            <div>
                Are you sure you want to delete?
            </div>
          </Modal.Content>
          <Modal.Footer>
            <div className="gap-x-xsmall flex w-full items-center justify-end">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                type="submit"
                // loading={isLoading}
                // disabled={isLoading || !isDirty}
              >
                delete and close
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default DeletePricingModal

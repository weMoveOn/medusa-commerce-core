import {
  adminInventoryItemsKeys,
  useAdminDeleteProduct,
  useAdminUpdateProduct,
  useMedusa,
} from "medusa-react"

import { ActionType } from "../../molecules/actionables"
import DuplicateIcon from "../../fundamentals/icons/duplicate-icon"
import EditIcon from "../../fundamentals/icons/edit-icon"
import { Product } from "@medusajs/medusa"
import PublishIcon from "../../fundamentals/icons/publish-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import UnpublishIcon from "../../fundamentals/icons/unpublish-icon"
import { getErrorMessage } from "../../../utils/error-messages"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import useImperativeDialog from "../../../hooks/use-imperative-dialog"
import { useNavigate } from "react-router-dom"
import useNotification from "../../../hooks/use-notification"
import { useQueryClient } from "@tanstack/react-query"
import { useTranslation } from "react-i18next"
import useCopyProduct from "../product-table/use-copy-product"

const useOrderActions = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const notification = useNotification()
  const dialog = useImperativeDialog()
  const copyProduct = useCopyProduct()
//   const deleteProduct = useAdminDeleteProduct(product?.id)
//   const updateProduct = useAdminUpdateProduct(product?.id)
  const queryClient = useQueryClient()
  const { isFeatureEnabled } = useFeatureFlag()
  const { client } = useMedusa()


  const getActions = (rowId:string): ActionType[] => [
    {
      label: t("order-table-edit", "View Details"),
      onClick: () => {
        navigate(`/a/orders/${rowId}`)
      },
      icon: <EditIcon size={20} />,
    },
    {
      label: "Go to customer",
      onClick: () => {},
      icon: <PublishIcon size={20} />,
    },
    {
      label: t("order-table-edit", "Edit Order"),
      onClick: () => {},
      icon: <DuplicateIcon size={20} />,
    },
    {
      label: t("order-table-delete", "Delete"),
      variant: "danger",
      onClick: () => {},
      icon: <TrashIcon size={20} />,
    },
  ]

  return {
    getActions,
  }
}

export default useOrderActions

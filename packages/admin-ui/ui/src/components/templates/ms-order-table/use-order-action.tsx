
import { ActionType } from "../../molecules/actionables"
import DuplicateIcon from "../../fundamentals/icons/duplicate-icon"
import EditIcon from "../../fundamentals/icons/edit-icon"
import PublishIcon from "../../fundamentals/icons/publish-icon"
import TrashIcon from "../../fundamentals/icons/trash-icon"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const useOrderActions = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

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

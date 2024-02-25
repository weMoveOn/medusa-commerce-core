import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import ArrowLeftIcon from "../../fundamentals/icons/arrow-left-icon"

type Props = {
  path?: string
  label?: string
  className?: string
}

const BackButton = ({ path, label, className }: Props) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  return (
    <button
      onClick={() => {
        path ? navigate(path) : navigate(-1)
      }}
      className={clsx("mb-5", className)}
    >
      <div className="gap-x-xsmall flex items-center text-xl font-bold text-black">
        <ArrowLeftIcon size={20} />
        <span className="ml-1">
          {label || t("back-button-go-back", "Go back")}
        </span>
      </div>
    </button>
  )
}

export default BackButton

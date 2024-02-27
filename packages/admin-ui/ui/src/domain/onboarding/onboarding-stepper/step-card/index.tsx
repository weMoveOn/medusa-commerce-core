import { useTranslation } from "react-i18next"
import { clx } from "../../../../utils/clx"
import { useOnboardingForm } from "../../onboarding-form-provider"
import { useWatch } from "react-hook-form"
import { useAdminRegions } from "medusa-react"
import React, { useContext, useEffect, useMemo } from "react"
import { SteppedContext } from "../../onboarding-stepper-context"
import { StepCardSellProps } from "../../types"

export const StepCard: React.FC<StepCardSellProps> = ({
  icon,
  label,
  name,
}) => {
  const { t } = useTranslation()
  const { enableNextPage, disableNextPage } = useContext(SteppedContext)

  const { onboardingForm } = useOnboardingForm()

  const {
    formState: { errors },
    register,
    control,
  } = onboardingForm
  const reg = useWatch({
    control,
    name: "f",
  })

  const { regions } = useAdminRegions()

  const regionOptions = useMemo(() => {
    if (!regions) {
      return []
    }

    return regions.map((region) => ({
      label: region.name,
      value: region.id,
    }))
  }, [regions])

  useEffect(() => {
    if (!reg) {
      disableNextPage()
    } else {
      enableNextPage()
    }
    enableNextPage()
  }, [reg])
  return (
    <>
      <div className={clx(" items-center rounded-lg border p-5", {}, {})}>
        <label
          htmlFor={`${label}`}
          className="mb-3  flex items-center  justify-between gap-3"
        >
          {icon}
          <input
            {...register(`business${name}`, {
              valueAsNumber: true,
            })}
            type="checkbox"
            id={`${label}`}
            className={clx(" h-5 w-5 rounded-lg border border-[#B2B2B2]")}
          />
        </label>
        <h3 className="text-large font-semibold">
          Products I buy or make myself
        </h3>
        <p className="text-large">{label}</p>
      </div>
    </>
  )
}

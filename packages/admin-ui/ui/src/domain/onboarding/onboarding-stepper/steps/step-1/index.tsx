import React, { useEffect, useState } from "react"
import { clx } from "../../../../../utils/clx"
import { useTranslation } from "react-i18next"
import StepContentHeader from "../../step-content-header"
import { useWatch } from "react-hook-form"
import { SteppedContext } from "../../../onboarding-stepper-context"
import { useOnboardingForm } from "../../../onboarding-form-provider"
import IconCircle from "../../../../../components/fundamentals/icon-circle"
import { StepCard } from "../../step-card"
export const Step1 = () => {
  const { t } = useTranslation()
  const { enableNextPage, disableNextPage } = React.useContext(SteppedContext)
  const [isSelect, setIsSelect] = useState("business1")
  const { onboardingForm } = useOnboardingForm()
  const {
    formState: { errors },
    handleSubmit,
    register,
    control,
  } = onboardingForm

  const reg = useWatch({
    control,
    name: "region",
  })

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
      <div>
        <StepContentHeader />
        <div className="mt-4">
          <p>What is your Business Need?</p>

          <div className="mt-4 flex justify-between gap-3">
            <div
              onClick={() => setIsSelect("business1")}
              className={clx(
                " flex w-full flex-col items-center justify-between rounded-lg border border-[#AFAFAF] p-5",
                {
                  "border-2 border-black p-5": isSelect === "business1",
                }
              )}
            >
              <label
                htmlFor="business1"
                className="flex flex-col items-center  gap-3"
              >
                <IconCircle />
                <input
                  {...register(`business1`, {
                    valueAsNumber: true,
                  })}
                  type="checkbox"
                  className="hidden"
                />
                <span className="text-large">
                  I’m just starting my Business2
                </span>
              </label>
            </div>
            <div
              onClick={() => setIsSelect("business2")}
              className={clx(
                " flex w-full flex-col items-center justify-between rounded-lg  border border-[#AFAFAF] p-5",
                {
                  "border-2 border-black p-5": isSelect === "business2",
                }
              )}
            >
              <label
                htmlFor="business2"
                className="flex flex-col items-center  gap-3"
              >
                <IconCircle />
                <input
                  {...register(`business2`, {
                    valueAsNumber: true,
                  })}
                  type="checkbox"
                  className="hidden"
                />
                <span className="text-large">
                  I’m just starting my Business1
                </span>
              </label>
            </div>
          </div>

          <p className="mt-12">What are you planning to sell in your store?</p>
          <div className="mt-4 flex flex-col gap-3">
            <StepCard
              name={"Online3"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online3"}
            />
            <StepCard
              name={"business4"}
              icon={<IconCircle />}
              label={"I’m just starting my Business Online4"}
            />
          </div>
        </div>
      </div>
    </>
  )
}

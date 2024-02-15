/* eslint-disable no-confusing-arrow */
import clsx from "clsx"
import React from "react"
import { clx } from "../../../utils/clx"
import { Check } from "@medusajs/icons"
import { useTranslation } from "react-i18next"
import { v4 as uuidv4 } from "uuid"
import Step from "./step"
import { SteppedProps } from "../onboarding-stepper-context"
import { useOnboardingForm } from "../onboarding-form-provider"

const OnboardingStepper: React.FC<SteppedProps> = ({
  context,
  steps,
  onSubmit,
  handleClose,
  handleSkip,
}) => {
  const resetAndClose = () => {
    context.reset()
    handleClose()
  }

  const resetAndSkip = () => {
    context.reset()
    handleSkip()
  }

  const resetAndSubmit = () => {
    onSubmit()
  }

  const { t } = useTranslation()

  const { onboardingForm } = useOnboardingForm()

  const {
    formState: { errors },
    control,
  } = onboardingForm

  return (
    <div className=" flex items-center justify-center ">
      <div className="mt-14 flex h-[880px] w-[650px] flex-col justify-between rounded-xl border  p-9  ">
        <>
          <div className=" relative left-[12px] flex rounded-lg pb-[18px]">
            {[1, 2, 3]?.map((_, i) => {
              if (i > context.currentStep) {
                return (
                  <Step
                    key={uuidv4()}
                    label="Coming Step"
                    textColor="text-white"
                  />
                )
              }
              if (context.currentStep === i) {
                return (
                  <Step key={uuidv4()} label="Current Step" color="black" />
                )
              }
              if (context.currentStep >= i) {
                return (
                  <Step
                    key={uuidv4()}
                    icon={<Check />}
                    textColor="text-white"
                    label="Complete Step"
                    color="green"
                  />
                )
              }
            })}
          </div>
          <hr />
        </>
        <div
          className={clsx(
            "flex min-h-[600px] flex-col justify-between  transition-transform duration-100"
          )}
        >
          <div>{steps[context.currentStep]}</div>
        </div>
        <div className=" border-t ">
          <div className=" mt-9 flex w-full items-center justify-between rounded-lg ">
            <div>
              {context.currentStep > 0 && (
                <button
                  disabled={!context.nextStepEnabled}
                  onClick={() =>
                    context.currentStep === steps.length - 1
                      ? resetAndSkip()
                      : ""
                  }
                  className={clx(
                    "text-large h-[48px] rounded-lg font-medium text-black "
                  )}
                >
                  Skip
                </button>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                disabled={context.currentStep === 0}
                onClick={() => context.goToPreviousPage()}
                className={clx(
                  "text-large rounded-lg px-10 py-5 font-medium text-black"
                )}
              >
                Back
              </button>

              <button
                disabled={!context.nextStepEnabled}
                onClick={() =>
                  context.currentStep === steps.length - 1
                    ? resetAndSubmit()
                    : context.goToNextPage()
                }
                className="inline-flex h-[52px] w-[116px] flex-col items-center justify-center gap-2.5 rounded-lg bg-black px-10 py-5"
              >
                <div className="inline-flex items-center justify-start gap-2">
                  <div className="font-['Inter'] text-base font-medium text-white">
                    {context.currentStep === steps.length - 1
                      ? "Submit"
                      : "Next"}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingStepper

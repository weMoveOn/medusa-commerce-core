/* eslint-disable no-confusing-arrow */
import clsx from "clsx"
import React, { ReactNode, useEffect, useReducer } from "react"

import { ILayeredModalContext } from "../../../components/molecules/modal/layered-modal"
import { ModalProps } from "../../../components/molecules/modal"
import { clx } from "../../../utils/clx"
import IconCircle from "../../../moveshop-ui/components/fundamentals/icon-circle"
import "../onboarding-stepper/onboarding-stepper.css"
import { Check } from "@medusajs/icons"
import IconStepperArrowComplete from "./onboarding-stepper-atoms/complete"
import IconStepperArrowCurrent from "./onboarding-stepper-atoms/current"
import IconStepperArrowInComplete from "./onboarding-stepper-atoms/incomplete"
import { useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useOnboardingForm } from "./OnboardingFormProvider"
import IconStepperArrowComplete2 from "./onboarding-stepper-atoms/complete2"
enum SteppedActions {
  ENABLENEXTPAGE,
  DISABLENEXTPAGE,
  GOTONEXTPAGE,
  GOTOPREVIOUSPAGE,
  SETPAGE,
  SUBMIT,
  RESET,
}

type ISteppedContext = {
  currentStep: number
  nextStepEnabled: boolean
  enableNextPage: () => void
  disableNextPage: () => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  submit: () => void
  reset: () => void
  setPage: (page: number) => void
}

const defaultContext: ISteppedContext = {
  currentStep: 0,
  nextStepEnabled: true,
  enableNextPage: () => {},
  disableNextPage: () => {},
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  submit: () => {},
  reset: () => {},
  setPage: (page) => {},
}

type SteppedProps = {
  context: ISteppedContext
  title?: string
  onSubmit: () => void
  lastScreenIsSummary?: boolean
  steps: ReactNode[]
  layeredContext?: ILayeredModalContext
} & ModalProps

export const SteppedContext = React.createContext(defaultContext)

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case SteppedActions.ENABLENEXTPAGE: {
      return { ...state, nextStepEnabled: true }
    }
    case SteppedActions.DISABLENEXTPAGE: {
      return { ...state, nextStepEnabled: false }
    }
    case SteppedActions.GOTONEXTPAGE: {
      return { ...state, currentStep: state.currentStep + 1 }
    }
    case SteppedActions.GOTOPREVIOUSPAGE: {
      return { ...state, currentStep: Math.max(0, state.currentStep - 1) }
    }
    case SteppedActions.SETPAGE: {
      return {
        ...state,
        currentStep: action.payload > 0 ? action.payload : state.currentStep,
      }
    }
    case SteppedActions.SUBMIT: {
      return { ...state }
    }
    case SteppedActions.RESET: {
      return { ...state, currentStep: 0, nextStepEnabled: true }
    }
  }
}

export const SteppedProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, defaultContext)
  return (
    <SteppedContext.Provider
      value={{
        ...state,
        enableNextPage: () => {
          dispatch({ type: SteppedActions.ENABLENEXTPAGE })
        },
        disableNextPage: () => {
          dispatch({ type: SteppedActions.DISABLENEXTPAGE })
        },
        goToNextPage: () => {
          dispatch({ type: SteppedActions.GOTONEXTPAGE })
        },
        goToPreviousPage: () => {
          dispatch({ type: SteppedActions.GOTOPREVIOUSPAGE })
        },
        submit: () => {
          dispatch({ type: SteppedActions.SUBMIT })
        },
        setPage: (page: number) => {
          dispatch({ type: SteppedActions.SETPAGE, payload: page })
        },
        reset: () => {
          dispatch({ type: SteppedActions.RESET })
        },
      }}
    >
      {children}
    </SteppedContext.Provider>
  )
}

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

  console.log("steps.length :>> ", steps.length)
  console.log("context.currentStep :>> ", context.currentStep)
  return (
    <div className=" flex items-center justify-center ">
      <div className="mt-14 flex h-[880px] w-[650px] flex-col justify-between rounded-xl border  p-9  ">
        <>
          <div>
            <div className="relative flex gap-3">
              {/* {steps.length === context.currentStep ? (
                  <IconStepperArrowCurrent cssId="pointer2" className="z-10" />
                ) : (
                  <IconStepperArrowComplete cssId="pointer1" className="z-20" />
                )} */}
              {[1, 2, 3]?.map((_, i) => {
                if (i > context.currentStep) {
                  return (
                    <IconStepperArrowInComplete
                      key={`step-${i}`}
                      cssId="incomplete"
                      className=""
                    />
                  )
                }

                if (context.currentStep === i) {
                  if (i === 0) {
                    return (
                      <IconStepperArrowCurrent
                        key={`step-${i}`}
                        cssId="current"
                        className="z-20"
                      />
                    )
                  } else {
                    return (
                      <IconStepperArrowCurrent
                        key={`step-${i}`}
                        cssId="current2"
                        className="z-20"
                      />
                    )
                  }
                }

                if (context.currentStep >= i) {
                  if (i === 0) {
                    return (
                      <IconStepperArrowComplete
                        key={`step-${i}`}
                        cssId="complete"
                        className="z-50"
                      />
                    )
                  } else if (i === 1) {
                    return (
                      <IconStepperArrowComplete2
                        key={`step-${i}`}
                        cssId="complete2"
                        className="z-30"
                      />
                    )
                  }
                }
              })}
            </div>
          </div>
        </>

        {/* body */}
        <div
          className={clsx(
            "flex min-h-[600px] flex-col justify-between  transition-transform duration-100"
          )}
        >
          <div>{steps[context.currentStep]}</div>
        </div>

        <footer className=" border-t ">
          <div className=" mt-9 flex w-full justify-between rounded-lg ">
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
                    "text-large rounded-lg px-10 py-5 font-medium text-black "
                  )}
                >
                  Skip
                </button>
              )}
            </div>
            <div className="flex gap-3">
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
                type="submit"
                className={clx(
                  "text-large rounded-lg bg-black px-10 py-5 font-medium text-white"
                )}
                disabled={!context.nextStepEnabled}
                onClick={() =>
                  context.currentStep === steps.length - 1
                    ? resetAndSubmit()
                    : context.goToNextPage()
                }
              >
                {context.currentStep === steps.length - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default OnboardingStepper

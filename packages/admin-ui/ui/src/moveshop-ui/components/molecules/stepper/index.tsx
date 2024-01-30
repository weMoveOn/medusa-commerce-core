/* eslint-disable no-confusing-arrow */
import clsx from "clsx"
import React, { ReactNode, useReducer } from "react"

import { ILayeredModalContext } from "../../../../components/molecules/modal/layered-modal"
import { ModalProps } from "../../../../components/molecules/modal"
import { clx } from "../../../../utils/clx"
import Button from "../../../../components/fundamentals/button"

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

const StepActive = ({
  currentStep,
  index,
}: {
  currentStep: number
  index: number
}) => {
  // currentStep >= index || currentStep === index currentStep <= index
  return (
    <li
      className={clx(
        "flex w-full  items-center justify-between",
        {
          // eslint-disable-next-line quotes
          'after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[""] dark:after:border-blue-800':
            currentStep >= index,
          // eslint-disable-next-line quotes
          'after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-gray-100 after:content-[""] dark:after:border-gray-800':
            currentStep <= index,
        },
        {}
      )}
    >
      {currentStep >= index ? (
        <span
          className={clx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 lg:h-12 lg:w-12",
            {
              "text-blue-600 dark:text-blue-300 lg:h-4 lg:w-4": true,
              "text-gray-500 dark:text-gray-100 lg:h-5 lg:w-5": true,
            }
          )}
        >
          <svg
            className={clsx(
              "h-3.5 w-3.5 text-blue-600 dark:text-blue-300 lg:h-4 lg:w-4"
            )}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 12"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5.917 5.724 10.5 15 1.5"
            />
          </svg>
        </span>
      ) : (
        <span
          className={clsx(
            " h-10 w-10 shrink-0 rounded-full bg-gray-100 dark:bg-gray-700",
            {
              "text-gray-500 dark:text-gray-100 ": true,
            }
          )}
        ></span>
      )}
    </li>
  )
}

const StepTitle = ({
  title,
  isLastIndex,
}: {
  title: string
  isLastIndex: boolean
}) => {
  return (
    <>
      <li
        className={clsx("flex w-full items-center justify-between", {
          "dark:after:border-gray-700": true,
          "w-1/12": isLastIndex,
        })}
      >
        <span
          className={clsx(
            "flex shrink-0 items-center justify-center rounded-full font-bold dark:bg-gray-700 lg:h-12 lg:w-12",
            {
              "text-gray-500 dark:text-gray-100 lg:h-5 lg:w-5": false,
            }
          )}
        >
          {title}
        </span>
      </li>
    </>
  )
}

const StepperMVN: React.FC<SteppedProps> = ({
  context,
  steps,
  layeredContext,
  title,
  onSubmit,
  lastScreenIsSummary = false,
  handleClose,
  handleSkip,
  isLargeModal = true,
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
  return (
    <div className=" flex items-center justify-center  ">
      <div className="w-1/2  rounded-xl border  p-20  ">
        <div
          className={clsx(
            "flex max-h-full flex-col justify-between  transition-transform duration-100"
          )}
        >
          <header>
            <div className="flex flex-col">
              <h2 className="inter-xlarge-semibold">{title}</h2>

              <div>
                {
                  <div className="my-12">
                    <div className="   ">
                      <div>
                        <ol className="flex w-full items-center justify-between">
                          {steps?.map((_, i) => (
                            <StepActive
                              key={`step-${i}`}
                              currentStep={context.currentStep}
                              index={i}
                            />
                          ))}
                        </ol>
                        <br />
                        <ol className="flex w-full items-center justify-between">
                          <StepTitle title={"Your Need"} isLastIndex={false} />
                          <StepTitle
                            title={"Your product type"}
                            isLastIndex={false}
                          />
                          <StepTitle
                            title={"Where to sell"}
                            isLastIndex={true}
                          />
                        </ol>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          </header>
          <div>{steps[context.currentStep]}</div>
        </div>
        <footer className="mt-7">
          <div className="gap-x-xsmall flex w-full justify-between ">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="small"
                disabled={context.currentStep === 0}
                onClick={() => context.goToPreviousPage()}
                className="w-[112px]"
              >
                Back
              </Button>

              {context.currentStep > 0 && (
                <Button
                  variant="nuclear"
                  size="small"
                  disabled={!context.nextStepEnabled}
                  onClick={() =>
                    context.currentStep === steps.length - 1
                      ? resetAndSkip()
                      : ""
                  }
                  className="w-[112px]"
                >
                  Skip
                </Button>
              )}
            </div>

            <Button
              variant="primary"
              size="small"
              disabled={!context.nextStepEnabled}
              onClick={() =>
                context.currentStep === steps.length - 1
                  ? resetAndSubmit()
                  : context.goToNextPage()
              }
              className="w-[112px]"
            >
              {context.currentStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default StepperMVN

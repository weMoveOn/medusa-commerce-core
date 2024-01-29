/* eslint-disable react/jsx-key */
/* eslint-disable quotes */
import React, { useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import clsx from "clsx"

import BodyCard from "../../components/organisms/body-card"
import SteppedModal, {
  SteppedContext,
} from "../../components/molecules/modal/stepped-modal"
import { LayeredModalContext } from "../../components/molecules/modal/layered-modal"
import StepperMVN from "../../moveshop-ui/components/molecules/stepper"
import InputField from "../../components/molecules/input"

const VIEWS = ["orders", "drafts"]
// eslint-disable-next-line no-undef

const stepperData = [
  { id: 1, title: "Step 1", content: "Add Product", isActive: true },
  { id: 2, title: "Step 2", content: "Shipping", isActive: true },
  { id: 3, title: "Step 3", content: "Payments", isActive: false },
]

const StepActive = ({ step, isLastIndex }: any) => {
  return (
    <li
      className={clsx("flex w-full  items-center justify-between", {
        "text-blue-600 dark:text-blue-500": true,
        // eslint-disable-next-line quotes
        'after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-blue-100 after:content-[""] dark:after:border-blue-800':
          true, // active line
        "w-1/12": isLastIndex,
      })}
    >
      <span
        className={clsx(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800 lg:h-12 lg:w-12",
          {
            "text-blue-600 dark:text-blue-300 lg:h-4 lg:w-4": true,
          }
        )}
      >
        <svg
          className={clsx("h-3.5 w-3.5", {
            "text-blue-600 dark:text-blue-300 lg:h-4 lg:w-4": true,
          })}
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

const StepInactive = ({ isLastIndex, step }: any) => {
  return (
    <>
      <li
        className={clsx("flex items-center justify-between ", {
          'w-full after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-gray-100 after:content-[""] dark:after:border-gray-700':
            !isLastIndex,
          "w-1/12": isLastIndex,
        })}
      >
        <span
          className={clsx(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 lg:h-12 lg:w-12",
            {
              "text-gray-500 dark:text-gray-100 lg:h-5 lg:w-5": true,
            }
          )}
        ></span>
      </li>
    </>
  )
}
const Stepper = ({ label }: any) => {
  const lastIndex = stepperData.length - 1

  return (
    <div className="small:w-4/5 medium:w-7/12 large:w-6/12  max-w-[700px] ">
      <div>
        <ol className="flex w-full items-center justify-between">
          {stepperData.map((step, index) => {
            if (step.isActive) {
              return (
                <StepActive
                  key={step.id}
                  isLastIndex={lastIndex === index}
                  step={step}
                />
              )
            } else {
              return (
                <StepInactive
                  key={step.id}
                  isLastIndex={lastIndex === index}
                  step={step}
                />
              )
            }
          })}
        </ol>
        <br />
        <ol className="flex w-full items-center justify-between">
          <StepTitle title={"title"} isLastIndex={false} />
          <StepTitle title={"title"} isLastIndex={false} />
          <StepTitle title={"title"} isLastIndex={true} />
        </ol>
      </div>
    </div>
  )
}

const Step1 = () => {
  return (
    <>
      <div>
        <p>Hey Ahsan, we’re excited to have you!</p>
        <h1>Tell us about your business</h1>
        <div className="flex">
          <label htmlFor="">
            <span>What is your business need?</span>
          </label>

          <div>
            <InputField type="checkbox" />

            <span>I’m just starting my Business Online</span>
          </div>
        </div>
      </div>
    </>
  )
}

const OnboardingIndex = () => {
  const view = "orders"
  const { t } = useTranslation()

  const steppedContext = React.useContext(SteppedContext)
  const layeredContext = React.useContext(LayeredModalContext)

  return (
    <>
      <div className="gap-y-xsmall flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard>
            <StepperMVN
              layeredContext={layeredContext}
              context={steppedContext}
              onSubmit={() => {
                alert("onsubmit")
              }}
              steps={[
                <Step1 />,
                <h1>1</h1>,
                <h1>1</h1>,
                <h1>1</h1>,
                <h1>1</h1>,
                <h1>1</h1>,
              ]}
              lastScreenIsSummary={true}
              title={t("new-create-draft-order", "Create Draft Order")}
              handleClose={() => {
                alert("dismis")
              }}
            />
          </BodyCard>
        </div>
      </div>
    </>
  )
}

const Onboarding = () => {
  return (
    <Routes>
      <Route index element={<OnboardingIndex />} />
    </Routes>
  )
}

export default Onboarding

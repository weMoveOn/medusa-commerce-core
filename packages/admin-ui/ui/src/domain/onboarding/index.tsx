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

const VIEWS = ["orders", "drafts"]
// eslint-disable-next-line no-undef

type StepProps = {
  label: string
  title: string
  subtitle: string
}

const Step1 = () => {
  return (
    <>
      <div>
        <div className="text-center">
          <p>Hey Ahsan, we’re excited to have you!</p>
          <h1 className="text-4xl font-bold">Tell us about your business</h1>
        </div>
        <div className="mt-4">
          <label htmlFor="business">
            <span>What is your business need?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I’m just starting my Business Online</span>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I already have a Business</span>
          </div>
        </div>
      </div>

      <br />
      <div>
        <div>
          <label htmlFor="business">
            <span>What is your business need?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I’m just starting my Business Online</span>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I already have a Business</span>
          </div>
        </div>
      </div>
    </>
  )
}

const Step2 = () => {
  return (
    <>
      <div>
        <div className="text-center">
          <p>You are on your way to your new business journey</p>
          <h1 className="text-4xl font-bold">Where would you like to sell?</h1>
        </div>
        <div className="mt-4">
          <label htmlFor="business">
            <span>What is your business need?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I’m just starting my Business Online</span>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I already have a Business</span>
          </div>
        </div>
      </div>

      <br />
      <div>
        <div>
          <label htmlFor="business">
            <span>What is your business need?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I’m just starting my Business Online</span>
          </div>
          <div className="flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>I already have a Business</span>
          </div>
        </div>
      </div>
    </>
  )
}

const Step3 = () => {
  return (
    <>
      <div>
        <div className="text-center">
          <p>You are on your way to your new business journey</p>
          <h1 className="text-4xl font-bold">Your Store Information</h1>
        </div>
        <div className="mt-4">
          <label htmlFor="business">
            <span>Where is your business located?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>Bangladesh</span>
          </div>
          <div className="flex gap-3 ">
            <div className=" rounded-lg  border p-3">
              Bangladeshi Taka (BDT)
            </div>
            <div className="  rounded-lg border p-3">
              Bangladeshi Taka (BDT)
            </div>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="business">
            <span>Where is your business located?</span>
          </label>
          <div className="mb-3 flex gap-3 rounded-lg border p-4">
            <input type="checkbox" id="business" />
            <span>Bangladesh</span>
          </div>
          <div className="flex gap-3 ">
            <div className=" rounded-lg  border p-3">
              Bangladeshi Taka (BDT)
            </div>
            <div className="  rounded-lg border p-3">
              Bangladeshi Taka (BDT)
            </div>
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
              steps={[<Step1 />, <Step2 />, <Step3 />]}
              handleClose={() => {
                alert("handleClose")
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

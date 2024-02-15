/* eslint-disable react/jsx-key */
import React from "react"
import { Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SteppedContext } from "../../components/molecules/modal/stepped-modal"
import OnboardingStepper from "./onboarding-stepper"
import { clx } from "../../utils/clx"

import { Step1 } from "./onboarding-stepper/steps/step-1"
import OnboardingFormProvider, {
  useOnboardingForm,
} from "./onboarding-form-provider"
import { Step2 } from "./onboarding-stepper/steps/step-2"
import { Step3 } from "./onboarding-stepper/steps/step-3"

const OnboardingIndex = () => {
  const { t } = useTranslation()

  const steppedContext = React.useContext(SteppedContext)

  const { onboardingForm } = useOnboardingForm()

  const {
    formState: { errors },
    handleSubmit,
  } = onboardingForm
  const onSubmit = handleSubmit((data) => {
    console.log("data :>> ", data)
  })

  return (
    <>
      <div className={clx("")}>
        <div className="">
          <OnboardingStepper
            context={steppedContext}
            onSubmit={onSubmit}
            steps={[<Step1 />, <Step2 />, <Step3 />]}
            handleClose={() => {
              alert("handleClose")
            }}
            handleSkip={() => {
              alert("handleSkip")
            }}
          />
        </div>
      </div>
    </>
  )
}

const Onboarding = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <OnboardingFormProvider>
            <OnboardingIndex />
          </OnboardingFormProvider>
        }
      />
    </Routes>
  )
}

export default Onboarding

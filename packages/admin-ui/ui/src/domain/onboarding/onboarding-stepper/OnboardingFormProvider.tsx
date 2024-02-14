import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react"
import { FormProvider, useForm, useFormContext } from "react-hook-form"

type OnboardingContextValue = {
  countryOptions?: {
    value: string
    label: string
    flag: string
    code: string
  }[]
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null)

const OnboardingFormProvider = ({ children }: { children?: ReactNode }) => {
  const onboardingForm = useForm()

  return (
    <OnboardingContext.Provider value={{}}>
      <FormProvider {...onboardingForm}>{children}</FormProvider>
    </OnboardingContext.Provider>
  )
}

export const useOnboardingForm = () => {
  const context = useContext(OnboardingContext)
  const onboardingForm = useFormContext()

  if (!context) {
    throw new Error(
      "useOnboardingForm must be used within OnboardingFormProvider"
    )
  }

  return {
    context,
    onboardingForm,
  }
}

export default OnboardingFormProvider

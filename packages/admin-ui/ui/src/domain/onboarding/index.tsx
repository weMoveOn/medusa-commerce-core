/* eslint-disable react/jsx-key */
/* eslint-disable quotes */
import React from "react"
import { Route, Routes, useParams } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { SteppedContext } from "../../components/molecules/modal/stepped-modal"
import { LayeredModalContext } from "../../components/molecules/modal/layered-modal"
import StepperMVN from "../../moveshop-ui/components/molecules/stepper"
import { clx } from "../../utils/clx"

import IconCircle from "../../moveshop-ui/components/fundamentals/icon-circle"

import { supportedLanguages } from "../../i18n"

import { useAdminRegion } from "medusa-react"
import Spinner from "../../components/atoms/spinner"

import Select from "react-select"
import { useStoreData } from "../settings/regions/components/region-form/use-store-data"

type StepProps = {
  label: string
  title: string
  subtitle: string
}

interface ProgressStepProps {
  isComplete?: boolean
  label?: string
  icon?: boolean
}

const ProgressStep: React.FC<ProgressStepProps> = ({
  isComplete,
  label,
  icon,
}) => {
  return (
    <div className="relative flex items-center justify-center">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="192"
          height="46"
          viewBox="0 0 192 46"
          fill="none"
        >
          <path d="M0 0H176L192 23L176 46H0V0Z" fill="#171717" />
        </svg>
      </div>
      <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform  ">
        <div className="flex">
          <div>
            <p>Business Need</p>
          </div>
          <div className={clx("rounded-lg border bg-white")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M5.37473 9.66787L2.47949 6.77264L3.2033 6.04883L5.37473 8.22025L10.035 3.55994L10.7589 4.28375L5.37473 9.66787Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

const ProgressStepper = () => {
  return (
    <div className={clx("flex justify-center")}>
      <div className={clx("flex")}>
        <ProgressStep />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="210"
            height="46"
            viewBox="0 0 210 46"
            fill="none"
          >
            <path
              d="M0 0H191.852L210 23L191.852 46H0L16.4667 23L0 0Z"
              fill="#171717"
            />
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="187"
            height="46"
            viewBox="0 0 187 46"
            fill="none"
          >
            <path d="M169 46H0L17.5 23L0 0H169L187 23L169 46Z" fill="#EEEEEE" />
          </svg>
        </div>
      </div>
    </div>
  )
}

const StepHeader = () => {
  return (
    <>
      <div className="text-center">
        <p className={clx("text-large ")}>
          Hey Ahsan, we’re excited to have you!
        </p>
        <h1 className={clx("mt-3 text-2xl font-medium ")}>
          Where would you like to sell?
        </h1>
      </div>
    </>
  )
}

const StepCardBusiness = ({ icon, title }) => {
  return (
    <>
      <div
        className={clx(
          " flex w-full flex-col items-center justify-between rounded-lg border-2 border-black p-5"
        )}
      >
        <label htmlFor="business" className="flex flex-col items-center  gap-3">
          {icon}
          <input type="checkbox" id="business" className="hidden" />
          <span className="text-large">{title}</span>
        </label>
      </div>
    </>
  )
}

const StepCardSell = ({ icon, title }) => {
  return (
    <>
      <div className={clx(" items-center rounded-lg border p-5", {}, {})}>
        <label
          htmlFor={`${title}`}
          className="mb-3  flex items-center  justify-between gap-3"
        >
          {icon}
          <input type="checkbox" id={`${title}`} className={clx(" h-5 w-5")} />
        </label>
        <h3 className="text-large font-semibold">
          Products I buy or make myself
        </h3>
        <p className="text-large">{title}</p>
      </div>
    </>
  )
}

const Step1 = () => {
  return (
    <>
      <div>
        <StepHeader />
        <div className="mt-4">
          <p>What is your Business Need?</p>

          <div className="mt-4 flex justify-between gap-3">
            <StepCardBusiness
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business1"}
            />
            <StepCardBusiness
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business2"}
            />
          </div>
          <p className="mt-12">What are you planning to sell in your store?</p>
          <div className="mt-4 flex flex-col gap-3">
            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online3"}
            />
            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online4"}
            />
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
        <StepHeader />
        <div className="mt-4">
          <p className="mt-12">What are you planning to sell in your store?</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online11"}
            />
            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online22"}
            />

            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online33"}
            />
            <StepCardSell
              icon={<IconCircle className="h-10 w-10" />}
              title={"I’m just starting my Business Online44"}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const RegionForm = () => {
  const params = useParams()
  const id: string | undefined = params["*"]
  const { t } = useTranslation()
  const { region, isLoading, isError } = useAdminRegion(id!, {
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner variant="secondary" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-grey-0 rounded-rounded border-grey-20 gap-y-xsmall flex h-full w-full flex-col items-center justify-center border text-center ">
        <h1 className="inter-large-semibold">
          {t("edit-something-went-wrong", "Something went wrong...")}
        </h1>
        <p className="inter-base-regular text-grey-50">
          {t(
            "edit-no-region-found",
            "We can't find a region with that ID, use the menu to the left to select a region."
          )}
        </p>
      </div>
    )
  }

  if (!region) {
    return null
  }

  return <></>
}

export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}

export const colourOptions: readonly ColourOption[] = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isDisabled: true },
  { value: "purple", label: "Purple", color: "#5243AA" },
  { value: "red", label: "Red", color: "#FF5630", isFixed: true },
  { value: "orange", label: "Orange", color: "#FF8B00" },
  { value: "yellow", label: "Yellow", color: "#FFC400" },
  { value: "green", label: "Green", color: "#36B37E" },
  { value: "forest", label: "Forest", color: "#00875A" },
  { value: "slate", label: "Slate", color: "#253858" },
  { value: "silver", label: "Silver", color: "#666666" },
]

export interface FlavourOption {
  readonly value: string
  readonly label: string
  readonly rating: string
}

export const flavourOptions: readonly FlavourOption[] = [
  { value: "vanilla", label: "Vanilla", rating: "safe" },
  { value: "chocolate", label: "Chocolate", rating: "good" },
  { value: "strawberry", label: "Strawberry", rating: "wild" },
  { value: "salted-caramel", label: "Salted Caramel", rating: "crazy" },
]

export interface StateOption {
  readonly value: string
  readonly label: string
}

export const stateOptions: readonly StateOption[] = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AS", label: "American Samoa" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "DC", label: "District Of Columbia" },
  { value: "FM", label: "Federated States Of Micronesia" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "GU", label: "Guam" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MH", label: "Marshall Islands" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "MP", label: "Northern Mariana Islands" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PW", label: "Palau" },
  { value: "PA", label: "Pennsylvania" },
  { value: "PR", label: "Puerto Rico" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VI", label: "Virgin Islands" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
]

export const optionLength = [
  { value: 1, label: "general" },
  {
    value: 2,
    label:
      "Evil is the moment when I lack the strength to be true to the Good that compels me.",
  },
  {
    value: 3,
    label:
      "It is now an easy matter to spell out the ethic of a truth: 'Do all that you can to persevere in that which exceeds your perseverance. Persevere in the interruption. Seize in your being that which has seized and broken you.",
  },
]

export const dogOptions = [
  { id: 1, label: "Chihuahua" },
  { id: 2, label: "Bulldog" },
  { id: 3, label: "Dachshund" },
  { id: 4, label: "Akita" },
]

// let bigOptions = [];
// for (let i = 0; i < 10000; i++) {
// 	bigOptions = bigOptions.concat(colourOptions);
// }

export interface GroupedOption {
  readonly label: string
  readonly options: readonly ColourOption[] | readonly FlavourOption[]
}

export const groupedOptions: readonly GroupedOption[] = [
  {
    label: "Colours",
    options: colourOptions,
  },
  {
    label: "Flavours",
    options: flavourOptions,
  },
]
const Step3 = () => {
  const { currencyOptions, countryOptions } = useStoreData()

  console.log("countryOptions :>> ", countryOptions)
  return (
    <>
      <div>
        <StepHeader />

        <div className="mt-4">
          <p>Where is your business located?</p>
          <br />

          <Select
            options={countryOptions}
            isMulti
            isSearchable
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
          />
          <div className="border-grey-20  "></div>
        </div>
      </div>
    </>
  )
}

const OnboardingIndex = () => {
  const { t } = useTranslation()

  const steppedContext = React.useContext(SteppedContext)
  const layeredContext = React.useContext(LayeredModalContext)

  return (
    <>
      {/* <Panels /> */}
      {/* <Example /> */}
      {/* <ProgressStepper /> */}
      <div className={clx("")}>
        <div className="">
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
            handleSkip={() => {
              alert("handleSkip")
            }}
          />

          <div className="mb-5 text-center text-2xl ">
            <a href="/a/home">
              click here go to{" "}
              <span className="underline"> admin dashboard </span>
            </a>
          </div>
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

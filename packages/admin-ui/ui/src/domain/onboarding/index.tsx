/* eslint-disable react/jsx-key */
import React, { useEffect, useMemo, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { SteppedContext } from "../../components/molecules/modal/stepped-modal"
import OnboardingStepper from "./onboarding-stepper"
import { clx } from "../../utils/clx"
import IconCircle from "../../moveshop-ui/components/fundamentals/icon-circle"
import { useAdminRegions, useAdminStore } from "medusa-react"

import Select, { components } from "react-select"
import { countries } from "../../utils/countries"
import { Controller, useWatch } from "react-hook-form"
import OnboardingFormProvider, {
  useOnboardingForm,
} from "./onboarding-stepper/OnboardingFormProvider"
import TriangleDown from "../../components/fundamentals/icons/triangle-down"
import StepperArrow from "../../components/fundamentals/icons/stepper-arrow"

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

const StepHeader = () => {
  return (
    <>
      <div className="text-center">
        <p className={clx("text-large ")}>
          Hey Ahsan, we’re excited to have you!
        </p>
        <h1 className={clx("mt-3 text-2xl font-semibold ")}>
          Where would you like to sell?
        </h1>
      </div>
    </>
  )
}

const StepCardSell = ({ icon, title, name }) => {
  const { t } = useTranslation()
  const { enableNextPage, disableNextPage } = React.useContext(SteppedContext)

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
          htmlFor={`${title}`}
          className="mb-3  flex items-center  justify-between gap-3"
        >
          {icon}
          <input
            {...register(`business${name}`, {
              valueAsNumber: true,
            })}
            type="checkbox"
            id={`${title}`}
            className={clx(" h-5 w-5 rounded-lg border border-[#B2B2B2]")}
          />
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
        <StepHeader />
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
            <StepCardSell
              name={"Online3"}
              icon={<IconCircle />}
              title={"I’m just starting my Business Online3"}
            />
            <StepCardSell
              name={"business4"}
              icon={<IconCircle />}
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
              name={"business4"}
              icon={<IconCircle />}
              title={"I’m just starting my Business Online11"}
            />
            <StepCardSell
              name={"business5"}
              icon={<IconCircle />}
              title={"I’m just starting my Business Online22"}
            />

            <StepCardSell
              name={"business6"}
              icon={<IconCircle />}
              title={"I’m just starting my Business Online33"}
            />
            <StepCardSell
              name={"business7"}
              icon={<IconCircle />}
              title={"I’m just starting my Business Online44"}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const { DropdownIndicator } = components

const CustomDropdownIndicator = (props: any) => {
  return (
    <DropdownIndicator {...props}>
      <TriangleDown />
    </DropdownIndicator>
  )
}

const formatOptionLabel = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
    <div>
      <img
        src="https://flagcdn.com/16x12/ua.png"
        srcSet="https://flagcdn.com/32x24/ua.png 2x,
    https://flagcdn.com/48x36/ua.png 3x"
        width="16"
        height="12"
        alt="Ukraine"
      />
    </div>
    {label}
  </div>
)

const Step3 = () => {
  const { store, isLoading } = useAdminStore()

  const currencyOptions = useMemo(() => {
    if (isLoading) {
      return []
    }

    return (
      store?.currencies.map((c) => ({
        label: c.name,
        value: c.code,
      })) || []
    )
  }, [store, isLoading])

  const countryOptions = countries?.map((c) => ({
    label: c.name,
    value: c.alpha2.toLowerCase(),
  }))

  const { t } = useTranslation()
  const { enableNextPage, disableNextPage } = React.useContext(SteppedContext)
  const { onboardingForm } = useOnboardingForm()

  const {
    formState: { errors },
    control,
  } = onboardingForm

  const reg = useWatch({
    control,
    name: "region",
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
      <div>
        <StepHeader />

        <div className="mt-12 flex flex-col gap-8">
          <div>
            <p className="mb-4 ">Where is your business located?</p>
            <div>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      value={value}
                      onChange={onChange}
                      options={countryOptions}
                      defaultValue={countryOptions[13]}
                      isSearchable
                      classNamePrefix="react-select"
                      formatOptionLabel={formatOptionLabel}
                      components={{
                        DropdownIndicator: CustomDropdownIndicator,
                      }} // Use your custom DropdownIndicator
                      styles={{
                        control: (provided, state) => {
                          return {
                            ...provided,
                            fontSize: "16px",
                            height: "64px",
                            borderRadius: "8px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            borderColor: "#AFAFAF",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: "#dddddd",
                            },
                          }
                        },
                        valueContainer: (provided, state) => ({
                          ...provided,
                        }),
                        input: (provided, state) => ({
                          ...provided,
                        }),
                        indicatorsContainer: (provided, state) => ({
                          ...provided,
                        }),
                        indicatorSeparator: (provided, state) => ({
                          ...provided,
                          display: "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                          // Example: You can use an SVG icon here
                        }),
                        menu: (provided, state) => ({
                          ...provided,
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          borderRadius: "4px",
                          marginTop: "4px",
                          marginBottom: "4px",
                          color: "#4d4d4d",
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "#eeeeee",
                          },
                        }),
                        menuList: (provided, state) => ({
                          ...provided,
                          "&::-webkit-scrollbar": {
                            width: "7.2px",
                            height: "0px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "transparent",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#ddddde",
                            borderRadius: "9999px",
                          },
                        }),
                      }}
                    />
                  )
                }}
              />
            </div>
          </div>

          <div>
            <p className="mb-4">What is your store currency?</p>
            <div>
              <Controller
                name="currency"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Select
                      onChange={onChange}
                      value={value}
                      formatOptionLabel={formatOptionLabel}
                      components={{
                        DropdownIndicator: CustomDropdownIndicator,
                      }}
                      options={countryOptions}
                      defaultValue={countryOptions[0]}
                      isSearchable
                      classNamePrefix="react-select"
                      styles={{
                        control: (provided, state) => {
                          return {
                            ...provided,
                            fontSize: "16px",
                            height: "64px",
                            paddingLeft: "20px",
                            paddingRight: "20px",
                            borderColor: "#AFAFAF",
                            borderRadius: "8px",
                            boxShadow: "none",
                            "&:hover": {
                              borderColor: "#dddddd",
                            },
                          }
                        },

                        valueContainer: (provided, state) => ({
                          ...provided,
                        }),
                        input: (provided, state) => ({
                          ...provided,
                        }),
                        indicatorsContainer: (provided, state) => ({
                          ...provided,
                        }),
                        indicatorSeparator: (provided, state) => ({
                          ...provided,
                          display: "none",
                        }),
                        dropdownIndicator: (provided, state) => ({
                          ...provided,
                        }),
                        menu: (provided, state) => ({
                          ...provided,
                          paddingLeft: "4px",
                          paddingRight: "4px",
                        }),
                        option: (provided, state) => ({
                          ...provided,
                          borderRadius: "4px",
                          marginTop: "4px",
                          marginBottom: "4px",
                          color: "#4d4d4d",
                          backgroundColor: "transparent",
                          "&:hover": {
                            backgroundColor: "#eeeeee",
                          },
                        }),
                        menuList: (provided, state) => ({
                          ...provided,
                          "&::-webkit-scrollbar": {
                            width: "7.2px",
                            height: "0px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "transparent",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "#ddddde",
                            borderRadius: "9999px",
                          },
                        }),
                      }}
                    />
                  )
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

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

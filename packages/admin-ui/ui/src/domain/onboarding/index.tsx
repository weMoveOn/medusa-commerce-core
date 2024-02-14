/* eslint-disable react/jsx-key */
/* eslint-disable quotes */
import React, { useEffect, useMemo, useState } from "react"
import { Route, Routes } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { SteppedContext } from "../../components/molecules/modal/stepped-modal"
import { LayeredModalContext } from "../../components/molecules/modal/layered-modal"
import StepperMVN from "./onboarding-stepper"
import { clx } from "../../utils/clx"
import IconCircle from "../../moveshop-ui/components/fundamentals/icon-circle"
import { useAdminRegions, useAdminStore } from "medusa-react"

import Select from "react-select"
import { countries } from "../../utils/countries"
import { Controller, useWatch } from "react-hook-form"
import OnboardingFormProvider, {
  useOnboardingForm,
} from "./onboarding-stepper/OnboardingFormProvider"
import { Check } from "@medusajs/icons"

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
        <h1 className={clx("mt-3 text-2xl font-semibold ")}>
          Where would you like to sell?
        </h1>
      </div>
    </>
  )
}

const StepCardBusiness = ({
  icon,
  title,
  htmlFor,
}: {
  icon: any
  title: string
  htmlFor: string
}) => {
  return (
    <>
      <label htmlFor={htmlFor} className="flex flex-col items-center  gap-3">
        {icon}
        <input type="checkbox" id={htmlFor} className="hidden" />
        <span className="text-large">{title}</span>
      </label>
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
              name={"business3"}
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

const formatOptionLabel = ({ label }: { label: string }) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <img
      className="rounded-lg"
      src={"https://source.unsplash.com/user/c_v_r/26x26"}
      alt="Location Icon"
      style={{ marginRight: "8px" }}
    />
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
            <p className="mb-4">Where is your business located?</p>
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
                    styles={{
                      // Your styles here
                      // You can either include all styles directly or import them from an external CSS file
                      control: (provided, state) => {
                        return {
                          ...provided,
                          fontSize: "16px",
                          borderRadius: "8px",
                          borderColor: "#AFAFAF",
                          padding: "20px",
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

          <div>
            <p className="mb-4">What is your store currency?</p>

            <Controller
              name="currency"
              control={control}
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    onChange={onChange}
                    value={value}
                    formatOptionLabel={formatOptionLabel}
                    options={countryOptions}
                    defaultValue={countryOptions[0]}
                    isSearchable
                    classNamePrefix="react-select"
                    styles={{
                      // Your styles here
                      // You can either include all styles directly or import them from an external CSS file
                      control: (provided, state) => {
                        return {
                          ...provided,
                          fontSize: "16px",
                          borderColor: "#AFAFAF",
                          borderRadius: "8px",
                          padding: "20px",
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
    </>
  )
}


const OnboardingIndex = () => {
  const { t } = useTranslation()

  const steppedContext = React.useContext(SteppedContext)
  const layeredContext = React.useContext(LayeredModalContext)

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
          <StepperMVN
            layeredContext={layeredContext}
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

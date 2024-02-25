import { components } from "react-select"
import TriangleDown from "../../../../../components/fundamentals/icons/triangle-down"
import { useAdminRegions, useAdminStore } from "medusa-react"
import { useContext, useEffect, useMemo } from "react"
import { countries } from "../../../../../utils/countries"
import { useTranslation } from "react-i18next"
import { SteppedContext } from "../../../onboarding-stepper-context"
import { useOnboardingForm } from "../../../onboarding-form-provider"
import { Controller, useWatch } from "react-hook-form"
import StepContentHeader from "../../step-content-header"
import Select from "react-select"
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

export const Step3 = () => {
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
  const { enableNextPage, disableNextPage } = useContext(SteppedContext)
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
        <StepContentHeader />

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

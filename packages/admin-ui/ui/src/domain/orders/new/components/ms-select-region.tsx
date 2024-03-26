import { useAdminRegion, useAdminRegions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, set, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { NextSelect } from "../../../../components/molecules/select/next-select"
import { useNewOrderForm } from "../form"

const MsSelectRegionScreen = () => {
  const { t } = useTranslation()
  const [regionID, setRegionID] = React.useState<string>("")

  const {
    form: { control, reset },
    context,
  } = useNewOrderForm()

  const { regions } = useAdminRegions()
  const { region, isLoading } = useAdminRegion(regionID)

  // console.log("regions: ", regions)
  // console.log("selectedRegion: ", region)

  // console.log("context: ", context)

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
    // Set the initial value to the first region option
    const initialValue =
      regionOptions.length > 0 ? regionOptions[0].value : null
    setRegionID(initialValue!)
  }, []) // Empty dependency array to run the effect only once after the initial render

  // Watch for changes in the region ID and reset the form when it changes
  // useEffect(() => {
  //   alert("regionID: ")
  //   reset()
  // }, [regionID, reset])

  const handleRegionChange = (newValue) => {
    reset()
    setRegionID(newValue.value)
    context.region = region
  }

  useEffect(() => {
    if (region) {
      context.region = region
    }
  }, [region])

  return (
    <div className="flex  flex-col">
      <Controller
        control={control}
        name="region"
        // defaultValue={{ value: , label: "Default" }}
        render={({ field: { onChange, value } }) => {
          return (
            <NextSelect
              label={t("components-region", "Region")}
              onChange={(newValue) => {
                alert("If you change the region, the form will be reset")
                handleRegionChange(newValue)
                onChange(newValue)
              }}
              value={value}
              options={regionOptions}
            />
          )
        }}
      />
    </div>
  )
}

export default MsSelectRegionScreen

import {
  useAdminRegion,
  useAdminRegions,
  useAdminShippingOptions,
} from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { NextSelect } from "../../../../components/molecules/select/next-select"
import { useNewOrderForm } from "../form"
import { ShippingOption } from "@medusajs/medusa"

const MsSelectRegionScreen = () => {
  const { t } = useTranslation()
  const [regionID, setRegionID] = React.useState<string>("")
  const {
    form: { control, setValue },
    context,
  } = useNewOrderForm()
  const { regions } = useAdminRegions()
  const { region, isLoading } = useAdminRegion(regionID)
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
  }, [regionOptions])

  const handleRegionChange = (newValue) => {
    // Reset the context state to defaultState when the region changes
    setValue("items", [])
    // setValue("region", newValue)
    
  }

  useEffect(() => {
    if (region) {
      context.region = region
    }
  }, [region])

  return (
    <div className="flex flex-col">
      <Controller
        control={control}
        name="region"
        render={({ field: { onChange, value } }) => {
          return (
            <NextSelect
              label={t("components-region", "Region")}
              onChange={(newValue) => {
                // alert("If you change the region, the form will be reset")
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

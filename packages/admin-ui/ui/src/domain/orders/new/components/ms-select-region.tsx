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
    form: { control },
    context,
  } = useNewOrderForm()

  const { regions } = useAdminRegions()
  const { region } = useAdminRegion(regionID)

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
  }, [regionID]) // Empty dependency array to run the effect only once after the initial render

  return (
    <div className="flex  flex-col">
      <Controller
        control={control}
        name="region"
        defaultValue={{ value: regionID, label: "Default" }}
        render={({ field: { onChange, value } }) => {
          return (
            <NextSelect
              label={t("components-region", "Region")}
              onChange={onChange}
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

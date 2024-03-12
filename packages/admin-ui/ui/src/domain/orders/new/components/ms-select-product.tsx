import { useAdminRegions } from "medusa-react"
import React, { useEffect, useMemo } from "react"
import { Controller, useWatch } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import { NextSelect } from "../../../../components/molecules/select/next-select"
import { useNewOrderForm } from "../form"

const SelectProductScreen = () => {
  const { t } = useTranslation()
  const { enableNextPage, disableNextPage } = React.useContext(SteppedContext)

  const {
    form: { control },
  } = useNewOrderForm()

  const reg = useWatch({
    control,
    name: "region",
  })

//   const { regions } = useAdminRegions()

  const regionOptions = useMemo(() => {
    // if (!regions) {
    //   return []
    // }

    return [1,2,3,4,5,6,7].map((region) => ({
      label: "Label",
      value: region,
    }))
  }, [])

  useEffect(() => {
    if (!reg) {
      disableNextPage()
    } else {
      enableNextPage()
    }
  }, [reg])

  // min-h-[705px]

  return (
    <div className="flex  flex-col">
      <Controller
        control={control}
        name="region"
        render={({ field: { onChange, value } }) => {
          return (
            <NextSelect
              placeholder="Find products from inventory..."
              onChange={onChange}
              value={value}
              options={regionOptions}
              isMulti={true}
            />
          )
        }}
      />
    </div>
  )
}

export default SelectProductScreen

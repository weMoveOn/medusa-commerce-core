import React, { useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import RadioGroup from "../../../../components/organisms/radio-group"
import Section from "../../../../components/organisms/section"
import RegionCard from "./region-card"
import { storeData } from "../data"

type Props = {
  id?: string
}

const InventoryPricingOverview = ({ id }: Props) => {
  const navigate = useNavigate()
  const [selectedRegion, setSelectedRegion] = React.useState<
    string | undefined
  >(id)

  const handleChange = useCallback(
    (id: string) => {
      if (id !== selectedRegion) {
        setSelectedRegion(id)
        navigate(`/a/settings/inventory-pricing/${id}`, {
          replace: true,
        })
      }
    },
    [navigate, selectedRegion]
  )

  useEffect(() => {
    if (id) {
      handleChange(id)
    }

    if (!id && storeData && storeData.length > 0) {
      handleChange(storeData[0].id)
    }
  }, [handleChange, id, storeData])

  return (
    <>
      <Section
        title="Inventory Pricing"
        className="h-full"
      >
        <p className="text-base-regular text-grey-50 mt-2xsmall">
          Manage the pricing of imported products.
        </p>
        <div className="mt-large">
          <RadioGroup.Root value={selectedRegion} onValueChange={handleChange}>
            {storeData?.map((store) => (
              <RegionCard key={store.id} store={store} />
            ))}
          </RadioGroup.Root>
        </div>
      </Section>
    </>
  )
}

export default InventoryPricingOverview

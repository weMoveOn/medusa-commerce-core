import { useParams } from "react-router-dom"
import BackButton from "../../../components/atoms/back-button"
import EditInventoryPricing from "./edit"
import InventoryPricingOverview from "./inventory-pricing-overview"
import { storeData } from "./data"
import { IInventoryStore } from "../../../types/inventory-price-setting"

const InventoryPricing = () => {
  const params = useParams()
  const storeId: string | undefined = params["*"]

  const store = storeData.find(store => store.id === storeId ?? "1") as IInventoryStore;

  return (
    <div className="gap-y-xsmall flex h-full flex-col">
      <BackButton label="Back to settings" path="/a/settings" />
      <div className="medium:grid-cols-3 gap-xsmall pb-xlarge grid grid-cols-1">
        <div className="h-full w-full">
          <InventoryPricingOverview id={storeId ?? "1"} />
        </div>
        <div className="col-span-2">
          <EditInventoryPricing store={store} />
        </div>
      </div>
    </div>
  )
}

export default InventoryPricing

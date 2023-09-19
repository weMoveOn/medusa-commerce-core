import { useAdminRegion } from "medusa-react"
import Spinner from "../../../../components/atoms/spinner"
import GeneralSection from "./general-section"
import { storeData } from "../data"
import PricingOptions from "./pricing-settings"

type Props = {
  id: string
}

const EditInventoryPricing = ({ id }: Props) => {
  const store = storeData.find(store => store.id === id);
  const isLoading = false;
  const isError = !store;

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
        <h1 className="inter-large-semibold">Something went wrong...</h1>
        <p className="inter-base-regular text-grey-50">
          We can't find a store with that ID, use the menu to the left to
          select a store.
        </p>
      </div>
    )
  }

  return (
    <div className="gap-y-xsmall flex flex-col">
      <PricingOptions store={store} />
      <GeneralSection store={store} />
    </div>
  )
}

export default EditInventoryPricing

import { useAdminRegion } from "medusa-react"
import Spinner from "../../../../components/atoms/spinner"
import GeneralSection from "./general-section"
import { storeData } from "../data"
import PricingOptions from "./pricing-settings"
import { useQuery } from "@tanstack/react-query"
import { IPriceSettingReturnType } from "../../../../types/inventory-price-setting"
import { AxiosResponse } from "axios"
import Medusa from "../../../../services/api"
import { useEffect } from "react"

type Props = {
  id: string
}

const EditInventoryPricing = ({ id }: Props) => {
  const store = storeData.find(store => store.id === id);
  
  if (!store) {
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

  const { isLoading, isError, data, error, refetch } = useQuery<
  AxiosResponse<IPriceSettingReturnType>
>(["single-price-setting-retrieve"], () =>
  Medusa.InventoryPriceSettings.list(store.slug))
  
  useEffect(() => {
    refetch();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner variant="secondary" />
      </div>
    )
  }

  return (
    <div className="gap-y-xsmall flex flex-col">
      <PricingOptions store={store} />

      {!data?.data.count && 
      <div className="bg-grey-0 rounded-rounded border-grey-20 gap-y-xsmall flex h-full w-full flex-col items-center justify-center border text-center p-20">
        <h1 className="inter-large-semibold">No price role found...</h1>
        <p className="inter-base-regular text-grey-50">
          We can't find any price role with this store, use set price button above to set price.
        </p>
      </div>
      }

       {data?.data && <GeneralSection store={store} data={data?.data} />}
    </div>
  )
}

export default EditInventoryPricing

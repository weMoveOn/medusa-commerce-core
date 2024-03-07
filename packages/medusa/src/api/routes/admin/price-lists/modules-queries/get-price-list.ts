import { MedusaContainer } from "@medusajs/types"
import { PriceList } from "../../../../../models"
import { MedusaError } from "medusa-core-utils"
import { listAndCountPriceListPricingModule } from "./list-and-count-price-lists"

export async function getPriceListPricingModule(
  storeId: string,
  id: string,
  {
    container,
  }: {
    container: MedusaContainer
  }
): Promise<PriceList> {
  const [priceLists, count] = await listAndCountPriceListPricingModule({
    filters: {
      id: [id],
      store_id: storeId,
    },
    container,
  })

  if (count === 0) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Price list with id: ${id} was not found`
    )
  }

  return priceLists[0]
}

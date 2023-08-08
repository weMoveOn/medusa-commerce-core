import {
  IInventoryService,
  InventoryItemDTO,
  ProductTypes,
} from "@medusajs/types"
import { WorkflowArguments } from "../../helper"

type Result = {
  variant: ProductTypes.ProductVariantDTO
  inventoryItem: InventoryItemDTO
}[]

export async function createInventoryItems({
  container,
  context,
  data,
}: WorkflowArguments<{
  products: ProductTypes.ProductDTO[]
}>): Promise<Result | void> {
  const inventoryService: IInventoryService =
    container.resolve("inventoryService")

  if (!inventoryService) {
    const logger = container.resolve("logger")
    logger.warn(
      `Inventory service not found. You should install the @medusajs/inventory package to use inventory. The 'createInventoryItems' will be skipped.`
    )
    return void 0
  }

  const variants = data.products.reduce(
    (
      acc: ProductTypes.ProductVariantDTO[],
      product: ProductTypes.ProductDTO
    ) => {
      return acc.concat(product.variants)
    },
    []
  )

  const result = await Promise.all(
    variants.map(async (variant) => {
      if (!variant.manage_inventory) {
        return
      }

      const inventoryItem = await inventoryService!.createInventoryItem(
        {
          sku: variant.sku!,
          origin_country: variant.origin_country!,
          hs_code: variant.hs_code!,
          mid_code: variant.mid_code!,
          material: variant.material!,
          weight: variant.weight!,
          length: variant.length!,
          height: variant.height!,
          width: variant.width!,
        },
        {
          transactionManager: (context.transactionManager ??
            context.manager) as any,
        }
      )

      return { variant, inventoryItem }
    })
  )

  return result.filter(Boolean) as Result
}

createInventoryItems.aliases = {
  products: "products",
}

import { CartDTO } from "@medusajs/types"
import { WorkflowArguments } from "../../helper"

enum Aliases {
  SalesChannel = "SalesChannel",
  Addresses = "addresses",
  Customer = "customer",
  Region = "region",
  Context = "context",
}

type HandlerInputData = {
  sales_channel: {
    sales_channel_id?: string
  }
  addresses: {
    shipping_address_id: string
    billing_address_id: string
  }
  customer: {
    customer_id?: string
    email?: string
  }
  region: {
    region_id: string
  }
  context: {
    context: Record<any, any>
  }
}

type HandlerOutputData = {
  cart: CartDTO
}

export async function createCart({
  container,
  context,
  data,
}: WorkflowArguments<HandlerInputData>): Promise<HandlerOutputData> {
  const { manager } = context

  const cartService = container.resolve("cartService")
  const cartServiceTx = cartService.withTransaction(manager)

  const cart = await cartServiceTx.create({
    ...data[Aliases.SalesChannel],
    ...data[Aliases.Addresses],
    ...data[Aliases.Customer],
    ...data[Aliases.Region],
    ...data[Aliases.Context],
  })

  return cart
}

createCart.aliases = Aliases

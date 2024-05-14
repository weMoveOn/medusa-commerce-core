import {
  CartService,
  DraftOrderService,
  OrderService,
  PaymentProviderService,
  ProductVariantInventoryService,
} from "../../../../services"
import {
  defaultAdminOrdersFields as defaultOrderFields,
  defaultAdminOrdersRelations as defaultOrderRelations,
} from "../../../../types/orders"

import { EntityManager } from "typeorm"
import { MedusaError } from "medusa-core-utils"
import { Order } from "../../../../models"
import { cleanResponseData } from "../../../../utils/clean-response-data"
import { promiseAll } from "@medusajs/utils"

/**
 * @oas [post] /admin/draft-orders/{id}/pay
 * summary: "Mark Paid"
 * operationId: "PostDraftOrdersDraftOrderRegisterPayment"
 * description: "Capture the draft order's payment. This will also set the draft order's status to `completed` and create an Order from the draft order. The payment is captured through Medusa's system payment,
 *  which is manual payment that isn't integrated with any third-party payment provider. It is assumed that the payment capturing is handled manually by the admin."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {String} The Draft Order ID.
 * x-codegen:
 *   method: markPaid
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.draftOrders.markPaid(draftOrderId)
 *       .then(({ order }) => {
 *         console.log(order.id);
 *       })
 *   - lang: tsx
 *     label: Medusa React
 *     source: |
 *       import React from "react"
 *       import { useAdminDraftOrderRegisterPayment } from "medusa-react"
 *
 *       type Props = {
 *         draftOrderId: string
 *       }
 *
 *       const DraftOrder = ({ draftOrderId }: Props) => {
 *         const registerPayment = useAdminDraftOrderRegisterPayment(
 *           draftOrderId
 *         )
 *         // ...
 *
 *         const handlePayment = () => {
 *           registerPayment.mutate(void 0, {
 *             onSuccess: ({ order }) => {
 *               console.log(order.id)
 *             }
 *           })
 *         }
 *
 *         // ...
 *       }
 *
 *       export default DraftOrder
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X POST '{backend_url}/admin/draft-orders/{id}/pay' \
 *       -H 'x-medusa-access-token: {api_token}'
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Draft Orders
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdminPostDraftOrdersDraftOrderRegisterPaymentRes"
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 */

export default async (req, res) => {
  const { id } = req.params
  const { store_id } = req.query

  const draftOrderService: DraftOrderService =
    req.scope.resolve("draftOrderService")
  const paymentProviderService: PaymentProviderService = req.scope.resolve(
    "paymentProviderService"
  )
  const orderService: OrderService = req.scope.resolve("orderService")
  const inventoryService: OrderService = req.scope.resolve("inventoryService")
  const cartService: CartService = req.scope.resolve("cartService")
  const productVariantInventoryService: ProductVariantInventoryService =
    req.scope.resolve("productVariantInventoryService")
  const entityManager: EntityManager = req.scope.resolve("manager")

  const order = await entityManager.transaction(async (manager) => {
    const draftOrderServiceTx = draftOrderService.withTransaction(manager)
    const orderServiceTx = orderService.withTransaction(manager)
    const cartServiceTx = cartService.withTransaction(manager)

    const draftOrder = await draftOrderServiceTx.retrieve(store_id, id)

    const cart = await cartServiceTx.retrieveWithTotals(store_id,draftOrder.cart_id)

    await paymentProviderService
      .withTransaction(manager)
      .createSession(store_id,"system", cart)

    await cartServiceTx.setPaymentSession(store_id,cart.id, "system")

    await cartServiceTx.createTaxLines(cart.id,store_id)

    await cartServiceTx.authorizePayment(store_id,cart.id)

    let order = await orderServiceTx.createFromCart(store_id, cart.id)

    await draftOrderServiceTx.registerCartCompletion(draftOrder.id, order.id)

    await orderServiceTx.capturePayment(store_id,order.id)

    order = await orderService
      .withTransaction(manager)
      .retrieveWithTotals(store_id,order.id, {
        relations: defaultOrderRelations,
        select: defaultOrderFields,
      })

    return order
  })

  res.status(200).json({ order: cleanResponseData(order, []) })
}

export const reserveQuantityForDraftOrder = async (
  order: Order,
  context: {
    productVariantInventoryService: ProductVariantInventoryService
    locationId?: string
  }
) => {
  const { productVariantInventoryService, locationId } = context
  await promiseAll(
    order.items.map(async (item) => {
      if (item.variant_id) {
        const inventoryConfirmed =
          await productVariantInventoryService.confirmInventory(
            item.variant_id,
            item.quantity,
            { salesChannelId: order.sales_channel_id }
          )

        if (!inventoryConfirmed) {
          throw new MedusaError(
            MedusaError.Types.NOT_ALLOWED,
            `Variant with id: ${item.variant_id} does not have the required inventory`,
            MedusaError.Codes.INSUFFICIENT_INVENTORY
          )
        }

        await productVariantInventoryService.reserveQuantity(
          item.variant_id,
          item.quantity,
          {
            lineItemId: item.id,
            salesChannelId: order.sales_channel_id,
          }
        )
      }
    })
  )
}

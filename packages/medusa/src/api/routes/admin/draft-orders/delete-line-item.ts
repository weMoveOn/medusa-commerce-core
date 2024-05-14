import { CartService, DraftOrderService } from "../../../../services"
import {
  defaultAdminDraftOrdersCartFields,
  defaultAdminDraftOrdersCartRelations,
  defaultAdminDraftOrdersFields,
} from "."

import { DraftOrder } from "../../../.."
import { EntityManager } from "typeorm"
import { MedusaError } from "medusa-core-utils"
import { cleanResponseData } from "../../../../utils/clean-response-data"

/**
 * @oas [delete] /admin/draft-orders/{id}/line-items/{line_id}
 * operationId: DeleteDraftOrdersDraftOrderLineItemsItem
 * summary: Delete a Line Item
 * description: "Delete a Line Item from a Draft Order."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Draft Order.
 *   - (path) line_id=* {string} The ID of the line item.
 * x-codegen:
 *   method: removeLineItem
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in or use api token
 *       medusa.admin.draftOrders.removeLineItem(draftOrderId, itemId)
 *       .then(({ draft_order }) => {
 *         console.log(draft_order.id);
 *       })
 *   - lang: tsx
 *     label: Medusa React
 *     source: |
 *       import React from "react"
 *       import { useAdminDraftOrderRemoveLineItem } from "medusa-react"
 *
 *       type Props = {
 *         draftOrderId: string
 *       }
 *
 *       const DraftOrder = ({ draftOrderId }: Props) => {
 *         const deleteLineItem = useAdminDraftOrderRemoveLineItem(
 *           draftOrderId
 *         )
 *         // ...
 *
 *         const handleDelete = (itemId: string) => {
 *           deleteLineItem.mutate(itemId, {
 *             onSuccess: ({ draft_order }) => {
 *               console.log(draft_order.cart)
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
 *       curl -X DELETE '{backend_url}/admin/draft-orders/{id}/line-items/{line_id}' \
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
 *           $ref: "#/components/schemas/AdminDraftOrdersRes"
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
  const { id, line_id } = req.params
  const { store_id } = req.query

  const draftOrderService: DraftOrderService =
    req.scope.resolve("draftOrderService")
  const cartService: CartService = req.scope.resolve("cartService")
  const entityManager: EntityManager = req.scope.resolve("manager")

  await entityManager.transaction(async (manager) => {
    const draftOrder: DraftOrder = await draftOrderService
      .withTransaction(manager)
      .retrieve(store_id, id, { select: defaultAdminDraftOrdersFields })

    if (draftOrder.status === "completed") {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        "You are only allowed to update open draft orders"
      )
    }

    await cartService
      .withTransaction(manager)
      .removeLineItem(store_id, draftOrder.cart_id, line_id)

    draftOrder.cart = await cartService
      .withTransaction(manager)
      .retrieveWithTotals(store_id,draftOrder.cart_id,{
        relations: defaultAdminDraftOrdersCartRelations,
        select: defaultAdminDraftOrdersCartFields,
      })

    res.status(200).json({
      draft_order: cleanResponseData(draftOrder, []),
    })
  })
}

import { defaultStoreCustomersFields, defaultStoreCustomersRelations } from "."

import { EntityManager } from "typeorm"
import CustomerService from "../../../../services/customer"

/**
 * @oas [delete] /store/customers/me/addresses/{address_id}
 * operationId: DeleteCustomersCustomerAddressesAddress
 * summary: Delete an Address
 * description: "Delete an Address from the Customer's saved addresses."
 * x-authenticated: true
 * parameters:
 *   - (path) address_id=* {string} The id of the Address to remove.
 * x-codegen:
 *   method: deleteAddress
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged
 *       medusa.customers.addresses.deleteAddress(addressId)
 *       .then(({ customer }) => {
 *         console.log(customer.id);
 *       })
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl -X DELETE '{backend_url}/store/customers/me/addresses/{address_id}' \
 *       -H 'Authorization: Bearer {access_token}'
 * security:
 *   - cookie_auth: []
 *   - jwt_token: []
 * tags:
 *   - Customers
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/StoreCustomersRes"
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
  const { store_id } = req.query
  const id = req.user.customer_id

  const { address_id } = req.params
  const { store_id } = req.query

  const customerService: CustomerService = req.scope.resolve("customerService")

  const manager: EntityManager = req.scope.resolve("manager")
  await manager.transaction(async (transactionManager) => {
    return await customerService
      .withTransaction(transactionManager)
      .removeAddress(store_id,id, address_id)
  })

  const customer = await customerService.retrieve(store_id,id, {
    relations: defaultStoreCustomersRelations,
    select: defaultStoreCustomersFields,
  })

  res.json({ message: "Address deleted", customer })
}

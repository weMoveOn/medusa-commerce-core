import { useApi } from "../../../environment-helpers/use-api"
import { initDb, useDb } from "../../../environment-helpers/use-db"
import { simpleCartFactory, simpleRegionFactory } from "../../../factories"

import { ModuleRegistrationName } from "@medusajs/modules-sdk"
import { AxiosInstance } from "axios"
import path from "path"
import { startBootstrapApp } from "../../../environment-helpers/bootstrap-app"
import { getContainer } from "../../../environment-helpers/use-container"
import adminSeeder from "../../../helpers/admin-seeder"
import { createDefaultRuleTypes } from "../../helpers/create-default-rule-types"

jest.setTimeout(5000000)

const DB_HOST = process.env.DB_HOST
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_TEMP_NAME
const DB_URL = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

const adminHeaders = {
  headers: {
    "x-medusa-access-token": "test_token",
  },
}

const env = {
  MEDUSA_FF_MEDUSA_V2: true,
}

describe("Link Modules", () => {
  let medusaContainer
  let dbConnection
  let shutdownServer

  beforeAll(async () => {
    const cwd = path.resolve(path.join(__dirname, "..", ".."))
    dbConnection = await initDb({ cwd, env } as any)
    shutdownServer = await startBootstrapApp({ cwd, env })
    medusaContainer = getContainer()
  })

  afterAll(async () => {
    const db = useDb()
    await db.shutdown()
    await shutdownServer()
  })

  beforeEach(async () => {
    await createDefaultRuleTypes(medusaContainer)
    await adminSeeder(dbConnection)
    await simpleRegionFactory(dbConnection, {
      id: "region-1",
      currency_code: "usd",
    })
  })

  describe("get product price", () => {
    let ruleType
    let priceSet
    let productId
    const cartId = "test-cart"
    beforeEach(async () => {
      const pricingModuleService = medusaContainer.resolve(
        ModuleRegistrationName.PRICING
      )
      const api = useApi()! as AxiosInstance

      await simpleCartFactory(dbConnection, { id: cartId, region: "region-1" })

      const payload = {
        title: "Test",
        description: "test-product-description",
        images: ["test-image.png", "test-image-2.png"],
        variants: [
          {
            title: "Test variant",
            prices: [],
            options: [],
          },
        ],
      }

      const response = await api.post("/admin/products", payload, adminHeaders)

      productId = response.data.product.id
      const variant = response.data.product.variants[0]

      ruleType = await pricingModuleService.createRuleTypes([
        { name: "region_id", rule_attribute: "region_id" },
      ])

      priceSet = await pricingModuleService.create({
        rules: [{ rule_attribute: "region_id" }],
        prices: [
          {
            amount: 1000,
            currency_code: "usd",
            rules: { region_id: "region-1" },
          },
          {
            amount: 900,
            currency_code: "usd",
            rules: { region_id: "region-2" },
          },
        ],
      })

      const remoteLink = medusaContainer.resolve("remoteLink") as any

      await remoteLink.create({
        productService: {
          variant_id: variant.id,
        },
        pricingService: {
          price_set_id: priceSet.id,
        },
      })
    })

    it("Should get prices declared in pricing module", async () => {
      const api = useApi()! as AxiosInstance

      const response = await api.get(
        `/store/products/${productId}?cart_id=${cartId}`
      )

      expect(response.data.product.variants[0].prices).toEqual([
        expect.objectContaining({
          amount: 1000,
          currency_code: "usd",
        }),
      ])
    })
  })
})

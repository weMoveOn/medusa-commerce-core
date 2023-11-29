import { DB_URL, MikroOrmWrapper } from "../../../utils"

import { IPricingModuleService } from "@medusajs/types"
import { SqlEntityManager } from "@mikro-orm/postgresql"
import { initialize } from "../../../../src"
import { createPriceLists } from "../../../__fixtures__/price-list"
import { createPriceListRules } from "../../../__fixtures__/price-list-rules"
import { createRuleTypes } from "../../../__fixtures__/rule-type"

jest.setTimeout(30000)

describe("PriceListRule Service", () => {
  let service: IPricingModuleService
  let testManager: SqlEntityManager
  let repositoryManager: SqlEntityManager

  beforeEach(async () => {
    await MikroOrmWrapper.setupDatabase()
    repositoryManager = await MikroOrmWrapper.forkManager()

    service = await initialize({
      database: {
        clientUrl: DB_URL,
        schema: process.env.MEDUSA_PRICING_DB_SCHEMA,
      },
    })

    testManager = await MikroOrmWrapper.forkManager()
    await createRuleTypes(testManager)
    await createPriceLists(testManager)
    await createPriceListRules(testManager)
  })

  afterEach(async () => {
    await MikroOrmWrapper.clearDatabase()
  })

  describe("list", () => {
    it("should list priceListRules", async () => {
      const priceListRuleResult = await service.listPriceListRules()

      expect(priceListRuleResult).toEqual([
        expect.objectContaining({
          id: "price-list-rule-1",
        }),
        expect.objectContaining({
          id: "price-list-rule-2",
        }),
      ])
    })

    it("should list priceListRules by pricelist id", async () => {
      const priceListRuleResult = await service.listPriceListRules({
        id: ["price-list-rule-1"],
      })

      expect(priceListRuleResult).toEqual([
        expect.objectContaining({
          id: "price-list-rule-1",
        }),
      ])
    })
  })

  describe("listAndCount", () => {
    it("should return pricelistrules and count", async () => {
      const [priceListRuleResult, count] =
        await service.listAndCountPriceListRules()

      expect(count).toEqual(2)
      expect(priceListRuleResult).toEqual([
        expect.objectContaining({
          id: "price-list-rule-1",
        }),
        expect.objectContaining({
          id: "price-list-rule-2",
        }),
      ])
    })

    it("should return pricelistrules and count when filtered", async () => {
      const [priceListRuleResult, count] =
        await service.listAndCountPriceListRules({
          id: ["price-list-rule-1"],
        })

      expect(count).toEqual(1)
      expect(priceListRuleResult).toEqual([
        expect.objectContaining({
          id: "price-list-rule-1",
        }),
      ])
    })

    it("should return pricelistrules and count when using skip and take", async () => {
      const [priceListRuleResult, count] =
        await service.listAndCountPriceListRules({}, { skip: 1, take: 1 })

      expect(count).toEqual(2)
      expect(priceListRuleResult).toEqual([
        expect.objectContaining({
          id: "price-list-rule-2",
        }),
      ])
    })

    it("should return requested fields", async () => {
      const [priceListRuleResult, count] =
        await service.listAndCountPriceListRules(
          {},
          {
            take: 1,
            select: ["id"],
          }
        )

      const serialized = JSON.parse(JSON.stringify(priceListRuleResult))

      expect(count).toEqual(2)
      expect(serialized).toEqual([
        {
          id: "price-list-rule-1",
        },
      ])
    })
  })

  describe("retrieve", () => {
    const id = "price-list-rule-1"

    it("should return priceList for the given id", async () => {
      const priceListRuleResult = await service.retrievePriceListRule(id)

      expect(priceListRuleResult).toEqual(
        expect.objectContaining({
          id,
        })
      )
    })

    it("should throw an error when priceListRule with id does not exist", async () => {
      let error

      try {
        await service.retrievePriceListRule("does-not-exist")
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual(
        "PriceListRule with id: does-not-exist was not found"
      )
    })

    it("should throw an error when a id is not provided", async () => {
      let error

      try {
        await service.retrievePriceListRule(undefined as unknown as string)
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual('"priceListRuleId" must be defined')
    })
  })

  describe("delete", () => {
    const id = "price-list-rule-1"

    it("should delete the pricelists given an id successfully", async () => {
      await service.deletePriceListRules([id])

      const priceListResult = await service.listPriceListRules({
        id: [id],
      })

      expect(priceListResult).toHaveLength(0)
    })
  })

  describe("update", () => {
    const id = "price-list-rule-2"

    it("should update the value of the priceListRule successfully", async () => {
      await service.updatePriceListRules([
        {
          id,
          price_list_id: "price-list-2",
          rule_type_id: "rule-type-2",
        },
      ])

      const priceList = await service.retrievePriceListRule(id, {
        relations: ["price_list", "rule_type"],
      })

      expect(priceList.price_list.id).toEqual("price-list-2")
      expect(priceList.rule_type.id).toEqual("rule-type-2")
    })

    it("should throw an error when a id does not exist", async () => {
      let error

      try {
        await service.updatePriceListRules([
          {
            id: "does-not-exist",
          },
        ])
      } catch (e) {
        error = e
      }

      expect(error.message).toEqual(
        'PriceListRule with id(s) "does-not-exist" not found'
      )
    })
  })

  describe("create", () => {
    it("should create a priceListRule successfully", async () => {
      const [created] = await service.createPriceListRules([
        {
          price_list_id: "price-list-2",
          rule_type_id: "rule-type-2",
        },
      ])

      const [priceListRule] = await service.listPriceListRules(
        {
          id: [created.id],
        },
        {
          relations: ["price_list", "rule_type"],
        }
      )

      expect(priceListRule.price_list.id).toEqual("price-list-2")
      expect(priceListRule.rule_type.id).toEqual("rule-type-2")
    })
  })

  describe("setPriceListRules", () => {
    it("should add a priceListRule to a priceList", async () => {
      await createRuleTypes(testManager, [
        {
          id: "rule-type-3",
          name: "test",
          rule_attribute: "sales_channel",
        },
      ])

      await service.setPriceListRules({
        priceListId: "price-list-1",
        rules: {
          sales_channel: "sc-1",
        },
      })

      const [priceList] = await service.listPriceLists(
        {
          id: ["price-list-1"],
        },
        {
          relations: [
            "price_list_rules",
            "price_list_rules.price_list_rule_values",
          ],
        }
      )

      expect(priceList.price_list_rules).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            rule_type: "rule-type-3",
            price_list_rule_values: [
              expect.objectContaining({ value: "sc-1" }),
            ],
          }),
        ])
      )
    })

    it("should multiple priceListRules to a priceList", async () => {
      await createRuleTypes(testManager, [
        {
          id: "rule-type-3",
          name: "test",
          rule_attribute: "sales_channel",
        },
      ])

      await service.setPriceListRules({
        priceListId: "price-list-1",
        rules: {
          sales_channel: ["sc-1", "sc-2"],
        },
      })

      const [priceList] = await service.listPriceLists(
        {
          id: ["price-list-1"],
        },
        {
          relations: [
            "price_list_rules",
            "price_list_rules.price_list_rule_values",
          ],
        }
      )

      expect(priceList.price_list_rules).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            rule_type: "rule-type-3",
            price_list_rule_values: expect.arrayContaining([
              expect.objectContaining({ value: "sc-1" }),
              expect.objectContaining({ value: "sc-2" }),
            ]),
          }),
        ])
      )
    })
  })

  describe("removePriceListRules", () => {
    it("should remove a priceListRule from a priceList", async () => {
      await service.removePriceListRules({
        priceListId: "price-list-1",
        rules: ["currency_code"],
      })

      const [priceList] = await service.listPriceLists(
        {
          id: ["price-list-1"],
        },
        {
          relations: ["price_list_rules"],
        }
      )

      expect(priceList.price_list_rules).toEqual([
        expect.objectContaining({ rule_type: "rule-type-2" }),
      ])
    })
  })
})

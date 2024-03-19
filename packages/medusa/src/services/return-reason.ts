import { isDefined, MedusaError } from "medusa-core-utils"
import { EntityManager } from "typeorm"
import { TransactionBaseService } from "../interfaces"
import { ReturnReason } from "../models"
import { ReturnReasonRepository } from "../repositories/return-reason"
import { FindConfig, Selector } from "../types/common"
import { CreateReturnReason, UpdateReturnReason } from "../types/return-reason"
import { buildQuery } from "../utils"
import { ICacheService } from "@medusajs/types"

type InjectedDependencies = {
  manager: EntityManager
  returnReasonRepository: typeof ReturnReasonRepository
  cacheService: ICacheService;
}

class ReturnReasonService extends TransactionBaseService {
  protected readonly retReasonRepo_: typeof ReturnReasonRepository
  protected readonly cacheService_: ICacheService;

  constructor({ returnReasonRepository, cacheService }: InjectedDependencies) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.retReasonRepo_ = returnReasonRepository
    this.cacheService_ = cacheService;
  }

  async create(data: CreateReturnReason & { store_id: string }): Promise<ReturnReason | never> {
    console.log(data,"data")
    return await this.atomicPhase_(async (manager) => {
      const rrRepo = manager.withRepository(this.retReasonRepo_)

      if (data.parent_return_reason_id && data.parent_return_reason_id !== "") {
        const parentReason = await this.retrieve(data.store_id, data.parent_return_reason_id)

        if (parentReason.parent_return_reason_id) {
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            "Doubly nested return reasons is not supported"
          )
        }
      }

      const created = rrRepo.create(data)
      const savedReason = await rrRepo.save(created);
      const cacheKey = `return_reason:${savedReason.id}:${data.store_id}`;

      await this.cacheService_.set(cacheKey, savedReason);

      return savedReason;
    })
  }

  async update(storeId: string, id: string, data: UpdateReturnReason): Promise<ReturnReason> {
    return await this.atomicPhase_(async (manager) => {
      const rrRepo = manager.withRepository(this.retReasonRepo_)
      const reason = await this.retrieve(storeId, id)

      for (const key of Object.keys(data).filter(
        (k) => typeof data[k] !== `undefined`
      )) {
        reason[key] = data[key]
      }

      await rrRepo.save(reason)

      return reason
    })
  }

  /**
   * @param {Object} selector - the query object for find
   * @param {Object} config - config object
   * @return {Promise} the result of the find operation
   */
  async list(
    selector: Selector<ReturnReason>,
    config: FindConfig<ReturnReason> = {
      skip: 0,
      take: 50,
      order: { created_at: "DESC" },
    }
  ): Promise<ReturnReason[]> {
    const rrRepo = this.activeManager_.withRepository(this.retReasonRepo_)
    const query = buildQuery(selector, config)
    return rrRepo.find(query)
  }

  /**
   * Gets an order by id.
   * @param {string} returnReasonId - id of order to retrieve
   * @param {Object} config - config object
   * @return {Promise<Order>} the order document
   */
  async retrieve(
    storeId: string,
    returnReasonId: string,
    config: FindConfig<ReturnReason> = {}
  ): Promise<ReturnReason | never> {
    if (!isDefined(returnReasonId)) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `"returnReasonId" must be defined`
      )
    }
    const cacheKey = `return_reason:${returnReasonId}:${storeId}`;

    let cachedReason = await this.cacheService_.get<ReturnReason>(cacheKey);
    if (cachedReason) {
      return cachedReason;
    }

    const rrRepo = this.activeManager_.withRepository(this.retReasonRepo_)

    const query = buildQuery({ id: returnReasonId, store_id: storeId }, config)
    const item = await rrRepo.findOne(query)

    if (!item) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Return Reason with id: ${returnReasonId} was not found.`
      )
    }
    await this.cacheService_.set(cacheKey, item)

    return item
  }

  async delete(storeId: string, returnReasonId: string): Promise<void> {
    return this.atomicPhase_(async (manager) => {
      const rrRepo = manager.withRepository(this.retReasonRepo_)

      // We include the relation 'return_reason_children' to enable cascading deletes of return reasons if a parent is removed
      const reason = await this.retrieve(storeId, returnReasonId, {
        relations: ["return_reason_children"],
      })

      if (!reason) {
        return Promise.resolve()
      }
      const cacheKey = `return_reason:${returnReasonId}:${storeId}`;
      await this.cacheService_.invalidate(cacheKey);

      await rrRepo.softRemove(reason)

      return Promise.resolve()
    })
  }
}

export default ReturnReasonService

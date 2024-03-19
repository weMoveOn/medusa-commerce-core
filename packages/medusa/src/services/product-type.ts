import { MedusaError } from "medusa-core-utils"
import { FindOptionsWhere, ILike } from "typeorm"
import { ProductType } from "../models"
import { ProductTypeRepository } from "../repositories/product-type"
import { ExtendedFindConfig, FindConfig, Selector } from "../types/common"
import { TransactionBaseService } from "../interfaces"
import { buildQuery, isString } from "../utils"
import { ICacheService } from "@medusajs/types"

class ProductTypeService extends TransactionBaseService {
  protected readonly typeRepository_: typeof ProductTypeRepository
  protected readonly cacheService_: ICacheService;

  constructor({ productTypeRepository, cacheService}) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.typeRepository_ = productTypeRepository
    this.cacheService_ = cacheService;
  }

  /**
   * Gets a product type by id.
   * Throws in case of DB Error and if product was not found.
   * @param id - id of the product to get.
   * @param config - object that defines what should be included in the
   *   query response
   * @return the result of the find one operation.
   */
  async retrieve(
    storeId: string,
    id: string,
    config: FindConfig<ProductType> = {}
  ): Promise<ProductType> {
    const typeRepo = this.activeManager_.withRepository(this.typeRepository_)

    const query = buildQuery({ id, store_id: storeId }, config)
    const type = await typeRepo.findOne(query)

    if (!type) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Product type with id: ${id} was not found`
      )
    }

    return type
  }

  /**
   * Lists product types
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async list(
    selector: Selector<ProductType> & {
      q?: string
      discount_condition_id?: string
    } = {},
    config: FindConfig<ProductType> = { skip: 0, take: 20 }
  ): Promise<ProductType[]> {
    const [productTypes] = await this.listAndCount(selector, config)
    return productTypes
  }

  /**
   * Lists product types and adds count.
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async listAndCount(
    selector: Selector<ProductType> & {
      q?: string
      discount_condition_id?: string
    } = {},
    config: FindConfig<ProductType> = { skip: 0, take: 20 }
  ): Promise<[ProductType[], number]> {
    const cacheKey = `productTypes:${JSON.stringify(selector)}:${JSON.stringify(config)}`;

    let cachedResult = await this.cacheService_.get<[ProductType[], number]>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    const typeRepo = this.activeManager_.withRepository(this.typeRepository_)

    let q
    if (isString(selector.q)) {
      q = selector.q
      delete selector.q
    }

    // if (!selector.store_id) {
    //   throw new MedusaError(
    //     MedusaError.Types.INVALID_DATA,
    //     `Store id must be provided`
    //   )
    // }

    const query = buildQuery(
      selector,
      config
    ) as ExtendedFindConfig<ProductType> & {
      where: FindOptionsWhere<ProductType> & { discount_condition_id?: string }
    }

    if (q) {
      query.where.value = ILike(`%${q}%`)
    }

    let result: [ProductType[], number];
    if (selector.discount_condition_id) {
      result = await typeRepo.findAndCountByDiscountConditionId(selector.discount_condition_id, query);
    } else {
      result = await typeRepo.findAndCount(query);
    }

    await this.cacheService_.set(cacheKey, result); // TTL of 1 hour

    return result;
  }
}

export default ProductTypeService

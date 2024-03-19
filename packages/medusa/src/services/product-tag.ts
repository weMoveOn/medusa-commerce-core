import { MedusaError } from "medusa-core-utils"
import { EntityManager, FindOptionsWhere, ILike } from "typeorm"
import { ProductTag } from "../models"
import { ProductTagRepository } from "../repositories/product-tag"
import { FindConfig, Selector } from "../types/common"
import { TransactionBaseService } from "../interfaces"
import { buildQuery, isString } from "../utils"
import { ICacheService } from "@medusajs/types"

type ProductTagConstructorProps = {
  manager: EntityManager
  productTagRepository: typeof ProductTagRepository
  cacheService: ICacheService;
}

class ProductTagService extends TransactionBaseService {
  protected readonly tagRepo_: typeof ProductTagRepository
  protected readonly cacheService_: ICacheService;
  constructor({ productTagRepository, cacheService }: ProductTagConstructorProps) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.tagRepo_ = productTagRepository
    this.cacheService_ = cacheService;
  }

  /**
   * Retrieves a product tag by id.
   * @param tagId - the id of the product tag to retrieve
   * @param config - the config to retrieve the tag by
   * @return the collection.
   */
  async retrieve(
    storeId: string,
    tagId: string,
    config: FindConfig<ProductTag> = {}
  ): Promise<ProductTag> {
    const tagRepo = this.activeManager_.withRepository(this.tagRepo_)

    const query = buildQuery({ id: tagId, store_id: storeId }, config)
    const tag = await tagRepo.findOne(query)

    if (!tag) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Product tag with id: ${tagId} was not found`
      )
    }

    return tag
  }

  /**
   * Creates a product tag
   * @param tag - the product tag to create
   * @return created product tag
   */
  async create(storeId: string, tag: Partial<ProductTag>): Promise<ProductTag> {
    return await this.atomicPhase_(async (manager: EntityManager) => {
      const tagRepo = manager.withRepository(this.tagRepo_)
      const productTag = tagRepo.create({ value: tag.value, store_id: storeId })
      return await tagRepo.save(productTag)
    })
  }

  /**
   * Lists product tags
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async list(
    selector: Selector<ProductTag> & {
      q?: string
      discount_condition_id?: string
    } = {},
    config: FindConfig<ProductTag> = { skip: 0, take: 20 }
  ): Promise<ProductTag[]> {
    const [tags] = await this.listAndCount(selector, config)
    return tags
  }

  /**
   * Lists product tags and adds count.
   * @param selector - the query object for find
   * @param config - the config to be used for find
   * @return the result of the find operation
   */
  async listAndCount(
    selector: Selector<ProductTag> & {
      q?: string
      discount_condition_id?: string
    } = {},
    config: FindConfig<ProductTag> = { skip: 0, take: 20 }
  ): Promise<[ProductTag[], number]> {
    const cacheKey = `productTags:${JSON.stringify(selector)}:${JSON.stringify(config)}`;
    let cachedResult = await this.cacheService_.get<[ProductTag[], number]>(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    const tagRepo = this.activeManager_.withRepository(this.tagRepo_)

    let q: string | undefined
    if (isString(selector.q)) {
      q = selector.q
      delete selector.q
    }

    let discount_condition_id
    if (selector.discount_condition_id) {
      discount_condition_id = selector.discount_condition_id
      delete selector.discount_condition_id
    }

    // if (!selector.store_id) {
    //   throw new MedusaError(
    //     MedusaError.Types.INVALID_DATA,
    //     `Store id must be provided`
    //   )
    // }
    const query = buildQuery(selector, config)
    query.where = query.where as FindOptionsWhere<ProductTag>

    if (q) {
      query.where.value = ILike(`%${q}%`)
    }

    let result: [ProductTag[], number];
    if (discount_condition_id) {
      result = await tagRepo.findAndCountByDiscountConditionId(discount_condition_id, query);
    } else {
      result = await tagRepo.findAndCount(query);
    }
    console.log("not cached data")

    await this.cacheService_.set(cacheKey, result);

    return result;
  }
}

export default ProductTagService

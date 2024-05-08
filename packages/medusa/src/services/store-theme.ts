import { isDefined, MedusaError } from "medusa-core-utils"
import { EntityManager } from "typeorm"
import { TransactionBaseService } from "../interfaces"
import { StoreTheme } from "../models"
import { StoreThemeRepository } from "../repositories/store_theme"
import { ListBucketsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

import { FindConfig, Selector } from "../types/common"
import { buildQuery } from "../utils"
import {CreateStoreTheme} from "../types/store-theme";
import { IAdminStoreThemeCreate } from "../interfaces/store-theme"

type InjectedDependencies = {
  manager: EntityManager
  storeThemeRepository: typeof StoreThemeRepository
}
const client = new S3Client({});

class StoreThemeService extends TransactionBaseService {
  protected readonly storeThemeRepo_: typeof StoreThemeRepository

  constructor({ storeThemeRepository }: InjectedDependencies) {
    // eslint-disable-next-line prefer-rest-params
    super(arguments[0])

    this.storeThemeRepo_ = storeThemeRepository
  }


  async create(req: any) {
    const adminBuilderRepository = this.activeManager_.withRepository(
      this.storeThemeRepo_
    )



    const command = new ListBucketsCommand({});

    const { Buckets } = await client.send(command);
    console.log("Buckets: ");
    console.log(Buckets.map((bucket) => bucket.Name).join("\n"));



    const createData: any = {};
    createData.store_id = "store_01HRC4WRAD4GVW41YVSEB00RNM"
    createData.name = "My New Shop"
    createData.is_published = false
    createData.serving_type = "bucket-only"
    createData.archive_path = "/theme/sp_01G1G5V239ENSZ5MV4JAR737BM.zip"
    createData.serving_path = "/theme/temp/sp_01G1G5V239ENSZ5MV4JAR737BM"
    try {
      console.log(createData,"createData")
        const data = adminBuilderRepository.create(createData)
        console.log(data, " = Service 42")
        const result = await adminBuilderRepository.save(data)
        console.log(result, " = Service 44")
        return result
    } catch (error: any) {
      throw error
    }
  }


  // async create(data: IAdminStoreThemeCreate): Promise<StoreTheme | never> {
  //   return await this.atomicPhase_(async (manager) => {
  //     const rrRepo = manager.withRepository(this.storeThemeRepo_)
  //
  //     const created = rrRepo.create(data)
  //
  //     return await rrRepo.save(created)
  //   })
  // }

  // async update(storeId: string, id: string, data: UpdateReturnReason): Promise<StoreTheme> {
  //   return await this.atomicPhase_(async (manager) => {
  //     const rrRepo = manager.withRepository(this.storeThemeRepo_)
  //     const reason = await this.retrieve(storeId, id)
  //
  //     for (const key of Object.keys(data).filter(
  //       (k) => typeof data[k] !== `undefined`
  //     )) {
  //       reason[key] = data[key]
  //     }
  //
  //     await rrRepo.save(reason)
  //
  //     return reason
  //   })
  // }

  /**
   * @param {Object} selector - the query object for find
   * @param {Object} config - config object
   * @return {Promise} the result of the find operation
   */
  // async list(
  //   selector: Selector<StoreTheme>,
  //   config: FindConfig<StoreTheme> = {
  //     skip: 0,
  //     take: 50,
  //     order: { created_at: "DESC" },
  //   }
  // ): Promise<StoreTheme[]> {
  //   const rrRepo = this.activeManager_.withRepository(this.storeThemeRepo_)
  //   const query = buildQuery(selector, config)
  //   return rrRepo.find(query)
  // }

  /**
   * Gets an order by id.
   * @param {string} returnReasonId - id of order to retrieve
   * @param {Object} config - config object
   * @return {Promise<Order>} the order document
   */
  // async retrieve(
  //   storeId: string,
  //   returnReasonId: string,
  //   config: FindConfig<StoreTheme> = {}
  // ): Promise<StoreTheme | never> {
  //   if (!isDefined(returnReasonId)) {
  //     throw new MedusaError(
  //       MedusaError.Types.NOT_FOUND,
  //       `"returnReasonId" must be defined`
  //     )
  //   }
  //
  //   const rrRepo = this.activeManager_.withRepository(this.storeThemeRepo_)
  //
  //   const query = buildQuery({ id: returnReasonId, store_id: storeId }, config)
  //   const item = await rrRepo.findOne(query)
  //
  //   if (!item) {
  //     throw new MedusaError(
  //       MedusaError.Types.NOT_FOUND,
  //       `Return Reason with id: ${returnReasonId} was not found.`
  //     )
  //   }
  //
  //   return item
  // }

  // async delete(storeId: string, returnReasonId: string): Promise<void> {
  //   return this.atomicPhase_(async (manager) => {
  //     const rrRepo = manager.withRepository(this.storeThemeRepo_)
  //
  //     // We include the relation 'return_reason_children' to enable cascading deletes of return reasons if a parent is removed
  //     const reason = await this.retrieve(storeId, returnReasonId, {
  //       relations: ["return_reason_children"],
  //     })
  //
  //     if (!reason) {
  //       return Promise.resolve()
  //     }
  //
  //     await rrRepo.softRemove(reason)
  //
  //     return Promise.resolve()
  //   })
  // }
}

export default StoreThemeService

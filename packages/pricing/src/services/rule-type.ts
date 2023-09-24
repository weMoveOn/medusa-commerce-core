import { Context, DAL, FindConfig, PricingTypes } from "@medusajs/types"
import {
  InjectManager,
  InjectTransactionManager,
  MedusaContext,
  ModulesSdkUtils,
  retrieveEntity,
} from "@medusajs/utils"
import { RuleType } from "@models"

import { doNotForceTransaction, shouldForceTransaction } from "@medusajs/utils"

type InjectedDependencies = {
  ruleTypeRepository: DAL.RepositoryService
}

export default class RuleTypeService<TEntity extends RuleType = RuleType> {
  protected readonly ruleTypeRepository_: DAL.RepositoryService

  constructor({ ruleTypeRepository }: InjectedDependencies) {
    this.ruleTypeRepository_ = ruleTypeRepository
  }

  @InjectManager("ruleTypeRepository_")
  async retrieve(
    ruleTypeId: string,
    config: FindConfig<PricingTypes.RuleTypeDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity> {
    return (await retrieveEntity<RuleType, PricingTypes.RuleTypeDTO>({
      id: ruleTypeId,
      identifierColumn: "id",
      entityName: RuleType.name,
      repository: this.ruleTypeRepository_,
      config,
      sharedContext,
    })) as TEntity
  }

  @InjectManager("ruleTypeRepository_")
  async list(
    filters: PricingTypes.FilterableRuleTypeProps = {},
    config: FindConfig<PricingTypes.RuleTypeDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await this.ruleTypeRepository_.find(
      this.buildQueryForList(filters, config),
      sharedContext
    )) as TEntity[]
  }

  @InjectManager("ruleTypeRepository_")
  async listAndCount(
    filters: PricingTypes.FilterableRuleTypeProps = {},
    config: FindConfig<PricingTypes.RuleTypeDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<[TEntity[], number]> {
    return (await this.ruleTypeRepository_.findAndCount(
      this.buildQueryForList(filters, config),
      sharedContext
    )) as [TEntity[], number]
  }

  private buildQueryForList(
    filters: PricingTypes.FilterableRuleTypeProps = {},
    config: FindConfig<PricingTypes.RuleTypeDTO> = {}
  ) {
    const queryOptions = ModulesSdkUtils.buildQuery<RuleType>(filters, config)

    if (filters.id) {
      queryOptions.where["id"] = { $in: filters.id }
    }

    return queryOptions
  }

  @InjectTransactionManager(shouldForceTransaction, "ruleTypeRepository_")
  async create(
    data: PricingTypes.CreateRuleTypeDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await this.ruleTypeRepository_.create(
      data,
      sharedContext
    )) as TEntity[]
  }

  @InjectTransactionManager(shouldForceTransaction, "ruleTypeRepository_")
  async update(
    data: PricingTypes.UpdateRuleTypeDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await this.ruleTypeRepository_.update(
      data,
      sharedContext
    )) as TEntity[]
  }

  @InjectTransactionManager(doNotForceTransaction, "ruleTypeRepository_")
  async delete(
    ids: string[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<void> {
    await this.ruleTypeRepository_.delete(ids, sharedContext)
  }
}

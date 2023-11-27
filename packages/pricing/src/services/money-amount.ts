import { Context, DAL, FindConfig, PricingTypes } from "@medusajs/types"
import {
  InjectManager,
  InjectTransactionManager,
  MedusaContext,
  ModulesSdkUtils,
  retrieveEntity,
} from "@medusajs/utils"
import { MoneyAmount } from "@models"
import { MoneyAmountRepository } from "@repositories"

import { doNotForceTransaction, shouldForceTransaction } from "@medusajs/utils"

type InjectedDependencies = {
  moneyAmountRepository: DAL.RepositoryService
}

export default class MoneyAmountService<
  TEntity extends MoneyAmount = MoneyAmount
> {
  protected readonly moneyAmountRepository_: DAL.RepositoryService

  constructor({ moneyAmountRepository }: InjectedDependencies) {
    this.moneyAmountRepository_ = moneyAmountRepository
  }

  @InjectManager("moneyAmountRepository_")
  async retrieve(
    moneyAmountId: string,
    config: FindConfig<PricingTypes.MoneyAmountDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity> {
    return (await retrieveEntity<MoneyAmount, PricingTypes.MoneyAmountDTO>({
      id: moneyAmountId,
      entityName: MoneyAmount.name,
      repository: this.moneyAmountRepository_,
      config,
      sharedContext,
    })) as TEntity
  }

  @InjectManager("moneyAmountRepository_")
  async list(
    filters: PricingTypes.FilterableMoneyAmountProps = {},
    config: FindConfig<PricingTypes.MoneyAmountDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await this.moneyAmountRepository_.find(
      this.buildQueryForList(filters, config),
      sharedContext
    )) as TEntity[]
  }

  @InjectManager("moneyAmountRepository_")
  async listAndCount(
    filters: PricingTypes.FilterableMoneyAmountProps = {},
    config: FindConfig<PricingTypes.MoneyAmountDTO> = {},
    @MedusaContext() sharedContext: Context = {}
  ): Promise<[TEntity[], number]> {
    return (await this.moneyAmountRepository_.findAndCount(
      this.buildQueryForList(filters, config),
      sharedContext
    )) as [TEntity[], number]
  }

  private buildQueryForList(
    filters: PricingTypes.FilterableMoneyAmountProps = {},
    config: FindConfig<PricingTypes.MoneyAmountDTO> = {}
  ) {
    const queryOptions = ModulesSdkUtils.buildQuery<MoneyAmount>(
      filters,
      config
    )

    if (filters.id) {
      queryOptions.where["id"] = { $in: filters.id }
    }

    return queryOptions
  }

  @InjectTransactionManager(shouldForceTransaction, "moneyAmountRepository_")
  async create(
    data: PricingTypes.CreateMoneyAmountDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await (this.moneyAmountRepository_ as MoneyAmountRepository).create(
      data,
      sharedContext
    )) as TEntity[]
  }

  @InjectTransactionManager(shouldForceTransaction, "moneyAmountRepository_")
  async update(
    data: PricingTypes.UpdateMoneyAmountDTO[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<TEntity[]> {
    return (await (this.moneyAmountRepository_ as MoneyAmountRepository).update(
      data,
      sharedContext
    )) as TEntity[]
  }

  @InjectTransactionManager(doNotForceTransaction, "moneyAmountRepository_")
  async delete(
    ids: string[],
    @MedusaContext() sharedContext: Context = {}
  ): Promise<void> {
    await this.moneyAmountRepository_.delete(ids, sharedContext)
  }
}

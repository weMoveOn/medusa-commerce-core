export interface IInventoryStore {
    id: string;
    name: string;
    slug: string;
    website: string;
}

export enum ProfitOperation {
    ADDITION = "addition",
    MULTIPLICATION = "multiplication",
    PERCENT = "percent",
  }

type ProfitOperationSelectOption = {
  label: string;
  value: ProfitOperation
}

type ProfitOperationSelectOption = {
  label: string;
  value: ProfitOperation
}

type CurrencyCodeSelectOption = {
  label: string;
  value: string;
  prefix: string;
}
  
export type PricingOptionFormType = {
    store_slug: string
    currency_code: CurrencyCodeSelectOption
    conversion_rate: number
    profit_amount: number
    shipping_charge: number
    profit_operation: ProfitOperationSelectOption
}

export type CreatePricingOptionFormType = {
  store_slug: string
  currency_code: string
  conversion_rate: number
  profit_amount: number
  shipping_charge: number
  profit_operation: ProfitOperation
}

export interface IPriceSetting {
    id: string;
    store_slug: string;
    currency_code: string;
    conversion_rate: number;
    profit_amount: number;
    shipping_charge: number;
    profit_operation: ProfitOperation;
  }
  
  export interface IPriceSettingReturnType {
    count: number
    filters: any
    limit: number
    message: string
    offset: number
    result: IPriceSetting[]
    statusCode: number
  }
  
  export interface ICreatePriceSettingReturnType {
    result: IPriceSetting
    message: string
    statusCode: number
  }
  
  export interface ICurrencyOptions {
    value: string
    label: string
    prefix: string
  }
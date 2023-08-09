export interface IInventoryProductDataType {
  // id: null | number
  // vpid: string
  // vendor: string | null
  // title: string | null
  // link: string
  // image: string
  // thumbnail: string
  // orders: number | null
  // stock: null | number | string
  // rating: number | null
  // rating_count: null | number
  // status: null | string
  // countdown: null | string | number
  // badge: null | string
  // price: number
  // discount: number | null
  // meta: null
  // wholesales: any[]
  // shipping_cost: null | number
  // slug: string
  // product_code: string
  // country_id: number
  // shop_id: number
  // fx: string

  id: null | number;
  shop_id: number;
  vpid: string;
  vendor: string;
  link: string;
  title: string;
  image: string;
  price: number;
  price_real: number;
  discount: number;
  special_price: null | number;
  special_discount: null | number;
  shipping_cost: null | number;
  orders: null | number;
  rating: null | number;
  rating_count: null | number;
  wholesales_price: null | number;
}

export interface IInventoryProductsPaginateType {
  per_page: number
  total: number
  current_page: number
  last_page: number
  prev_page: null | number
  next_page: null | number
  from: number
  to: number
}
export interface IInventoryProductsFilterType {
  keyword: string
  shop_id: number
  page?: number
}




// filters type declearation 
export interface ISorterValue {
  title: string;
  key: string;
  value: string;
  selected: boolean;
}

export interface ISorter {
  typeKey: string;
  orderKey: string;
  values: ISorterValue[];
}

export interface IConfiguratorPropertyValue {
  value: string;
  image: string | null;
  label: string;
  selected: boolean;
}

export interface IConfiguratorProperty<T extends string> {
  title: string;
  type: string;
  key: T;
  separator: string;
  values: IConfiguratorPropertyValue[];
}

export interface IAttrValue {
  value: string;
  image: string | null;
  label: string;
  selected: boolean;
  values?: IAttrValue[];
}

export interface IAttr<T extends string, U extends string> {
  title: string;
  type: string;
  key: T;
  separator: U;
  values: IAttrValue[];
}

export type PrType = IConfiguratorProperty<"pr">;
export type CidType = IConfiguratorProperty<"cid">;
export type FeaturesType = IConfiguratorProperty<"features">;

export interface IConfigurator {
  pr?: PrType;
  cid?: CidType;
  features?: FeaturesType;
  attr?: IAttr<string, string>;
  limit?: number;
  offset?: number;
}

export interface IFilters {
  sorter: ISorter;
  configurator: IConfigurator;
}

export interface IInventoryProductPayloadType {
  success: boolean
  message: string
  count:number; 
  limit:number; 
  offset:number; 
  filters:IFilters;
  products: IInventoryProductDataType[]
}

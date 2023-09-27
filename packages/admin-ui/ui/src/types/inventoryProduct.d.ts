export interface IInventoryProductDataType {
  id: string;
  shop_id: number;
  vpid: string;
  vendor: string;
  link: string;
  title: string;
  image: string;
  price: number;
  price_real: number;
  discount: number;
  special_price?: number;
  special_discount?: number;
  shipping_cost?: number;
  orders?: number;
  rating?: number;
  rating_count?: number;
  wholesales_price?: number;
  updated_at?: string
}

export interface IInventoryProductsPaginateType {
  per_page: number;
  total: number;
  current_page: number;
  last_page: number;
  prev_page: null | number;
  next_page: null | number;
  from: number;
  to: number;
}
export interface IInventoryProductsFilterType {
  keyword: string;
  shop_id: number;
  page?: number;
}

export interface IInventoryProductSelectType {
  vpid: string;
  link: string;
  title: string;
  image: string;
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
  image: string | null;
  label: string;
  selected: boolean;
  value: string;
  values?: IConfiguratorPropertyValue[];
  open?: boolean;
}

export interface IConfiguratorProperty<T extends string> {
  title: string;
  type: string;
  key: T;
  separator: string;
  values: IConfiguratorPropertyValue[];
  open?: boolean;
}

type PrType = IConfiguratorProperty<"pr">;
type CidType = IConfiguratorProperty<"cid">;
type FeaturesType = IConfiguratorProperty<"features">;
type IAttrType = IConfiguratorProperty<"features">;


export interface IConfigurator {
  pr?: PrType;
  cid?: CidType;
  features?: FeaturesType;
  attr?: IAttrType;
  limit?: number;
  offset?: number;
}

export interface IFilters {
  shop: ISorter;
  sorter: ISorter;
  configurator: IConfigurator;
}

export interface IInventoryProductPayloadType {
  success: boolean;
  message: string;
  count: number; 
  limit: number; 
  offset: number; 
  filters: IFilters | null;
  products: IInventoryProductDataType[];
}

type prTypeValues = { 
  tag: 'max' | 'min'
  val: string
}

export interface IInventoryQuery {
  pr?: string | prTypeValues;
  cid?: string;
  attr?: string;
  features?: string;
  limit?: number;
  offset?: number;
}

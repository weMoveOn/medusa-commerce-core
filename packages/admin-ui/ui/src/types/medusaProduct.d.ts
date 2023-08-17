interface Tag {
    value: string;
    id: string;
  }
  
  interface SalesChannel {
    id: string;
  }
  
  interface Category {
    id: string;
  }
  
  interface Price {
    amount: number;
    region_id: string;
    currency_code: string;
    min_quantity: number;
    max_quantity: number;
  }
  
  interface Option {
    value: string;
  }
  
  interface Variant {
    title: string;
    sku: string;
    ean: string;
    upc: string;
    barcode: string;
    hs_code: string;
    inventory_quantity: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    weight: number;
    length: number;
    height: number;
    width: number;
    origin_country: string;
    mid_code: string;
    material: string;
    metadata: Record<string, any>;
    prices: Price[];
    options: Option[];
  }
  
 export interface IMedusaProductType {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    is_giftcard: boolean;
    discountable: boolean;
    images: string[];
    thumbnail: string;
    handle: string;
    status: 'draft' | 'published'; // Add other status values if needed
    type: {
      value: string;
      id: string;
    };
    collection_id: string;
    tags: Tag[];
    sales_channels: SalesChannel[];
    categories: Category[];
    options: Option[];
    variants: Variant[];
    weight: number;
    length: number;
    height: number;
    width: number;
    hs_code: string;
    origin_country: string;
    mid_code: string;
    material: string;
    metadata: Record<string, any>;
    updated_at: string
  }
  

  export interface IRetriveInventoryProductReturnType {
    products: IMedusaProductType[];
    offset: number;
    limit: number;
    count: number;
  }
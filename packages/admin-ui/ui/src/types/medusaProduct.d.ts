import { Product } from "@medusajs/medusa";
  export interface IRetrieveInventoryProductReturnType {
    products: Product[];
    offset: number;
    limit: number;
    count: number;
  }
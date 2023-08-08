interface IMoveonInventoryPrice {
  offer: number;
  actual: number;
  currency: string | null;
  preorder: string | null;
}

interface IMoveonInventoryStock {
  min: number | null;
  limit: number;
  available: number;
}

interface IMoveonInventorySku {
  id: string;
  price: IMoveonInventoryPrice;
  props: string;
  stock: IMoveonInventoryStock;
}

interface IMoveonInventoryValue {
  id: string;
  name: string;
  color: string | null;
  image: string | null;
  thumb: string | null;
  title: string;
}
interface IMoveonInventoryProps {
  id: string;
  name: string;
  values: IMoveonInventoryValue[];
}

interface IMoveonInventorySpecification { 
  label:{ 
    id:number; 
    name:string; 
  }, 
  value:{ 
    id:number; 
    name:string; 
  }
}

// Interface for the entire data structure
export interface IProductDetailsResponseData{   
    id:number; 
    shop_id:number; 
    vid:string;
    seller_id:number;
    vendor:string; 
    title:string; 
    description : null | string; 
    price:{ 
      discount:{ 
        max:null | null; 
        min:null | number; 
      },
      original:{ 
        max:number; 
        min:number; 
      }
    };
    stock:number; 
    sales:number; 
    link:string; 
    image:string; 
    meta:{ 
      vendor:string; 
      videos:{url:string; preview:string}[]; 
      product_id:string; 
    }; 
    
    gallery:{ 
      url:string; 
      thumb:string; 
      title:string | null; 
    }[]; 
    ratings:null | string | number; 
    ratings_count:null | string | number; 
    ratings_average:null | string ; 
    created_at:string; 
    updated_at:string ; 
    shop:{ 
      id: number; 
      name:string; 
      url: string ;
      identifier:string; 
      country_code:string; 
      currency_code:string; 
      currency_symbol:string; 
      fx:string; 
    }; 
    seller:{ 
      id:number; 
      name:string; 
      vendor:string; 
      vendor_id:string; 
      link:string; 
      description:string;  
      meta:null; 
      opened_at:null | string; 
    }; 
    categories:{ 
    id:number; 
    name:string; 
    
    }[];
    specifications: IMoveonInventorySpecification[];
    variation:{
      skus: IMoveonInventorySku[] | null;
      props: IMoveonInventoryProps[] | null;
    }
  
    }
    
    export interface IProductDetailsResponse{ 
      status:string; 
      code:number; 
      message:string; 
      data:IProductDetailsResponseData
    }


    export {IMoveonInventoryProps, IMoveonInventorySpecification, IProductDetailsResponseData, IProductDetailsResponse}
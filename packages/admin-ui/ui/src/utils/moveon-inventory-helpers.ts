import { IMoveonInventoryProps } from "../types/inventory-product-details";

class MoveonInventoryHelpers {
  static checkIfSizeVariantExists(props: IMoveonInventoryProps[] | null): boolean {
    if (props === null) {
      return false;
    }
  
    return props.some((prop) => prop.name.toLowerCase().includes("size"));
  }

  static getNameForSizeIds(ids: string, props: IMoveonInventoryProps[] | null): string | null {
    if (props === null) {
      return null;
    }
    const sizeProp = props.find((prop) => prop.name.toLowerCase().includes("size"));
    if (!sizeProp) {
      return null;
    }

    const sizeVariants = sizeProp.values.filter((value) => ids.includes(value.id));
  
    const validVariant = sizeVariants.find((variant) => variant.title || variant.name);
    return validVariant ? validVariant.title || validVariant.name : null;
  }

  static getNameForColorIds(ids: string, props: IMoveonInventoryProps[] | null): string | null {
    if (props === null) {
      return null;
    }
    const colorProp = props.find((prop) => prop.name.toLowerCase().includes("color"));
    if (!colorProp) {
      return null;
    }
  
    const colorVariants = colorProp.values.filter((value) => ids.includes(value.id));
  
    const validVariant = colorVariants.find((variant) => variant.title || variant.name);
    return validVariant ? validVariant.title || validVariant.name : null;
  }
}

export default MoveonInventoryHelpers;

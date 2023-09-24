import React, { useMemo, useState } from "react";
import { ISorter } from "../../../types/inventoryProduct";
import { filterForTemporal } from "../../../utils/filterFixedData";
import { NextSelect } from "../../molecules/select/next-select";


interface IInventoryProductSortByShopProps {
  sorter: ISorter;
  onChange: (value: { value: string; label: string }) => void;
  selectedValue:{value: string; label: string} | null
}

const InventoryProductSortByShop: React.FC<IInventoryProductSortByShopProps> = ({
  sorter,
  onChange,
  selectedValue
}) => {
  const [sortState, setSortState] = useState<ISorter>(
    sorter || filterForTemporal.shop
  );
 

  const sortOptions = useMemo(() => {
    return (
      sortState.values.map((s) => ({
        value: s.value,
        label: s.title,
      })) || []
    );
  }, [sortState]);

  return (
    <div className="w-[200px] cursor-pointer">
      <NextSelect
        value={selectedValue}
        placeholder="Sort by Shop"
        name="sort"
        selectedPlaceholder=""
       
        onChange={(value) => {
          if(value){ 
             onChange(value); 
          }         
        }}
        options={sortOptions}
      />
    </div>
  );
};

export default InventoryProductSortByShop;

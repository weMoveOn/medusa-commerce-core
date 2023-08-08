import React, { useMemo, useState } from "react";
import { ISorter } from "../../../types/inventoryProduct";
import { filterForTemporal } from "../../../utils/date-utils";
import { NextSelect } from "../../molecules/select/next-select";


interface IInventoryProductSortProps {
  sorter: ISorter;
  onChange: (value: { value: string; label: string }) => void;
  selectedValue:{value: string; label: string} | null
}

const InventoryProductSort: React.FC<IInventoryProductSortProps> = ({
  sorter,
  onChange,
  selectedValue
}) => {
  const [sortState, setSortState] = useState<ISorter>(
    sorter || filterForTemporal.sorter
  );
 

  const sortOptions = useMemo(() => {
    return (
      sortState.values.map((s) => ({
        value: s.value+"&"+s.title,
        label: s.title,
      })) || []
    );
  }, [sortState]);

  return (
    <div className="w-[200px]">
      <NextSelect
        value={selectedValue}
        placeholder="Sort by"
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

export default InventoryProductSort;

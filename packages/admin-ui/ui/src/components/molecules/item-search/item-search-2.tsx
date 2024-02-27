import {
  AdminGetInventoryItemsParams,
  DecoratedInventoryItemDTO,
} from "@medusajs/medusa"
import { ControlProps, OptionProps, SingleValue } from "react-select"

import Control from "../select/next-select/components/control"
import { NextSelect } from "../select/next-select"
import SearchIcon from "../../fundamentals/icons/search-icon"
import {
  useAdminInventoryItems,
  useAdminProduct,
  useAdminProducts,
  useAdminVariants,
} from "medusa-react"
import { useDebounce } from "../../../hooks/use-debounce"
import { useEffect, useState } from "react"
import Table from "../table"
import TableContainer from "../../organisms/table-container"
import RMASelectProductSubModal from "../../../domain/orders/details/rma-sub-modals/products"
import Items2 from "../../../domain/orders/new/components/items2"
import RMASelectProductSubModal2 from "../../../domain/orders/details/rma-sub-modals/products2"
import Table2 from "../table/table-2"
// import TableContainer from "../../../../components/organisms/table-container"


type Props = {
  onItemSelect: (item: DecoratedInventoryItemDTO) => void
  clearOnSelect?: boolean
  filters?: AdminGetInventoryItemsParams
  placeholder?: string
}

type ItemOption = {
  label: string | undefined
  value: string | undefined
  inventoryItem: DecoratedInventoryItemDTO
}

const ItemSearch2 = ({
  onItemSelect,
  clearOnSelect,
  filters = {},
  placeholder,
}: Props) => {
  const [itemSearchTerm, setItemSearchTerm] = useState<string | undefined>()

  const debouncedItemSearchTerm = useDebounce(itemSearchTerm, 500)

  const queryEnabled = !!debouncedItemSearchTerm?.length

  // const { isLoading, products } = useAdminProducts()

  const { isLoading,variants } = useAdminVariants()
  // console.log("variants ->", variants)

  // console.log("products ->", )

  const onChange = (item: SingleValue<ItemOption>) => {
    if (item) {
      onItemSelect(item.inventoryItem)
    }
  }
  useEffect(()=>{},[variants])

  const options = variants?.map((variant) => ({
    label: variant.product?.title,
    value: "100",
    inventoryItem: {
      sku: variant.sku,
      stocked_quantity: variant.inventory_quantity,
    },
  })) as ItemOption[]

  const filterOptions = () => true

  return (
    <div>
      {/* <NextSelect
        isMulti={true}
        components={{ Option: ProductOption, Control: SearchControl }}
        // onInputChange={setItemSearchTerm}
        options={options}
        placeholder={placeholder ?? "Search by sku..."}
        isSearchable={true}
        noOptionsMessage={() => "No items found"}
        // openMenuOnClick={!!inventory_items?.length}
        // onChange={onChange}
        value={null}
        isLoading={queryEnabled && isLoading}
        // TODO: Remove this when we can q for inventory item titles
      /> */}
      <RMASelectProductSubModal2
        selectedItems={variants || []}
        onSubmit={()=> {}}
      />
    </div>
  )
}

const SearchControl = ({ children, ...props }: ControlProps<ItemOption>) => (
  <Control {...props}>
    <span className="mr-4">
      <SearchIcon size={16} className="text-grey-50" />
    </span>
    {children}
  </Control>
)

const ProductOption = ({ innerProps, data }: OptionProps<ItemOption>) => {
  console.log("data ->", data)
  return (
    <div
      {...innerProps}
      className="text-small grid w-full cursor-pointer grid-cols-2 place-content-between px-4 py-2 transition-all hover:bg-gray-50"
    >
      <div>
        <p>{data.label}</p>
        <p className="text-grey-50">{data.inventoryItem.sku}</p>
      </div>
      <div className="text-right">
        <p className="text-grey-50">{`${data.inventoryItem.stocked_quantity} stock`}</p>
        <p className="text-grey-50">{`${
          data.inventoryItem.stocked_quantity -
          data.inventoryItem.reserved_quantity
        } available`}</p>
      </div>

    </div>
  )
}

export default ItemSearch2

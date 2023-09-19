import RadioGroup from "../../../../components/organisms/radio-group"
import { IInventoryStore } from "../../../../types/inventory-price-setting"

type Props = {
  store: IInventoryStore
}

const StoreCard = ({ store }: Props) => {
  return (
    <RadioGroup.Item
      value={store.id}
      label={store.name}
      sublabel={
        store.website? store.website
          : undefined
      }
    />
  )
}

export default StoreCard

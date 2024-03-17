import { Product, ProductVariant, Region } from "@medusajs/medusa"
import clsx from "clsx"
import React, { useContext, useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/fundamentals/button"
import MinusIcon from "../../../../components/fundamentals/icons/minus-icon"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"
import TrashIcon from "../../../../components/fundamentals/icons/trash-icon"
import ImagePlaceholder from "../../../../components/fundamentals/image-placeholder"
import InputField from "../../../../components/molecules/input"
import { LayeredModalContext } from "../../../../components/molecules/modal/layered-modal"
import { SteppedContext } from "../../../../components/molecules/modal/stepped-modal"
import Table from "../../../../components/molecules/table"
import {
  displayAmount,
  extractUnitPrice,
  getNativeSymbol,
  persistedPrice,
} from "../../../../utils/prices"
import RMASelectProductSubModal from "../../details/rma-sub-modals/products"
import { useNewOrderForm } from "../form"
import CustomItemSubModal from "./custom-item-sub-modal"
import { useMedusa } from "medusa-react"

const MsItems = () => {
  const { t } = useTranslation()
  const { enableNextPage, disableNextPage, nextStepEnabled } =
    React.useContext(SteppedContext)

  const {
    context: { region, items },
    form: { control, register, setValue },
  } = useNewOrderForm()

  const { client } = useMedusa()

  const { fields, append, remove, update } = items

  const [editQuantity, setEditQuantity] = useState(-1)
  const [editPrice, setEditPrice] = useState(-1)

  const layeredContext = useContext(LayeredModalContext)

  const addItem = async (variants: ProductVariant[]) => {
    const ids = fields.map((field) => field.variant_id)

    const itemsToAdd = variants.filter((v) => !ids.includes(v.id))

    const variantIds = itemsToAdd.map((v) => v.id)

    const { variants: newVariants } = await client.admin.variants.list({
      id: variantIds,
      region_id: "reg_01HNF6G6NF7DG4V5QHN2CV5HA4",
    })

    append(
      newVariants.map((item) => ({
        quantity: 1,
        variant_id: item.id,
        title: item.title as string,
        unit_price: extractUnitPrice(item, region as Region, false),
        product_title: (item.product as Product)?.title,
        thumbnail: (item.product as Product)?.thumbnail,
      }))
    )

    if (!nextStepEnabled) {
      enableNextPage()
    }
  }

  const handleEditQuantity = (index: number, value: number) => {
    const field = fields[index]
    field.quantity = field.quantity + value

    if (field.quantity > 0) {
      update(index, field)
    }
  }

  const handlePriceChange = (
    index: number,
    value: number,
    currency: string
  ) => {
    const dbPrice = persistedPrice(currency, value)
    setValue(`items.${index}.unit_price`, dbPrice)
  }

  const addCustomItem = (title: string, quantity: number, amount: number) => {
    append({
      title,
      unit_price: amount,
      quantity: quantity,
    })

    if (!nextStepEnabled) {
      enableNextPage()
    }
  }

  const removeItem = (index: number) => {
    remove(index)

    if (nextStepEnabled && items.fields.length < 1) {
      disableNextPage()
    }
  }

  useEffect(() => {
    if (items.fields.length) {
      enableNextPage()
    } else {
      disableNextPage()
    }
  }, [])

  return (
    <div className="flex min-h-[705px] flex-col pt-4">
      <span className="inter-base-semibold mb-4">
        {t("components-items-for-the-order", "Items for the order")}
      </span>
      <div className="gap-x-xsmall mt-3 flex w-full justify-end">
        <Button
          variant="ghost"
          size="small"
          className="border-grey-20 border"
          onClick={() => {
            layeredContext.push(
              SelectProductsScreen(
                layeredContext.pop,
                items.fields.map((item) => ({ id: item.variant_id })),
                addItem,
                t
              )
            )
          }}
        >
          <PlusIcon size={20} />
          {t("components-add-existing", "Add Existing")}
        </Button>
      </div>
    </div>
  )
}

const SelectProductsScreen = (pop, itemsToAdd, setSelectedItems, t) => {
  return {
    title: t("components-add-products", "Add Products"),
    onBack: () => pop(),
    view: (
      <RMASelectProductSubModal
        selectedItems={itemsToAdd || []}
        onSubmit={setSelectedItems}
      />
    ),
  }
}

export default MsItems

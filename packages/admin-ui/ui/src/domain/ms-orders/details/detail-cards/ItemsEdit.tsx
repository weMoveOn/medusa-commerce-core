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
import RMASelectProductSubModal from "../rma-sub-modals/products"
import { useNewOrderForm } from "../../new/form"
import CustomItemSubModal from "../../new/components/custom-item-sub-modal"
import { useMedusa } from "medusa-react"

const ItemsEdit = () => {
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
      region_id: region?.id,
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

    if (nextStepEnabled && [].length < 1) {
      disableNextPage()
    }
  }

  useEffect(() => {
    if ([].length) {
      enableNextPage()
    } else {
      disableNextPage()
    }
  }, [])
  const fieldsItems = [
    {
      quantity: 1,
      variant_id: "variant_01HPB2Y1VK4Q1XPEMBCZ6SJ0KM",
      title: "S / White",
      unit_price: 2200,
      product_title: "Medusa T-Shirt",
      thumbnail:
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
      id: "bf60e83b-e3f7-4fe5-8e94-7b19e0abd902",
    },
    {
      quantity: 1,
      variant_id: "variant_01HPB2Y1VSTR2QW40VKYW2AJSG",
      title: "M / Black",
      unit_price: 2200,
      product_title: "Medusa T-Shirt",
      thumbnail:
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
      id: "36d258a1-3798-466a-a081-9e30d57d083d",
    },
    {
      quantity: 1,
      variant_id: "variant_01HPB2Y1VZ0AR812MPCPAYXSM8",
      title: "M / White",
      unit_price: 2200,
      product_title: "Medusa T-Shirt",
      thumbnail:
        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/tee-black-front.png",
      id: "80ddf88a-fe86-4668-b2d0-167f7b9ce650",
    },
  ]
  return (
    <div className="flex  flex-col pt-4">
      {true && (
        <Table className="rounded-lg border p-3 ">
          <Table.Head className="border">
            <Table.HeadRow className="text-grey-50 inter-small-semibold ">
              <Table.HeadCell>
                {t("components-item-name", "Item Name")}
              </Table.HeadCell>
              <Table.HeadCell className="pr-8 text-center ">
                {t("components-item-price", "Item Price")}
              </Table.HeadCell>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell className="pr-8 text-center ">
                {t("components-quantity", "Quantity")}
              </Table.HeadCell>
              <Table.HeadCell className="text-center ">
                {t("components-total-price", "Total Price")}
              </Table.HeadCell>
            </Table.HeadRow>
          </Table.Head>
          <Table.Body>
            {fieldsItems?.map((item, index) => {
              return (
                <Table.Row
                  key={item.id}
                  className={clsx("border-b-grey-0 hover:bg-grey-0")}
                >
                  <Table.Cell>
                    <div className="flex min-w-[240px] items-center py-2">
                      <div className="h-[40px] w-[30px] ">
                        {item.thumbnail ? (
                          <img
                            className="h-full w-full rounded object-cover"
                            src={item.thumbnail}
                          />
                        ) : (
                          <ImagePlaceholder />
                        )}
                      </div>
                      <div className="inter-small-regular text-grey-50 ml-4 flex flex-col">
                        {item.product_title && (
                          <span className="text-grey-90">
                            {item.product_title}
                          </span>
                        )}
                        <span>{item.title}</span>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="w-32 pr-8 text-center ">
                    <span>{item.unit_price}</span>
                  </Table.Cell>
                  <Table.Cell className="text-grey-40 pr-1 text-center ">
                    X
                  </Table.Cell>
                  <Table.Cell className="text-center ">
                    <span>{item.quantity}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      variant="ghost"
                      size="small"
                      onClick={() => removeItem(index)}
                    >
                      <TrashIcon size={20} className="text-grey-50" />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      )}
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

const CreateCustomProductScreen = (pop, onSubmit, region, t) => {
  return {
    title: t("components-add-custom-item", "Add Custom Item"),
    onBack: () => pop(),
    view: <CustomItemSubModal onSubmit={onSubmit} region={region} />,
  }
}

export default ItemsEdit

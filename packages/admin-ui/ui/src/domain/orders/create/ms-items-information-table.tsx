import clsx from "clsx"
import ImagePlaceholder from "../../../components/fundamentals/image-placeholder"
import Table from "../../../components/molecules/ms-table"
import MinusIcon from "../../../components/fundamentals/icons/minus-icon"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import Button from "../../../components/fundamentals/button"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import { useTranslation } from "react-i18next"
import { useNewOrderForm } from "../new/form"
import { useState } from "react"

type ProductVariant = {
  quantity: number
  variant_id: string
  title: string
  unit_price: number
  product_title: string
  thumbnail: string
}

type MsItemsInformationTableProps = {
  items: any[]
}

const MsItemsInformationTable = ({
  items: addedItems,
}: MsItemsInformationTableProps) => {
  const { t } = useTranslation()
  // const {register} = useForm()

  const {
    context: { region, items },
    form: { control, register, setValue },
  } = useNewOrderForm()

  const { fields, append, remove, update } = items

  const [editQuantity, setEditQuantity] = useState(-1)

  const handleEditQuantity = (index: number, value: number) => {
    if (editQuantity !== -1) {
      setValue(`items.${editQuantity}.quantity`, fields[editQuantity].quantity)
    }
    const field = fields[index]
    field.quantity = field.quantity + value

    if (field.quantity > 0) {
      update(index, field)
    }
  }

  return (
    <>
      {/* Selected Item Table */}
      <Table className="rounded-rounded mb-4 overflow-hidden px-4 shadow-md">
        <Table.Head>
          <Table.HeadRow className="bg-grey-100 border-t font-bold">
            <Table.HeadCell className="pl-2">Item Name</Table.HeadCell>
            <Table.HeadCell className="pr-8 text-left">
              Item Price
            </Table.HeadCell>
            <Table.HeadCell className="pr-8 text-center">
              Quantity
            </Table.HeadCell>
            <Table.HeadCell className="">Total Price</Table.HeadCell>
            <Table.HeadCell className="">{/* Total Price */}</Table.HeadCell>
            <Table.HeadCell className="">{/* Total Price */}</Table.HeadCell>
            <Table.HeadCell className="">{/* Total Price */}</Table.HeadCell>
            <Table.HeadCell className="">{/* Total Price */}</Table.HeadCell>
          </Table.HeadRow>
        </Table.Head>
        <Table.Body>
          {addedItems.map((item, index) => {
            return (
              <Table.Row
                key={index}
                className={clsx("border-b-grey-0 hover:bg-grey-0")}
              >
                <Table.Cell className="pl-2">
                  <div className="flex min-w-[240px] items-center py-2">
                    <div className="h-[40px] w-[30px] ">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt="product thumbnail"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </div>
                    <div className="inter-small-regular text-grey-50 ml-4 flex flex-col">
                      <span className="text-grey-90">{item.product_title}</span>

                      <span>{item.title}</span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className="">
                    <span>{item.unit_price}</span>
                  </div>
                </Table.Cell>
                <Table.Cell className="w-32 pr-8 text-right">
                  <div className="text-grey-50 flex w-full justify-end text-right ">
                    <span
                      onClick={() => handleEditQuantity(index, -1)}
                      className="hover:bg-grey-20 mr-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded"
                    >
                      <MinusIcon size={16} />
                    </span>
                    <button
                      type="button"
                      className="hover:bg-grey-20 cursor-pointer rounded px-1"
                      onClick={() => setEditQuantity(index)}
                    >
                      <input
                        type="number"
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        className="text-grey-90 w-full bg-transparent text-center"
                        disabled
                      />
                    </button>
                    <span
                      onClick={() => handleEditQuantity(index, 1)}
                      className={clsx(
                        "hover:bg-grey-20 ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded"
                      )}
                    >
                      <PlusIcon size={16} />
                    </span>
                  </div>
                </Table.Cell>
                <Table.Cell className="pr-2 text-right">500 BDT</Table.Cell>
                {/* <Table.Cell className="text-grey-40 pr-1 text-right">
                  BDT
                </Table.Cell> */}
                <Table.Cell className="flex items-center justify-end">
                  <Button
                    variant="ghost"
                    size="small"
                    className="mt-6"
                    onClick={() => remove(item.id)}
                  >
                    <TrashIcon size={20} className="text-grey-50" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
      {/* Selected product table end */}
    </>
  )
}

export default MsItemsInformationTable

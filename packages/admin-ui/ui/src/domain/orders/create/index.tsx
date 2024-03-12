import { useContext, useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Spacer from "../../../components/atoms/spacer"
import WidgetContainer from "../../../components/extensions/widget-container"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../../components/organisms/body-card"
import { useWidgets } from "../../../providers/widget-provider"
import Button from "../../../components/fundamentals/button"
// import ItemSearch2 from "../../../components/molecules/item-search-2"
import BackButton from "../../../components/atoms/back-button"
import SelectRegionScreen from "../new/components/ms-select-region"
import NewOrderFormProvider, { useNewOrderForm } from "../new/form"
import Select from "../../../components/molecules/select"
import { Option } from "../../../types/shared"
import { Controller, useWatch } from "react-hook-form"
import {
  useAdminCustomer,
  useAdminCustomers,
  useAdminOrder,
} from "medusa-react"
import Medusa from "../../../services/api"
import MsNote from "../../../components/organisms/ms-note"
import SelectShippingMethod from "../new/components/select-shipping"
import qs from "qs"
import AddCustomProductModal from "./add-custom-product-modal"
import CreateNewCustomerModal from "./create-new-customer-modal"
import {
  NextCreateableSelect,
  NextSelect,
} from "../../../components/molecules/select/next-select"
import { Pencil } from "@medusajs/icons"
import { Customer } from "@medusajs/medusa"
import AddressDetailsCard from "./address-details-card"
import SummaryCard from "../ms-details/detail-cards/ms-summary"
import MsItemSearch from "../../../components/molecules/ms-item-search"
import AddressDetails from "./address-details"
import Items from "../new/components/items"
import Table from "../../../components/molecules/table"
import ImagePlaceholder from "../../../components/fundamentals/image-placeholder"
import InputField from "../../../components/molecules/input"
import MinusIcon from "../../../components/fundamentals/icons/minus-icon"
import clsx from "clsx"
import TrashIcon from "../../../components/fundamentals/icons/trash-icon"
import MsItemsInformationTable from "./ms-items-information-table"
import SelectProductScreen from "../new/components/ms-select-product"
import Input from "../../../components/molecules/select/next-select/components/input"
import Modal from "../../../components/molecules/modal"
import NewOrder from "../new/new-order"
import MsNewOrder from "../new/ms-new-order"
import { SteppedContext } from "../../../components/molecules/modal/stepped-modal"
import MsSummaryCard from "../ms-details/detail-cards/ms-summary"

type ProductVariant = {
  quantity: number
  variant_id: string
  title: string
  unit_price: number
  product_title: string
  thumbnail: string
}[]

const VIEWS = ["Products"]

const OrderCrateIndex = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const view = "Products"

  const [items, setItems] = useState<ProductVariant>([])

  // console.log("items :>> ", items)

  const [showNewOrder, setShowNewOrder] = useState(false)
  const { order, isLoading } = useAdminOrder("order_01HPXVZTVWSWY43WM4SGD4XXXW")
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false)
  const [showAddedCustomerDetailsModal, setShowAddedCustomerDetailsModal] =
    useState(false)
  const [openAddCustomProductModal, setOpenAddCustomProductModal] =
    useState(false)
  const { customers } = useAdminCustomers()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const [showProductSearchModal, setShowProductSearchModal] = useState(false)

  const { getWidgets } = useWidgets()
  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

  // const {context} = useNewOrderForm()
  // console.log("form :>> ", form)
  // console.log("context :>> ", context)

  const debouncedFetch = async (filter: string): Promise<Option[]> => {
    const prepared = qs.stringify(
      {
        q: filter,
        offset: 0,
        limit: 10,
      },
      { skipNull: true, skipEmptyString: true }
    )

    return await Medusa.customers
      .list(`?${prepared}`)
      .then(({ data }) =>
        data.customers.map(({ id, first_name, last_name, email }) => ({
          label: `${first_name || ""} ${last_name || ""} (${email})`,
          value: id,
        }))
      )
      .catch(() => [])
  }

  const selectedCustomerRowData = useWatch({
    control: form.control,
    name: "customer_id",
  })
  const { customer } = useAdminCustomer("cus_01HPXQWGB4GP7AZNRR8963WW5M")

  useEffect(() => {
    if (selectedCustomerRowData && customers) {
      const selected = customers.find(
        (c) => c.id === selectedCustomerRowData.id
      )
      if (selected) {
        setSelectedCustomer(selected)
      }
    }
  }, [selectedCustomerRowData])

  const onCustomerSelect = (val: Option) => {
    const email = /\(([^()]*)\)$/.exec(val?.label)

    if (email) {
      form.setValue("email", email[1])
    } else {
      form.setValue("email", "")
    }
  }

  const addProductAction = useMemo(() => {
    return [
      <div className="flex space-x-2">
        <Button
          className={"border-0"}
          key="order_create"
          variant="secondary"
          size="small"
          onClick={() => setOpenAddCustomProductModal(true)}
        >
          <PlusIcon size={20} />
          Add Custom product
        </Button>
      </div>,
    ]
  }, [])

  const addCustomerActions = useMemo(() => {
    let content = ""
    let icon = null
    let action = null
    if (!selectedCustomer) {
      content = "Add new customer"
      icon = <PlusIcon size={20} />
      action = () => setOpenCreateCustomerModal(true)
    } else {
      content = "Edit"
      icon = <Pencil />
      action = () => setShowAddedCustomerDetailsModal(true)
    }
    return (
      <div className="flex space-x-2">
        <Button
          className={"border-0"}
          key="order_create"
          variant="secondary"
          size="small"
          onClick={action}
        >
          {icon}
          {content}
        </Button>
      </div>
    )
  }, [selectedCustomer])

  const onItemSelect = () => {}

  const options =
    customers &&
    customers.map((customer) => ({
      label: customer.first_name,
      value: customer.email,
      id: customer.id,
    }))

  return (
    <div className="gap-y-xsmall flex h-full grow flex-col">
      <BackButton
        path="/a/orders"
        label="Create Manual Order"
        className="mb-xsmall text-large"
      />
      {getWidgets("draft_order.list.before").map((Widget, i) => {
        return (
          <WidgetContainer
            key={i}
            entity={null}
            injectionZone="draft_order.list.before"
            widget={Widget}
          />
        )
      })}
      <div className="grid grid-cols-12  gap-4">
        <div className="col-span-8">
          <div className="h-full w-full">
            <BodyCard
              compact={true}
              title={"Products"}
              customActionable={addProductAction}
              className="h-fit"
            >
              <div className="flex w-full items-center justify-between gap-4">
                <div
                  className="w-5/6"
                  onClick={() => setShowProductSearchModal(true)}
                >
                  <InputField
                    className=""
                    placeholder="Find products from inventory..."
                  />
                </div>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => setShowProductSearchModal(true)}
                  >
                    Find Products
                  </Button>
                </div>
              </div>
              <MsItemsInformationTable items={items} />
            </BodyCard>
            <BodyCard
              compact={true}
              title={"Shipping method"}
              className="my-4 h-fit"
            >
              <SelectShippingMethod />
            </BodyCard>
          </div>
        </div>
        <div className="col-span-4">
          <BodyCard
            compact={true}
            title={"Customer Information"}
            actionables={[]}
            className="h-fit rounded-b-none pb-4"
          >
            <SelectRegionScreen />
          </BodyCard>

          <BodyCard
            compact={true}
            title={selectedCustomer ? "Added Customer" : "Add Customer"}
            customActionable={addCustomerActions}
            className="h-fit rounded-t-none pb-4"
          >
            {!selectedCustomer ? (
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field: { value, onChange, onBlur, ref, name } }) => {
                  return (
                    <NextSelect
                      placeholder={t(
                        "create-order-find-existing-customer",
                        "Find Existing Customer..."
                      )}
                      name={name}
                      options={options}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      components={{
                        Option: CustomerOption,
                      }}
                    />
                  )
                }}
              />
            ) : (
              <AddressDetails />
            )}
          </BodyCard>

          {order && (
            <MsSummaryCard order={order} reservations={[]} editable={false} />
          )}

          {order && <MsNote orderId={order.id} />}
        </div>
      </div>
      {getWidgets("draft_order.list.after").map((Widget, i) => {
        return (
          <WidgetContainer
            key={i}
            entity={null}
            injectionZone="draft_order.list.after"
            widget={Widget}
          />
        )
      })}
      <Spacer />
      {showProductSearchModal && (
        <MsNewOrder
          onDismiss={() => setShowProductSearchModal(false)}
          setItems={setItems}
        />
      )}
      {openCreateCustomerModal && (
        <CreateNewCustomerModal
          title="Create New Customer"
          openCreateCustomerModal={openCreateCustomerModal}
          setOpenCreateCustomerModal={setOpenCreateCustomerModal}
          openWithBillingAddress={false}
        />
      )}
      {showAddedCustomerDetailsModal && (
        <CreateNewCustomerModal
          title="Customer Details"
          openCreateCustomerModal={showAddedCustomerDetailsModal}
          setOpenCreateCustomerModal={setShowAddedCustomerDetailsModal}
          openWithBillingAddress={true}
        />
      )}

      {openAddCustomProductModal && (
        <AddCustomProductModal
          openAddCustomProductModal={openAddCustomProductModal}
          setOpenAddCustomProductModal={setOpenAddCustomProductModal}
        />
      )}
    </div>
  )
}

const CreateOrder = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <NewOrderFormProvider>
            {" "}
            <OrderCrateIndex />{" "}
          </NewOrderFormProvider>
        }
      />
    </Routes>
  )
}

const CustomerOption = ({ innerProps, data }) => {
  return (
    <div {...innerProps}>
      <div className="flex cursor-pointer items-center gap-2 space-x-2 p-2">
        <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200"></div>
        <div>
          <div className="text-sm font-medium text-gray-900">{data.label}</div>
          <div className="text-sm text-gray-500">{data.value}</div>
        </div>
      </div>
    </div>
  )
}

export default CreateOrder

import { useEffect, useMemo, useState } from "react"
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
import SelectRegionScreen from "../new/components/select-region"
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
import SummaryCard from "../details/detail-cards/summary"
import Timeline from "../../../components/organisms/timeline"
import SelectShippingMethod from "../new/components/select-shipping"
import qs from "qs"
import AddCustomProductModal from "./add-custom-product-modal"
import CreateNewCustomerModal from "./create-new-customer-modal"
import ItemSearch2 from "../../../components/molecules/item-search/item-search-2"
import { NextSelect } from "../../../components/molecules/select/next-select"
import { Pencil } from "@medusajs/icons"
import { Customer } from "@medusajs/medusa"
import AddressDetailsCard from "./address-details-card"
import Modal from "../../../components/molecules/modal"
// import ItemSearch2 from "../../../components/molecules/item-search/item-search-2"

const VIEWS = ["Products"]

const OrderCrateIndex = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const view = "Products"

  const [showNewOrder, setShowNewOrder] = useState(false)
  const { order, isLoading } = useAdminOrder("order_01HPXVZTVWSWY43WM4SGD4XXXW")
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false)
  const [showAddedCustomerDetailsModal, setShowAddedCustomerDetailsModal] =
    useState(false)
  console.log("showAddedCustomerDetailsModal ->", showAddedCustomerDetailsModal)
  const [openAddCustomProductModal, setOpenAddCustomProductModal] =
    useState(false)
  const { customers } = useAdminCustomers()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )

  const { getWidgets } = useWidgets()
  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

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
      <div className="grid grid-cols-3  gap-4">
        <div className="medium:col-span-2 col-span-3">
          <div className="h-full w-full">
            <BodyCard
              compact={true}
              title={"Products"}
              customActionable={addProductAction}
              className="h-fit"
            >
              <ItemSearch2 onItemSelect={() => {}} />
            </BodyCard>
            <BodyCard
              compact={true}
              title={"Shipping method"}
              className="my-4 h-fit"
            >
              <SelectShippingMethod />,
            </BodyCard>
          </div>
        </div>
        <div className="medium:col-span-1  col-span-3">
          <BodyCard
            compact={true}
            title={"Customer"}
            actionables={[]}
            className="h-fit rounded-b-none"
          >
            <SelectRegionScreen />
          </BodyCard>

          <BodyCard
            compact={true}
            title={selectedCustomer ? "Added Customer" : "Add Customer"}
            customActionable={addCustomerActions}
            className="h-fit rounded-t-none"
          >
            {!selectedCustomer ? (
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field: { value, onChange, onBlur, ref, name } }) => {
                  return (
                    <NextSelect
                      // className="hidden"
                      // ref={ref}
                      placeholder={t(
                        "create-order-find-existing-customer",
                        "Find Existing Customer..."
                      )}
                      name={name}
                      options={options}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      // isClearable
                      // errors={errors}

                      components={{
                        Option: CustomerOption,
                      }}
                    />
                  )
                }}
              />
            ) : (
              <>
                <AddressDetailsCard
                  title="Contact Details"
                  content={[
                    { label: "Name", value: "Mohibullah Shafi" },
                    { label: "Company", value: "MoveOn" },
                    { label: "Email", value: "ceo@moveon.com.bd" },
                    { label: "Phone", value: "451448528855" },
                  ]}
                />
                <AddressDetailsCard
                  title="Shipping Details"
                  content={[
                    { label: "Address", value: "Mirpur DOHS" },
                    { label: "City", value: "Dhaka" },
                    { label: "Postal", value: "1234" },
                    { label: "Country", value: "Bangladesh" },
                  ]}
                />

                <AddressDetailsCard
                  title="Billing Details"
                  content={[
                    { label: "Address", value: "Mirpur DOHS" },
                    { label: "City", value: "Dhaka" },
                    { label: "Postal", value: "1234" },
                    { label: "Country", value: "Bangladesh" },
                  ]}
                />
              </>
            )}
          </BodyCard>

          {order && <SummaryCard order={order} reservations={[]} />}

          {order && <Timeline orderId={order.id} />}
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

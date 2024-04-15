import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Spacer from "../../../components/atoms/spacer"
import WidgetContainer from "../../../components/extensions/widget-container"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../../components/organisms/body-card"
import { useWidgets } from "../../../providers/widget-provider"
import Button from "../../../components/fundamentals/button"
import BackButton from "../../../components/atoms/back-button"
import SelectRegionScreen from "../new/components/ms-select-region"
import NewOrderFormProvider, { useNewOrderForm } from "../new/form"
import Select from "../../../components/molecules/select"
import { Option } from "../../../types/shared"
import { Controller, useWatch } from "react-hook-form"
import {
  useAdminCustomer,
  useAdminCustomers,
} from "medusa-react"
import Medusa from "../../../services/api"
import qs from "qs"
import AddCustomProductModal from "./add-custom-product-modal"
import CreateNewCustomerModal from "./create-new-customer-modal"
import { Customer } from "@medusajs/medusa"
import AddressDetails from "./address-details"
import InputField from "../../../components/molecules/input"
import MsSummaryCard from "../ms-details/detail-cards/ms-summary"
import SearchProductModal from "./search-product-modal"
import useNotification from "../../../hooks/use-notification"
import MsSelectShippingMethod from "../new/components/ms-select-shipping"
import MsItemsInformationTable from "./dupli"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import isNullishObject from "../../../utils/is-nullish-object"

type ProductVariant = {
  quantity: number
  variant_id: string
  title: string
  unit_price: number
  product_title: string
  thumbnail: string
}[]

const OrderCrateIndex = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const view = "Products"

  const [items, setItems] = useState<ProductVariant>([])

  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false)
  const [showAddedCustomerDetailsModal, setShowAddedCustomerDetailsModal] =
    useState(false)
  const [openAddCustomProductModal, setOpenAddCustomProductModal] =
    useState(false)
  const { customers } = useAdminCustomers()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  )
  const notification = useNotification()
  const [showProductSearchModal, setShowProductSearchModal] = useState(false)

  const { getWidgets } = useWidgets()
  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

  const { billing_address, shipping_address } = form.getValues()

  const { context } = useNewOrderForm()
  const { fields: selectedProducts } = context.items
  const {
    form: { handleSubmit, reset },
    context: { region },
  } = useNewOrderForm()

  const onSubmit = handleSubmit((data) => {
    console.log("data from create :>> ", data)
    // if (!data.email) {
    //   return notification("error", "Email is required", "error")
    // }
  })

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

  const customerId = useWatch({
    control: form.control,
    name: "customer_id",
  })

  const email = useWatch({
    control: form.control,
    name: "email",
  })

  const is_new_customer_form_saved = useWatch({
    control: form.control,
    defaultValue: false,
    name: "is_new_customer_form_saved",
  })

  const { customer } = useAdminCustomer(customerId?.value!, {
    enabled: !!customerId?.value,
  })

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

  // reset the form when clicking on the cross icon
  const resetForm = () => {
    form.setValue("email", "")
    form.setValue("customer_id", null)
    form.setValue("shipping_address.first_name", "")
    form.setValue("shipping_address.last_name", "")
    form.setValue("shipping_address.phone", "")
    form.setValue("shipping_address.address_1", "")
    form.setValue("shipping_address.address_2", "")
    form.setValue("shipping_address.city", "")
    form.setValue("shipping_address.country_code", null)
    form.setValue("shipping_address.province", "")
    form.setValue("shipping_address.postal_code", "")
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
    if (
      !selectedCustomer &&
      !customerId?.value &&
      is_new_customer_form_saved === false &&
      isNullishObject(shipping_address) &&
      !email &&
      isNullishObject(billing_address)
    ) {
      content = "Add new customer"
      icon = <PlusIcon size={20} />
      action = () => setOpenCreateCustomerModal(true)
    } else if (
      is_new_customer_form_saved === false &&
      email &&
      !customerId?.value &&
      !selectedCustomer
    ) {
      content = "Add new customer"
      icon = <PlusIcon size={20} />
      action = () => setOpenCreateCustomerModal(true)
    } else if (
      is_new_customer_form_saved === true &&
      !isNullishObject(shipping_address) &&
      email
    ) {
      icon = <CrossIcon />
      action = () => {
        resetForm()
        form.setValue("is_new_customer_form_saved", false)
      }
    } else if (email && customerId?.value && !selectedCustomer) {
      icon = <CrossIcon />
      action = () => {
        resetForm()
        form.setValue("is_new_customer_form_saved", false)
      }
    } else if (
      is_new_customer_form_saved === false &&
      isNullishObject(shipping_address)
    ) {
      content = "Add new customer"
      icon = <PlusIcon size={20} />
      action = () => setOpenCreateCustomerModal(true)
    } else {
      if (is_new_customer_form_saved === false) {
        content = "Add new customer"
        icon = <PlusIcon size={20} />
        action = () => setOpenCreateCustomerModal(true)
      } else {
        icon = <CrossIcon />
        action = () => {
          resetForm()
          form.setValue("is_new_customer_form_saved", false)
        }
      }
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
  }, [
    selectedCustomer,
    shipping_address,
    email,
    customerId?.value,
    is_new_customer_form_saved,
  ])

  const options =
    customers &&
    customers.map((customer) => ({
      label: customer.first_name,
      value: customer.email,
      id: customer.id,
    }))
  return (
    <div className="gap-y-xsmall flex h-full grow flex-col">
      <div className="flex items-center justify-between">
        <BackButton
          path="/a/orders"
          label="Create Manual Order"
          className="mb-xsmall text-large"
        />
        <Button type="submit" variant="primary" onClick={onSubmit}>
          Create Order
        </Button>
      </div>
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
      <div className="grid grid-cols-12 gap-4">
        <div className="medium:col-span-8 col-span-12">
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
              <MsItemsInformationTable />
            </BodyCard>
            <BodyCard
              compact={true}
              title={"Shipping method"}
              className="my-4 h-fit"
            >
              <MsSelectShippingMethod />
            </BodyCard>
          </div>
        </div>
        <div className="medium:col-span-4 col-span-12">
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
            title={customer ? "Added Customer" : "Add Customer"}
            customActionable={addCustomerActions}
            className="h-fit rounded-t-none pb-4"
          >
            {!customer && is_new_customer_form_saved === false ? (
              <Controller
                control={form.control}
                name="customer_id"
                render={({ field: { value, onChange } }) => {
                  return (
                    <Select
                      className="mt-4"
                      label={t(
                        "components-find-existing-customer",
                        "Find existing customer"
                      )}
                      options={options || []}
                      enableSearch
                      value={value || null}
                      onChange={(val) => {
                        onCustomerSelect(val)
                        onChange(val)
                      }}
                      filterOptions={debouncedFetch as any}
                      clearSelected
                    />
                  )
                }}
              />
            ) : (
              <AddressDetails customer={customer} />
            )}
          </BodyCard>
          <MsSummaryCard />
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
        <>
          <SearchProductModal
            openSearchProductModal={showProductSearchModal}
            setOpenSearchProductModal={setShowProductSearchModal}
            title="Search Product"
            setItems={setItems}
          />
        </>
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
            <OrderCrateIndex />
          </NewOrderFormProvider>
        }
      />
    </Routes>
  )
}

export default CreateOrder

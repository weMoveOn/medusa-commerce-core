import { useEffect, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Spacer from "../../../components/atoms/spacer"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../../components/organisms/body-card"
import Button from "../../../components/fundamentals/button"
import BackButton from "../../../components/atoms/back-button"
import SelectRegionScreen from "../new/components/ms-select-region"
import NewOrderFormProvider, { useNewOrderForm } from "../new/form"
import Select from "../../../components/molecules/select"
import { Option } from "../../../types/shared"
import { Controller, useWatch } from "react-hook-form"
import { useAdminCustomer, useAdminCustomers } from "medusa-react"
import Medusa from "../../../services/api"
import qs from "qs"
import AddCustomProductModal, {
  AddCustomProductModalMobile,
} from "./add-custom-product-modal"
import CreateNewCustomerModal from "./create-new-customer-modal"
import { Customer } from "@medusajs/medusa"
import AddressDetails from "./address-details"
import InputField from "../../../components/molecules/input"
import MsSummaryCard from "../ms-details/detail-cards/ms-summary"
import SearchProductModal from "./search-product-modal"
import MsSelectShippingMethod from "../new/components/ms-select-shipping"
import MsItemsInformationTable from "./dupli"
import CrossIcon from "../../../components/fundamentals/icons/cross-icon"
import isNullishObject from "../../../utils/is-nullish-object"
import { Drawer } from "vaul"
import AddCustomerFormMobile from "../new/components/add-customer-mobile"
import MsItemsInformationMobile from "./ms-items-information-table-mobile"

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
  const [showProductSearchModal, setShowProductSearchModal] = useState(false)
  const [findExistingCustomerModal, setFindExistingCustomerModal] =
    useState(false)

  const {
    context: { validCountries },
    form,
  } = useNewOrderForm()

  const { billing_address, shipping_address } = form.getValues()

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
    form.setValue("shipping_address.company", "")
  }

  const addProductAction = useMemo(() => {
    return [
      <div key="addProductAction" className="flex space-x-2">
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

  /* Mobile Layout start */

  const [width, setWidth] = useState(window.innerWidth)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (width < 640) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }

    const handleResize = () => {
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [width])

  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredCustomers =
    customers &&
    customers.filter((customer: Customer) =>
      Object.values(customer).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  /* Mobile Layout end */

  return (
    <>
      {!isMobile ? (
        <>
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
        </>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <BackButton
              path="/a/orders"
              label="Create Manual Order"
              className="mb-xsmall text-xl font-bold text-black"
            />
          </div>
          <div className="flex flex-grow flex-col gap-3">
            <div>
              <BodyCard
                compact={true}
                title={"Customer Information"}
                className="h-fit rounded-b-none pb-4"
                childrenClass="px-2"
                insidePadding={false}
                insideClass="py-2"
              >
                <SelectRegionScreen />
              </BodyCard>
              <BodyCard
                compact={true}
                title={customer ? "Added Customer" : "Add Customer"}
                customActionable={addCustomerActions}
                className="h-fit rounded-t-none pb-4"
                childrenClass="px-2"
                insidePadding={false}
                insideClass="py-2"
              >
                {customer || is_new_customer_form_saved ? (
                  <AddressDetails customer={customer} />
                ) : (
                  <Button
                    className="w-full"
                    variant="primary"
                    onClick={() => setFindExistingCustomerModal(true)}
                  >
                    Find Existing Customer
                  </Button>
                )}
              </BodyCard>
            </div>
            <BodyCard
              compact={true}
              title={"Products"}
              customActionable={addProductAction}
              className="h-fit px-1 pb-4"
              childrenClass="px-1"
              insidePadding={false}
              insideClass="py-2"
            >
              {items.length > 0 && <MsItemsInformationMobile />}
              <Button
                className="w-full"
                variant="primary"
                onClick={() => setShowProductSearchModal(true)}
              >
                Find Products
              </Button>
            </BodyCard>
            <BodyCard
              compact={true}
              title={"Shipping method"}
              childrenClass="px-1"
              className="h-fit px-1 pb-4"
              insidePadding={false}
              insideClass="py-2"
            >
              <MsSelectShippingMethod />
            </BodyCard>
            <MsSummaryCard className="my-0" />
            {openCreateCustomerModal && (
              <Drawer.Root dismissible={false} open={openCreateCustomerModal}>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
                    <div className="mt-2 flex items-center justify-between px-4">
                      <h2 className="text-sm font-bold">Create New Customer</h2>
                      <Button
                        className=""
                        variant="ghost"
                        onClick={() => setOpenCreateCustomerModal(false)}
                      >
                        <CrossIcon size={20} />
                      </Button>
                    </div>
                    <div className="h-[90vh] overflow-y-auto">
                      <AddCustomerFormMobile
                        setOpenCreateCustomerModal={setOpenCreateCustomerModal}
                      />
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            )}
            {findExistingCustomerModal && (
              <Drawer.Root dismissible={false} open={findExistingCustomerModal}>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
                    <div className="mt-2 flex items-center justify-between px-4">
                      <h2 className="text-sm font-bold">
                        Find Existing Customer
                      </h2>
                      <Button
                        className=""
                        variant="ghost"
                        onClick={() => setFindExistingCustomerModal(false)}
                      >
                        <CrossIcon size={20} />
                      </Button>
                    </div>
                    <div className="h-[80vh] overflow-y-auto">
                      {!customer && is_new_customer_form_saved === false && (
                        <div>
                          <input
                            type="text"
                            placeholder="Search by name"
                            value={searchTerm}
                            onChange={handleSearch}
                          />
                          <ul>
                            {filteredCustomers &&
                              filteredCustomers.map((customer) => (
                                <li key={customer.id}>
                                  <div>Name: {customer.email}</div>
                                  <div>Phone: {customer.phone}</div>
                                </li>
                              ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            )}
            {openAddCustomProductModal && (
              <Drawer.Root dismissible={false} open={openAddCustomProductModal}>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
                    <div className="my-2 flex items-center justify-between px-4">
                      <h2 className="text-sm font-bold">Add Custom Product</h2>
                      <Button
                        className=""
                        variant="ghost"
                        onClick={() => setOpenAddCustomProductModal(false)}
                      >
                        <CrossIcon size={20} />
                      </Button>
                    </div>
                    <div className="h-[368px] overflow-y-auto bg-white p-3">
                      <AddCustomProductModalMobile />
                    </div>
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            )}
            {showProductSearchModal && (
              <Drawer.Root dismissible={false} open={showProductSearchModal}>
                <Drawer.Portal>
                  <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                  <Drawer.Content className="fixed bottom-0 left-0 right-0 mt-24 flex flex-col rounded-t-[10px] bg-zinc-100">
                    <div className="my-2 flex items-center justify-between px-4">
                      <h2 className="text-sm font-bold">Search Product</h2>
                      <Button
                        className=""
                        variant="ghost"
                        onClick={() => setShowProductSearchModal(false)}
                      >
                        <CrossIcon size={20} />
                      </Button>
                    </div>
                    {/* <div className="h-[70vh] overflow-y-auto bg-white p-3"> */}
                    <SearchProductModal
                      openSearchProductModal={showProductSearchModal}
                      title="Search Product"
                      setItems={setItems}
                      setOpenSearchProductModal={setShowProductSearchModal}
                    />
                    {/* </div> */}
                  </Drawer.Content>
                </Drawer.Portal>
              </Drawer.Root>
            )}
          </div>
        </div>
      )}
    </>
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

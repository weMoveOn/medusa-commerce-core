import { useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Spacer from "../../../components/atoms/spacer"
import WidgetContainer from "../../../components/extensions/widget-container"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../../components/organisms/body-card"
import { useWidgets } from "../../../providers/widget-provider"
import Button from "../../../components/fundamentals/button"
import ItemSearch from "../../../components/molecules/item-search"
import BackButton from "../../../components/atoms/back-button"
import SelectRegionScreen from "../new/components/select-region"
import NewOrderFormProvider, { useNewOrderForm } from "../new/form"
import Select from "../../../components/molecules/select"
import { Option } from "../../../types/shared"
import { Controller, useWatch } from "react-hook-form"
import { useAdminCustomer, useAdminOrder } from "medusa-react"
import Medusa from "../../../services/api"
import SummaryCard from "../details/detail-cards/summary"
import Timeline from "../../../components/organisms/timeline"
import SelectShippingMethod from "../new/components/select-shipping"
import qs from "qs"
import AddCustomProductModal from "./add-custom-product-modal"
import CreateNewCustomerModal from "./create-new-customer-modal"
import ItemSearch2 from "../../../components/molecules/item-search/item-search-2"

const VIEWS = ["Products"]

const OrderCrateIndex = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const view = "Products"

  const [showNewOrder, setShowNewOrder] = useState(false)
  const { order, isLoading } = useAdminOrder("order_01HPH13DJAX36V54HKYEZ4RTDY")
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false)
  const [openAddCustomProductModal, setOpenAddCustomProductModal] =
    useState(false)

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

  const customerId = useWatch({
    control: form.control,
    name: "customer_id",
  })

  const { customer } = useAdminCustomer(customerId?.value!, {
    enabled: !!customerId?.value,
  })

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
    return [
      <div className="flex space-x-2">
        <Button
          className={"border-0"}
          key="order_create"
          variant="secondary"
          size="small"
          onClick={() => setOpenCreateCustomerModal(true)}
        >
          <PlusIcon size={20} />
          Add new customer
        </Button>
      </div>,
    ]
  }, [])
  const onItemSelect = () => {}

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
              <ItemSearch2 onItemSelect={onItemSelect} />
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
            title={"Add Customer"}
            customActionable={addCustomerActions}
            className="h-fit rounded-t-none"
          >
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
                    options={[]}
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
          openCreateCustomerModal={openCreateCustomerModal}
          setOpenCreateCustomerModal={setOpenCreateCustomerModal}
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

export default CreateOrder

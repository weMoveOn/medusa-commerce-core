import { useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import Spacer from "../../../components/atoms/spacer"
import WidgetContainer from "../../../components/extensions/widget-container"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import BodyCard from "../../../components/organisms/body-card"
import TableViewHeader from "../../../components/organisms/custom-table-header"
import { useWidgets } from "../../../providers/widget-provider"
import Button from "../../../components/fundamentals/button";
import ExportIcon from "../../../components/fundamentals/icons/export-icon";
import EditIcon from "../../../components/fundamentals/icons/edit-icon";
import ItemSearch from "../../../components/molecules/item-search";
import BackButton from "../../../components/atoms/back-button";
import SelectRegionScreen from "../new/components/select-region";
import NewOrderFormProvider, {useNewOrderForm} from "../new/form";
import NewOrder from "../new/new-order";
import Select from "../../../components/molecules/select";
import form from "../new/form";
import {Option} from "../../../types/shared";
import { Controller, useWatch } from "react-hook-form"
import { useAdminCustomer, useAdminOrder } from "medusa-react"
import Medusa from "../../../services/api";
import ShippingDetails from "../new/components/shipping-details";
import SummaryCard from "../details/detail-cards/summary";
import Timeline from "../../../components/organisms/timeline";
import SelectShippingMethod from "../new/components/select-shipping";
import qs from "qs"




const VIEWS = ["Products"]

const OrderCrateIndex = () => {
    const navigate = useNavigate()
    const { t } = useTranslation()
    const view = "Products"

    const [showNewOrder, setShowNewOrder] = useState(false)
    const { order, isLoading } = useAdminOrder("order_01HP81DW0H9E5TVR5DNQJZS0TP")
    console.log(order,"order")

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


    const actions = useMemo(() => {
        return [
            <div className="flex space-x-2">
                <Button
                    className={"border-0"}
                    key="order_create"
                    variant="secondary"
                    size="small"
                    onClick={() => navigate(`/a/order/create`)}
                >
                    <PlusIcon size={20} />
                    Add Custom product
                </Button>
            </div>
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
                    onClick={() => navigate(`/a/order/create`)}
                >
                    <PlusIcon size={20} />
                    Add Customer
                </Button>
            </div>
        ]
    }, [])
    const onItemSelect=()=>{


    }

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
                <div className="col-span-3 medium:col-span-2">
                    <div className="h-full w-full">
                        <BodyCard
                            compact={true}
                            title={"Products"}
                            customActionable={actions}
                            className="h-fit"
                        >
                            <ItemSearch onItemSelect={onItemSelect}/>
                            {/*<form>*/}

                            {/*    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>*/}
                            {/*    <div className="relative">*/}
                            {/*        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">*/}
                            {/*            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">*/}
                            {/*                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>*/}
                            {/*            </svg>*/}
                            {/*        </div>*/}
                            {/*        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required/>*/}
                            {/*            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>*/}
                            {/*    </div>*/}
                            {/*</form>*/}
                        </BodyCard>
                        <BodyCard
                            compact={true}
                            title={"Shipping method"}
                            className="h-fit my-4"
                        >
                            <SelectShippingMethod />,
                        </BodyCard>

                    </div>
                </div>
                <div className="col-span-3  medium:col-span-1">
                    <BodyCard
                        compact={true}
                        title={"Customer"}
                        actionables={[]}
                        className="h-fit rounded-b-none"
                    >

                        <SelectRegionScreen/>

                        {/*<hr className="w-full h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>*/}




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

                    { order &&  <SummaryCard order={order} reservations={[]} />

                    }

                    { order &&    <Timeline orderId={order.id} />
                    }





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
        </div>
    )
}


const CreateOrder = () => {
    return (
        <Routes>
            <Route index element={<NewOrderFormProvider> <OrderCrateIndex />  </NewOrderFormProvider>} />
        </Routes>
    )
}

export default CreateOrder
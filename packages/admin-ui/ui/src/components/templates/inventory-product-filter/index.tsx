import { useAdminRegions, useAdminSalesChannels } from "medusa-react"
import { useEffect, useState } from "react"
import FilterDropdownContainer from "../../../components/molecules/filter-dropdown/container"
import FilterDropdownItem from "../../../components/molecules/filter-dropdown/item"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import Button from "../../fundamentals/button"
import FilterIcon from "../../fundamentals/icons/filter-icon"
import { filterForTemporal } from "../../../utils/date-utils"

const REGION_PAGE_SIZE = 10
const CHANNEL_PAGE_SIZE = 10

const statusFilters = [
  "completed",
  "pending",
  "canceled",
  "archived",
  "requires_action",
]
const paymentFilters = [
  "awaiting",
  "captured",
  "refunded",
  "canceled",
  "partially_refunded",
  "requires_action",
  "not_paid",
]
const fulfillmentFilters = [
  "fulfilled",
  "not_fulfilled",
  "partially_fulfilled",
  "returned",
  "partially_returned",
  "shipped",
  "partially_shipped",
  "requires_action",
  "canceled",
]

const dateFilters = [
  "is in the last",
  "is older than",
  "is after",
  "is before",
  "is equal to",
]

const InventoryProductFilters = ({
  filters,
  submitFilters,
  clearFilters,
}) => {
  const [tempState, setTempState] = useState(filters)
  const [name, setName] = useState("")

  const { isFeatureEnabled } = useFeatureFlag()
  const isSalesChannelsEnabled = isFeatureEnabled("sales_channels")


  useEffect(() => {
    setTempState(filters)
  }, [filters])

  const onSubmit = () => {
    submitFilters(tempState)
  }

  const onClear = () => {
    clearFilters()
  }

  const setSingleFilter = (filterKey, filterVal) => {
    setTempState((prevState) => ({
      ...prevState,
      [filterKey]: filterVal,
    }))
  }

  const numberOfFilters = Object.entries(filters).reduce(
    (acc, [key, value]) => {
      if (value?.open) {
        acc = acc + 1
      }
      return acc
    },
    0
  )

  const [regionsPagination, setRegionsPagination] = useState({
    offset: 0,
    limit: REGION_PAGE_SIZE,
  })

  const {
    regions,
    count,
    isLoading: isLoadingRegions,
  } = useAdminRegions(regionsPagination)

  const { sales_channels, isLoading: isLoadingSalesChannels } =
    useAdminSalesChannels(
      { limit: CHANNEL_PAGE_SIZE },
      { enabled: isSalesChannelsEnabled }
    )

  const handlePaginateRegions = (direction) => {
    if (direction > 0) {
      setRegionsPagination((prev) => ({
        ...prev,
        offset: prev.offset + prev.limit,
      }))
    } else if (direction < 0) {
      setRegionsPagination((prev) => ({
        ...prev,
        offset: Math.max(prev.offset - prev.limit, 0),
      }))
    }
  }

  return (
    <div className="flex space-x-1">
      <FilterDropdownContainer
        submitFilters={onSubmit}
        clearFilters={onClear}
        triggerElement={
          <Button
          icon={<FilterIcon size={20} style={{ marginTop: "4px" }} />}
          className="mr-2 flex  flex-row items-center justify-center px-6"
          variant="secondary"
          size="small"
          spanClassName="text-center text-sm font-small text-slate-700"
        >
          Filter
        </Button>
        }
      >
        <FilterDropdownItem
          filterTitle={filterForTemporal.configurator.features.title}
          options={ filterForTemporal.configurator.features.values?.map((f) => ({
            value: f.value,
            label: f.label,
          })) || []}
          filters={tempState.features.filter}
          open={tempState.features.open}
          setFilter={(val) => setSingleFilter("features", val)}
        />
        <FilterDropdownItem
          filterTitle="Payment Status"
          options={paymentFilters}
          filters={tempState.payment.filter}
          open={tempState.payment.open}
          setFilter={(val) => setSingleFilter("payment", val)}
        />
        <FilterDropdownItem
          filterTitle="Fulfillment Status"
          options={fulfillmentFilters}
          filters={tempState.fulfillment.filter}
          open={tempState.fulfillment.open}
          setFilter={(val) => setSingleFilter("fulfillment", val)}
        />
        <FilterDropdownItem
          filterTitle="Regions"
          options={
            regions?.map((region) => ({
              value: region.id,
              label: region.name,
            })) || []
          }
          isLoading={isLoadingRegions}
          hasPrev={regionsPagination.offset > 0}
          hasMore={
            regionsPagination.offset + regionsPagination.limit < (count ?? 0)
          }
          onShowPrev={() => handlePaginateRegions(-1)}
          onShowNext={() => handlePaginateRegions(1)}
          filters={tempState.region.filter}
          open={tempState.region.open}
          setFilter={(v) => setSingleFilter("region", v)}
        />
        {isSalesChannelsEnabled && (
          <FilterDropdownItem
            filterTitle="Sales Channel"
            options={
              sales_channels?.map((salesChannel) => ({
                value: salesChannel.id,
                label: salesChannel.name,
              })) || []
            }
            isLoading={isLoadingSalesChannels}
            filters={tempState.salesChannel.filter}
            open={tempState.salesChannel.open}
            setFilter={(v) => setSingleFilter("salesChannel", v)}
          />
        )}
        <FilterDropdownItem
          filterTitle="Date"
          options={dateFilters}
          filters={tempState.date.filter}
          open={tempState.date.open}
          setFilter={(val) => setSingleFilter("date", val)}
        />
      </FilterDropdownContainer>
    </div>
  )
}

export default InventoryProductFilters

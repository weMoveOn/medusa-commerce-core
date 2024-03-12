import clsx from "clsx"
import { useAdminRegions, useAdminSalesChannels } from "medusa-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import FilterDropdownContainer from "../../molecules/filter-dropdown/container"
import FilterDropdownItem from "../../molecules/filter-dropdown/item"
import SaveFilterItem from "../../molecules/filter-dropdown/save-field"
import TabFilter from "../../molecules/filter-tab"
import PlusIcon from "../../fundamentals/icons/plus-icon"
import { useFeatureFlag } from "../../../providers/feature-flag-provider"
import MsFilterTab from "../../molecules/ms-filter-tab"
import Button from "../../fundamentals/button"
import SortingIcon from "../../fundamentals/icons/sorting-icon"

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

const MsOrderFilters = ({
  tabs,
  activeTab,
  onTabClick,
  onSaveTab,
  onRemoveTab,
  filters,
  submitFilters,
  clearFilters,
}) => {
  const { t } = useTranslation()
  const [tempState, setTempState] = useState(filters)
  const [name, setName] = useState("")

  const { isFeatureEnabled } = useFeatureFlag()
  const isSalesChannelsEnabled = isFeatureEnabled("sales_channels")

  const handleRemoveTab = (val) => {
    if (onRemoveTab) {
      onRemoveTab(val)
    }
  }

  const handleSaveTab = () => {
    if (onSaveTab) {
      onSaveTab(name, tempState)
    }
  }

  const handleTabClick = (tabName: string) => {
    if (onTabClick) {
      onTabClick(tabName)
    }
  }

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
    <div className="flex">
      <FilterDropdownContainer
        submitFilters={onSubmit}
        clearFilters={onClear}
        triggerElement={
          <Button
            variant="primary"
            className="absolute right-4 top-0 h-[44px]"
          >
            <SortingIcon size={20}/>
            {t("order-filter-dropdown-filters", "Filters")}
          </Button>
        }
      >
        <FilterDropdownItem
          filterTitle={t("order-filter-dropdown-status", "Status")}
          options={statusFilters}
          filters={tempState.status.filter}
          open={tempState.status.open}
          setFilter={(val) => setSingleFilter("status", val)}
        />
        <FilterDropdownItem
          filterTitle={t(
            "order-filter-dropdown-payment-status",
            "Payment Status"
          )}
          options={paymentFilters}
          filters={tempState.payment.filter}
          open={tempState.payment.open}
          setFilter={(val) => setSingleFilter("payment", val)}
        />
        <FilterDropdownItem
          filterTitle={t(
            "order-filter-dropdown-fulfillment-status",
            "Fulfillment Status"
          )}
          options={fulfillmentFilters}
          filters={tempState.fulfillment.filter}
          open={tempState.fulfillment.open}
          setFilter={(val) => setSingleFilter("fulfillment", val)}
        />
        <FilterDropdownItem
          filterTitle={t("order-filter-dropdown-regions", "Regions")}
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
            filterTitle={t(
              "order-filter-dropdown-sales-channel",
              "Sales Channel"
            )}
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
          filterTitle={t("order-filter-dropdown-date", "Date")}
          options={dateFilters}
          filters={tempState.date.filter}
          open={tempState.date.open}
          setFilter={(val) => setSingleFilter("date", val)}
        />
        <SaveFilterItem
          saveFilter={handleSaveTab}
          name={name}
          setName={setName}
        />
      </FilterDropdownContainer>
      <div className="flex h-[40px] items-center">
        {tabs &&
          tabs.map((t, i) => (
            <MsFilterTab
              key={t.value}
              onClick={() => handleTabClick(t.value)}
              label={t.label}
              isActive={activeTab === t.value}
              removable={!!t.removable}
              onRemove={() => handleRemoveTab(t.value)}
              isFirstButton={i === 0}
              isLastButton={i === tabs.length - 1}
            />
          ))}
      </div>
    </div>
  )
}

export default MsOrderFilters

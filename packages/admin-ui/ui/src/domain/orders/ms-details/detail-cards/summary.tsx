import {
  AdminGetVariantsVariantInventoryRes,
  Order,
  VariantInventory,
} from "@medusajs/medusa"
import React, { useContext, useMemo } from "react"
import { DisplayTotal, PaymentDetails } from "../templates"
import { useTranslation } from "react-i18next"

import { ActionType } from "../../../../components/molecules/actionables"
import Badge from "../../../../components/fundamentals/badge"
import BodyCard from "../../../../components/organisms/body-card"
import CopyToClipboard from "../../../../components/atoms/copy-to-clipboard"
import { OrderEditContext } from "../../edit/context"
import OrderLine from "../order-line"
import { ReservationItemDTO } from "@medusajs/types"
import ReserveItemsModal from "../reservation/reserve-items-modal"
import { Response } from "@medusajs/medusa-js"
import { sum } from "lodash"
import { useMedusa } from "medusa-react"
import StatusIndicator from "../../../../components/fundamentals/status-indicator"
import useToggleState from "../../../../hooks/use-toggle-state"
import { useFeatureFlag } from "../../../../providers/feature-flag-provider"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"
import { useState } from "react"
import InputField from "../../../../components/molecules/input"
import CrossIcon from "../../../../components/fundamentals/icons/cross-icon"
import Button from "../../../../components/fundamentals/button"

type SummaryCardProps = {
  order: Order
  reservations: ReservationItemDTO[]
}

const SummaryCard: React.FC<SummaryCardProps> = ({ order, reservations }) => {
  const { t } = useTranslation()
  const {
    state: reservationModalIsOpen,
    open: showReservationModal,
    close: closeReservationModal,
  } = useToggleState()

  const { showModal } = useContext(OrderEditContext)
  const { client } = useMedusa()
  const { isFeatureEnabled } = useFeatureFlag()
  const inventoryEnabled = isFeatureEnabled("inventoryService")
  const [showDiscountField, setShowDiscountField] = useState(true)

  const [variantInventoryMap, setVariantInventoryMap] = React.useState<
    Map<string, VariantInventory>
  >(new Map())

  React.useEffect(() => {
    if (!inventoryEnabled) {
      return
    }

    const fetchInventory = async () => {
      const inventory = await Promise.all(
        order.items.map(async (item) => {
          if (!item.variant_id) {
            return
          }
          return await client.admin.variants.getInventory(item.variant_id)
        })
      )

      setVariantInventoryMap(
        new Map(
          inventory
            .filter(
              (
                inventoryItem
                // eslint-disable-next-line max-len
              ): inventoryItem is Response<AdminGetVariantsVariantInventoryRes> =>
                !!inventoryItem
            )
            .map((i) => {
              return [i.variant.id, i.variant]
            })
        )
      )
    }

    fetchInventory()
  }, [order.items, inventoryEnabled, client.admin.variants])

  const reservationItemsMap = useMemo(() => {
    if (!reservations?.length || !inventoryEnabled) {
      return {}
    }

    return reservations.reduce(
      (acc: Record<string, ReservationItemDTO[]>, item: ReservationItemDTO) => {
        if (!item.line_item_id) {
          return acc
        }
        acc[item.line_item_id] = acc[item.line_item_id]
          ? [...acc[item.line_item_id], item]
          : [item]
        return acc
      },
      {}
    )
  }, [reservations, inventoryEnabled])

  const allItemsReserved = useMemo(() => {
    return order.items.every((item) => {
      if (
        !item.variant_id ||
        !variantInventoryMap.get(item.variant_id)?.inventory.length
      ) {
        return true
      }

      const reservations = reservationItemsMap[item.id]

      return (
        item.quantity === item.fulfilled_quantity ||
        (reservations &&
          sum(reservations.map((r) => r.quantity)) ===
            item.quantity - (item.fulfilled_quantity || 0))
      )
    })
  }, [order.items, variantInventoryMap, reservationItemsMap])

  const { hasMovements, swapAmount, manualRefund, swapRefund, returnRefund } =
    useMemo(() => {
      let manualRefund = 0
      let swapRefund = 0
      let returnRefund = 0

      const swapAmount = sum(order?.swaps.map((s) => s.difference_due) || [0])

      if (order?.refunds?.length) {
        order.refunds.forEach((ref) => {
          if (ref.reason === "other" || ref.reason === "discount") {
            manualRefund += ref.amount
          }
          if (ref.reason === "return") {
            returnRefund += ref.amount
          }
          if (ref.reason === "swap") {
            swapRefund += ref.amount
          }
        })
      }
      return {
        hasMovements:
          swapAmount + manualRefund + swapRefund + returnRefund !== 0,
        swapAmount,
        manualRefund,
        swapRefund,
        returnRefund,
      }
    }, [order])

  const actionables = useMemo(() => {
    const actionables: ActionType[] = []
    if (isFeatureEnabled("order_editing")) {
      actionables.push({
        label: t("detail-cards-edit-order", "Edit Order"),
        onClick: showModal,
      })
    }
    if (isFeatureEnabled("inventoryService") && !allItemsReserved) {
      actionables.push({
        label: t("detail-cards-allocate", "Allocate"),
        onClick: showReservationModal,
      })
    }
    return actionables
  }, [showModal, isFeatureEnabled, showReservationModal, allItemsReserved])

  const isAllocatable = !["canceled", "archived"].includes(order.status)

  return (
    <BodyCard
      className={"my-4 h-auto min-h-0 w-full"}
      title="Payment Details" 
      actionables={actionables}
    >
      <div className="mt-6">
        <DisplayTotal
          currency={order.currency_code}
          totalAmount={order.subtotal}
          totalTitle={t("detail-cards-subtotal", "Subtotal")}
        />
        {order?.discounts?.map((discount, index) => (
          <DisplayTotal
            key={index}
            currency={order.currency_code}
            totalAmount={-1 * order.discount_total}
            totalTitle={
              <div className="inter-small-regular text-grey-90 flex items-center">
                {t("detail-cards-discount", "Discount:")}{" "}
                <Badge className="ml-3" variant="default">
                  {discount.code}
                </Badge>
              </div>
            }
          />
        ))}
        <DisplayTotal
          currency={order.currency_code}
          totalAmount={order.shipping_total}
          totalTitle={t("detail-cards-shipping", "Shipping")}
        />
        <DisplayTotal
          currency={order.currency_code}
          totalAmount={order.tax_total}
          totalTitle={t("discount", "discount")}
        />

        {!showDiscountField ? (
          <div className="flex justify-between">
            <div className="flex justify-center">
              <PlusIcon size={10} />
              <p
                className="cursor-pointer font-bold underline text-[10px]"
                onClick={() => setShowDiscountField(true)}
              >
                {" "}
                Add discount
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center">
              <InputField
                placeholder="Discount"
                suffix={
                  <Button className="h-8 w-12" variant="primary">
                    Add
                  </Button>
                }
              />
              <CrossIcon
                size={10}
                onClick={() => setShowDiscountField(false)}
              />
            </div>

            {showDiscountField && (
              <div className="mt-4 max-w-xs overflow-hidden rounded-lg border border-gray-300 shadow-lg hidden">
                <div className="bg-[#D9D9D9] px-4 py-2 ">
                  <h2 className="text-xl font-bold">Special Offer!</h2>
                  <p>-20%</p>
                </div>
                <div className="border-t-2 border-dotted bg-[#D9D9D9] px-4 py-6">
                  <p className="text-gray-800">
                    Use code: <span className="font-bold">SPECIAL20</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <DisplayTotal
          currency={order.currency_code}
          totalAmount={order.tax_total}
          totalTitle={t("detail-cards-tax", "Tax")}
        />
        <DisplayTotal
          variant={"large"}
          currency={order.currency_code}
          totalAmount={order.total}
          totalTitle={
            hasMovements
              ? t("detail-cards-original-total", "Original Total")
              : t("detail-cards-total", "Total")
          }
        />
        <PaymentDetails
          manualRefund={manualRefund}
          swapAmount={swapAmount}
          swapRefund={swapRefund}
          returnRefund={returnRefund}
          paidTotal={order.paid_total}
          refundedTotal={order.refunded_total}
          currency={order.currency_code}
        />
      </div>
      {reservationModalIsOpen && (
        <ReserveItemsModal
          reservationItemsMap={reservationItemsMap}
          items={order.items}
          close={closeReservationModal}
        />
      )}
    </BodyCard>
  )
}

export default SummaryCard

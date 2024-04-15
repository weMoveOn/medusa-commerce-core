import React from "react"
import { DisplayTotal } from "../templates"
import { useTranslation } from "react-i18next"
import BodyCard from "../../../../components/organisms/body-card"
import PlusIcon from "../../../../components/fundamentals/icons/plus-icon"
import { useState } from "react"
import InputField from "../../../../components/molecules/input"
import CrossIcon from "../../../../components/fundamentals/icons/cross-icon"
import Button from "../../../../components/fundamentals/button"
import { useNewOrderForm } from "../../new/form"

const MsSummaryCard: React.FC = () => {
  const { t } = useTranslation()

  const { context } = useNewOrderForm()
  const { items, selectedShippingOption, region } = context

  let totalPrice = 0

  if (items.fields.length > 0) {
    totalPrice = items.fields.reduce((acc, item) => {
      return acc + item.unit_price * item.quantity
    }, 0)
  }

  const currencyCode = region?.currency_code || "N/A"

  const grandTotal = totalPrice + (selectedShippingOption?.amount || 0)

  const [showDiscountField, setShowDiscountField] = useState(false)

  return (
    <BodyCard className={"my-4 h-auto min-h-0 w-full"} title="Payment Details">
      <div className="pb-4">
        <div className="flex h-12 items-center justify-between rounded-md bg-[#F5F5F5] text-xl font-bold">
          <h2 className="pl-2">Info</h2>
          <h2 className="pr-2">Total Price</h2>
        </div>
        <DisplayTotal
          currency={currencyCode}
          totalAmount={totalPrice}
          totalTitle={t("detail-cards-subtotal", "Subtotal")}
        />
        <DisplayTotal
          currency={currencyCode}
          totalAmount={selectedShippingOption?.amount || 0}
          totalTitle={t("detail-cards-shipping", "Shipping")}
        />
        <DisplayTotal
          currency={currencyCode}
          totalAmount={"0"}
          totalTitle={t("discount", "discount")}
        />

        {!showDiscountField ? (
          <div className="flex justify-between">
            <div className="flex items-center justify-center">
              <PlusIcon size={10} />
              <p
                className="cursor-pointer text-[10px] font-bold underline"
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
              <div className="mt-4 hidden max-w-xs overflow-hidden rounded-lg border border-gray-300 shadow-lg">
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
          currency={currencyCode}
          totalAmount={"0"}
          totalTitle={t("detail-cards-tax", "Tax")}
        />
        <DisplayTotal
          variant={"large"}
          currency={currencyCode}
          totalAmount={grandTotal}
          totalTitle={
            false
              ? t("detail-cards-original-total", "Original Total")
              : t("detail-cards-total", "Total")
          }
        />
      </div>
    </BodyCard>
  )
}

export default MsSummaryCard

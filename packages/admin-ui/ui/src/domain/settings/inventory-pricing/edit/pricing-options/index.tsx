import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import CreatePricingOptionModal from "./create-pricing-option-modal"
import { IInventoryStore } from "../../../../../types/inventory-store"

type Props = {
  store: IInventoryStore
}

const PricingOptions = ({ store }: Props) => {
  const { state, toggle, close } = useToggleState()

  return (
    <>
      <Section
        title="Pricing Options"
        actions={[
          {
            label: "Add Option",
            onClick: toggle,
          },
        ]}
      >
        <div className="gap-y-large flex flex-col">
          <p className="inter-base-regular text-grey-50">
            Enter pricing about available store options.
          </p>
          {/* <div className="gap-y-small flex flex-col">
            {shippingOptions?.map((option) => {
              return <ShippingOptionCard option={option} key={option.id} />
            })}
          </div> */}
        </div>
      </Section>
      <CreatePricingOptionModal open={state} onClose={close} store={store} />
    </>
  )
}

export default PricingOptions

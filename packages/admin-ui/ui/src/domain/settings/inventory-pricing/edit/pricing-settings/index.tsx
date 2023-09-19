import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import CreatePricingOptionModal from "./create-pricing-setting-modal"
import { IInventoryStore } from "../../../../../types/inventory-price-setting"

type Props = {
  store: IInventoryStore
}

const PricingSettings = ({ store }: Props) => {
  const { state, toggle, close } = useToggleState()

  return (
    <>
      <Section
        title={`Price Settings for ${store.name}`}
        actions={[
          {
            label: "Set Price",
            onClick: toggle,
          },
        ]}
      >
        <div className="gap-y-large flex flex-col">
          <p className="inter-base-regular text-grey-50">
            Enter pricing about available store.
          </p>
        </div>
      </Section>
      <CreatePricingOptionModal open={state} onClose={close} store={store} />
    </>
  )
}

export default PricingSettings

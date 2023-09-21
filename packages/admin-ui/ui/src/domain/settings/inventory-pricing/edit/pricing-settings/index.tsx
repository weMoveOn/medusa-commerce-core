import Section from "../../../../../components/organisms/section"
import useToggleState from "../../../../../hooks/use-toggle-state"
import CreatePricingOptionModal from "../../components/price-setting-modal/create-pricing.modal"
import { IInventoryStore, IPriceSettingReturnType } from "../../../../../types/inventory-price-setting"
import { useMemo } from "react"
import { Currency } from "@medusajs/medusa"
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store"
import { useNavigate } from "react-router-dom"

type Props = {
  store: IInventoryStore
  data?: IPriceSettingReturnType
  medusaStore?: ExtendedStoreDTO
}

const PricingSettings = ({ store, data, medusaStore }: Props) => {
  const navigate = useNavigate()
  const { state, toggle, close } = useToggleState()

    const currencyOptions = useMemo(() => {
    let currencyCodesInData : Array<string> = [];
    let filteredCurrencies: Currency[] = [];
    if(data && medusaStore){
    currencyCodesInData = data.result.map((item) => item.currency_code);
    filteredCurrencies = medusaStore.currencies.filter((currency) =>
    !currencyCodesInData.includes(currency.code)
  );
  return filteredCurrencies && filteredCurrencies.map((currency) => {
    return {
      value: currency.code,
      label: currency.name,
      prefix: currency.symbol.toUpperCase(),
    }
  })  
} else 
if(medusaStore) {
    return medusaStore.currencies.map((currency) => {
      return {
        value: currency.code,
        label: currency.name,
        prefix: currency.symbol.toUpperCase(),
      }
    })
  } else return []
}, [data, medusaStore])


const handleAddCurrencyClick = ()=>{
  navigate(`/a/settings/currencies`)
}

  return (
    <>
      <Section
        title={`${store.name}`}
        actions={[
          {
            label: currencyOptions.length===0 ? "Add More Currency" : "Set Price Role",
            onClick: currencyOptions.length===0 ? handleAddCurrencyClick : toggle,
          },
        ]}
      >
        <div className="gap-y-large flex flex-col">
          <p className="inter-base-regular text-grey-50">
            {currencyOptions.length===0 ? "Update price role or add more currency." : "Set price role for available currency."}
          </p>
        </div>
      </Section>
      <CreatePricingOptionModal open={state} onClose={close} store={store} currencyOptions={currencyOptions} />
    </>
  )
}

export default PricingSettings

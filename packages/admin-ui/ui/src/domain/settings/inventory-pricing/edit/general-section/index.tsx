import React, { useState } from "react";
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon";
import Section from "../../../../../components/organisms/section";
import useToggleState from "../../../../../hooks/use-toggle-state";
import { IPriceSetting, IInventoryStore, IPriceSettingReturnType, IUpdatePriceSetting } from "../../../../../types/inventory-price-setting";
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store";
import EditPricingModal from "./edit-pricing.modal";
import { CrossIcon } from "react-select/dist/declarations/src/components/indicators";
import TrashIcon from "../../../../../components/fundamentals/icons/trash-icon";

type Props = {
  store: IInventoryStore;
  data: IPriceSettingReturnType;
  medusaStore?: ExtendedStoreDTO
};

const GeneralSection = ({ store, data, medusaStore }: Props) => {
  const { state, toggle, close } = useToggleState();
  const [editData, setEditData] = useState<IUpdatePriceSetting>()

  const getCurrencyDetails = (code: string) => {
    const currency = medusaStore?.currencies.find((c) => c.code === code);
    return currency;
  }

  return (
    <>
      {data.result.map((d, index) => (
        <Section
          key={index}
          title={getCurrencyDetails(d.currency_code)?.name}
          actions={[
            {
              label: "Edit",
              onClick: ()=>{
                toggle();
                setEditData(d)
              },
              icon: <EditIcon size={20} className="text-grey-50" />,
            },
            {
              label: "Delete",
              variant: "danger",
              onClick: ()=>{},
              icon: <TrashIcon size={20} />,
            }
          ]}
        >
          <div className="gap-y-xsmall mt-large flex flex-col">
            <h2 className="inter-large-semibold">Details</h2>
            <div className="gap-y-xsmall flex flex-col">
              <PriceDetail title={"Currency"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className="inter-base-semibold text-grey-90">
                    {d.currency_code.toUpperCase()} ({getCurrencyDetails(d.currency_code)?.symbol})
                  </span>
                </div>
              </PriceDetail>
              <PriceDetail title={"Coversion Rate"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className=" text-grey-90">
                    {d.conversion_rate}
                  </span>
                </div>
              </PriceDetail>
              <PriceDetail title={"Profit Operation"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className=" text-grey-90 capitalize">
                    {d.profit_operation}
                  </span>
                </div>
              </PriceDetail>
              <PriceDetail title={"Profit Value"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className=" text-grey-90">
                    {d.profit_amount}
                  </span>
                </div>
              </PriceDetail>
              <PriceDetail title={"Delivery Fee"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className=" text-grey-90">
                    {d.shipping_charge}
                  </span>
                </div>
              </PriceDetail>
            </div>
          </div>
        </Section>
      ))}
       {data && editData && medusaStore && <EditPricingModal data={data} editData={editData} medusaStore={medusaStore} onClose={close} open={state} />}
    </>
  );
};

type DetailProps = {
  title: string;
  children: React.ReactNode;
};

const PriceDetail = ({ title, children }: DetailProps) => {
  return (
    <div className="inter-base-regular text-grey-50 flex items-center justify-between">
      <p>{title}</p>
      {children}
    </div>
  );
};

export default GeneralSection;

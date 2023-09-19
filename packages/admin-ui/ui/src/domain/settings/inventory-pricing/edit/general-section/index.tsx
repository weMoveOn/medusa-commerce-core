import React from "react";
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon";
import Section from "../../../../../components/organisms/section";
import useToggleState from "../../../../../hooks/use-toggle-state";
import { IInventoryStore, IPriceSettingReturnType } from "../../../../../types/inventory-price-setting";
import EditPricingModal from "./edit-pricing.modal";

type Props = {
  store: IInventoryStore;
  data: IPriceSettingReturnType;
};

const GeneralSection = ({ store, data }: Props) => {
  const { state, toggle, close } = useToggleState();

  return (
    <>
      {data.result.map((d, index) => (
        <Section
          key={index}
          title={store.name}
          actions={[
            {
              label: "Edit Price Settings",
              onClick: toggle,
              icon: <EditIcon size={20} className="text-grey-50" />,
            },
          ]}
        >
          <div className="gap-y-xsmall mt-large flex flex-col">
            <h2 className="inter-large-semibold">Details</h2>
            <div className="gap-y-xsmall flex flex-col">
              <PriceDetail title={"Currency"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className="inter-base-semibold text-grey-90">
                    {d.currency_code.toUpperCase()}
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
            </div>
          </div>
        </Section>
      ))}
       {/* <EditPricingModal data={data} onClose={close} open={state} /> */}
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

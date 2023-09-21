import React, { useState } from "react";
import EditIcon from "../../../../../components/fundamentals/icons/edit-icon";
import Section from "../../../../../components/organisms/section";
import useToggleState from "../../../../../hooks/use-toggle-state";
import { IPriceSettingReturnType, IUpdatePriceSetting } from "../../../../../types/inventory-price-setting";
import { ExtendedStoreDTO } from "@medusajs/medusa/dist/types/store";
import EditPricingModal from "../../components/price-setting-modal/edit-pricing.modal";
import TrashIcon from "../../../../../components/fundamentals/icons/trash-icon";
import useImperativeDialog from "../../../../../hooks/use-imperative-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../../../../../hooks/use-notification";
import Medusa from "../../../../../services/api"
import { getErrorMessage } from "../../../../../utils/error-messages";

type Props = {
  data: IPriceSettingReturnType;
  medusaStore?: ExtendedStoreDTO
};

const GeneralSection = ({ data, medusaStore }: Props) => {
  const dialog = useImperativeDialog()
  const { state, toggle, close,  } = useToggleState();
  const [editData, setEditData] = useState<IUpdatePriceSetting>()
  const [deleteData, setDeleteData] = useState<string>()
  const queryClient = useQueryClient()
  const notification = useNotification()

  const deletePriceSettingMutation = useMutation(
    () => Medusa.InventoryPriceSettings.delete(deleteData),
    {
      onSuccess: () => {
        notification("Success", "Price role deleted", "success");
        queryClient.invalidateQueries({ queryKey: ['single-price-setting-retrieve'] })
      },
      onError: (error) => {
        notification("Error", getErrorMessage(error), "error");
      },
    }
  );

  const handleDelete = async () => {
    const shouldDelete = await dialog({
      heading: "Delete Price Role",
      text: "Are you sure you want to delete the price role?",
    })

    if (!shouldDelete) {
      return
    }

    return deletePriceSettingMutation.mutate(undefined)
  }

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
                toggle()
                setEditData(d)
              },
              icon: <EditIcon size={20} className="text-grey-50" />,
            },
            {
              label: "Delete",
              variant: "danger",
              onClick: ()=>{
                setDeleteData(d.id)
                handleDelete()
              },
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
              <PriceDetail title={"Conversion Rate"}>
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
              <PriceDetail title={"Profit Amount"}>
                <div className="gap-x-xsmall flex items-center">
                  <span className=" text-grey-90">
                    {d.profit_amount}
                  </span>
                </div>
              </PriceDetail>
              <PriceDetail title={"Shipping Charge"}>
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


import FeatureToggle from "../../fundamentals/feature-toggle"
import { useTranslation } from "react-i18next"
import Accordion from "../../../../components/organisms/accordion"

const AccordionMVN = () => {
  return (
    <div className="small:w-4/5 medium:w-7/12 large:w-6/12 max-w-[700px]">
      <Accordion defaultValue={["general"]} type="multiple">
        <Accordion.Item
          value={"general"}
          title={"General information"}
          required
        >
          <p className="inter-base-regular text-grey-50">
            {"To start selling, all you need is a name and a price."}
          </p>
          <div className="mt-xlarge gap-y-xlarge flex flex-col">
            {/*<GeneralForm*/}
            {/*  form={nestedForm(form, "general")}*/}
            {/*  requireHandle={false}*/}
            {/*/>*/}
            {/*<DiscountableForm form={nestedForm(form, "discounted")} />*/}
          </div>
        </Accordion.Item>
        <Accordion.Item title="Organize" value="organize">
          <p className="inter-base-regular text-grey-50">
            To start selling, all you need is a name and a price.
          </p>
          <div className="mt-xlarge gap-y-xlarge pb-xsmall flex flex-col">
            <div>
              <h3 className="inter-base-semibold mb-base">
                Organize Product
              </h3>
              {/*<OrganizeForm form={nestedForm(form, "organize")} />*/}
              <FeatureToggle featureFlag="sales_channels">
                <div className="mt-xlarge">
                  {/*<AddSalesChannelsForm*/}
                  {/*  // form={nestedForm(form, "salesChannels")}*/}
                  {/*/>*/}
                </div>
              </FeatureToggle>
            </div>
          </div>
        </Accordion.Item>

      </Accordion>
    </div>

  )
}


export default AccordionMVN

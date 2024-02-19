/* eslint-disable spaced-comment */

import Accordion from "../../../../components/organisms/accordion"
import FeatureToggle from "../../../../components/fundamentals/feature-toggle"
import { useState } from "react"
import { t } from "i18next"

const AccordionMVN = () => {
  const [sections, setSections] = useState(["general"])
  return (
    <div className="small:w-4/5 medium:w-7/12 large:w-6/12 max-w-[700px]">
      <Accordion
        defaultValue={["general"]}
        onValueChange={setSections}
        type="multiple"
      >
        <Accordion.Item
          title={t("general", "general")}
          value="general"
          forceMountContent
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
        <Accordion.Item
          title={t("Organize", "Organize")}
          value="Organize"
          forceMountContent
        >
          <p className="inter-base-regular text-grey-50">
            To start selling, all you need is a name and a price.
          </p>
          <div className="mt-xlarge gap-y-xlarge pb-xsmall flex flex-col">
            <div>
              <h3 className="inter-base-semibold mb-base">Organize Product</h3>
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

        <Accordion.Item title="test" value="test">
          <p className="inter-base-regular text-grey-50">
            To start selling, all you need is a name and a price.
          </p>
          <div className="mt-xlarge gap-y-xlarge pb-xsmall flex flex-col">
            <div>
              <h3 className="inter-base-semibold mb-base">Organize Product</h3>
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

import Accordion from "../../../components/organisms/accordion";

const ProductDetailsAccordion = () => {
  return (
    <Accordion type="multiple" defaultValue={["general"]}>
    <Accordion.Item title="General" value="general" required>
      <div>
        
        <div className="mt-xlarge">
          <div className="mb-base gap-x-2xsmall flex items-center">
            <h3 className="inter-base-semibold">Options</h3>
            
          </div>
          <div className="gap-large pb-2xsmall grid grid-cols-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque veritatis enim, sed molestias quis magni consequuntur, illum est minus soluta blanditiis in voluptas nulla suscipit cupiditate necessitatibus laborum qui harum reiciendis aliquam, facere id iure incidunt totam! Accusantium, aut architecto autem dicta inventore dolorem accusamus ipsum nisi, obcaecati fugit libero.
          </div>
        </div>
      </div>
    </Accordion.Item>
    <Accordion.Item title="Pricing" value="pricing">
       Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, eos quisquam quod magnam labore quam aliquid impedit earum asperiores eligendi voluptatibus ipsum voluptate quo amet perspiciatis inventore, minima modi aut?
    </Accordion.Item>

    <Accordion.Item title="Shipping" value="shipping">
      <p className="inter-base-regular text-grey-50">
        Shipping information can be required depending on your shipping
        provider, and whether or not you are shipping internationally.
      </p>
      <div className="mt-large">
        <h3 className="inter-base-semibold mb-2xsmall">Dimensions</h3>
        <p className="inter-base-regular text-grey-50 mb-large">
          Configure to calculate the most accurate shipping rates.
        </p>
        
      </div>
 
    </Accordion.Item>
    <Accordion.Item title="Metadata" value="metadata">
      <p className="inter-base-regular text-grey-50 mb-base">
        Metadata can be used to store additional information about the
        variant.
      </p>
     
    </Accordion.Item>
  </Accordion>
  );
};

export default ProductDetailsAccordion;
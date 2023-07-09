import Accordion from "../../../components/organisms/accordion"

const ProductDetailsAccordion = () => {
  return (
    <Accordion type="multiple">
      <Accordion.Item title="Product information" value="Product-information">
        <div className="mt-large flex">
          <div>
            <p className="inter-base-regular text-grey-50 ">
              Product Code :
            </p>
            <p className="inter-base-regular text-grey-50 ">Source :</p>
            <p className="inter-base-regular text-grey-50 ">
              Category :
            </p>
            <p className="inter-base-regular text-grey-50 ">
              Total Sold :
            </p>
            <p className="inter-base-regular text-grey-50 ">
              Seller Score :
            </p>
          </div>
          <div className="ml-3">
            <p className="inter-base-regular ">Abb-1205280701</p>

            <p className="inter-base-regular ">$0.00</p>

            <p className="inter-base-regular ">Shoes</p>

            <p className="inter-base-regular ">10500 pieces</p>

            <p className="inter-base-regular ">11/22</p>
          </div>
        </div>
      </Accordion.Item>
      <Accordion.Item title="Guarantee" value="Guarantee">
        <p className="inter-base-regular text-grey-50 mb-base">
          Metadata can be used to store additional information about the
          variant.
        </p>
      </Accordion.Item>
    </Accordion>
  )
}

export default ProductDetailsAccordion

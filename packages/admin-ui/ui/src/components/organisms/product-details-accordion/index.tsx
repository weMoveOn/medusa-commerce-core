import Accordion from "../../../components/organisms/accordion"
import { IMoveonInventorySpecification } from "../../../types/inventory-product-details"

interface Props {
  specifications: IMoveonInventorySpecification[]
}

const ProductDetailsAccordion = ({specifications}: Props) => {
  return (
    <Accordion type="multiple">
      <Accordion.Item title="Product information" value="Product-information">
        
        <div className="mt-large flex">
        <div>
          {specifications.length===0 ?
          <span className="font-semibold text-lg tracking-twenty text-orange-50">Specifications Not Available</span>
          :
          specifications.map((specification, key)=> 
            <p key={key} className="inter-base-regular text-grey-50 ">
              {specification.label.name}
            </p>
          )}
        </div>

          <div className="ml-3">
          {specifications.map((specification, key)=> 
            <p key={key} className="inter-base-regular ">
              {specification.value.name}
            </p>
          )}
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

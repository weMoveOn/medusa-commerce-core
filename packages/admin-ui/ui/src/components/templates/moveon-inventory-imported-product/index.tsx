import { ProductLayoutType } from "../../../domain/moveon-inventory/overview"
import EditIcon from "../../fundamentals/icons/edit-icon"
import ProductGridCard from "../../molecules/product-grid-card"
import ProductListCard from "../../molecules/product-list-card"

interface IProps {
  layout: ProductLayoutType
}
const MoveOnInventoryImportedProduct: React.FC<IProps> = ({ layout }) => {
  return (
    <div className="container mx-auto px-2 py-2">
      <div className="-mx-4 flex flex-wrap justify-center">
        {layout === "grid" ? (
          <>
            {Array.from(Array(10), (item, index) => (
              <ProductGridCard
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={true}
                footerButtonEnabled={true}
                isSelect={false}
                rightButtonIcon={
                  <EditIcon
                    style={{
                      marginRight: "6px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                }
                leftButtonTitle="View"
                rightButtonTitle="Edit"
                leftButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
                rightButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
              />
            ))}
          </>
        ) : (
          <>
            {Array.from(Array(10), (item, index) => (
              <ProductListCard
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={true}
                footerButtonEnabled={true}
                rightButtonIcon={
                  <EditIcon
                    style={{
                      marginRight: "6px",
                      width: "19px",
                      height: "19px",
                    }}
                  />
                }
                leftButtonTitle="View"
                rightButtonTitle="Edit"
                leftButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
                rightButtonOnClick={function (value: any): void {
                  throw new Error("Function not implemented.")
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default MoveOnInventoryImportedProduct

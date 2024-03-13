import Button from "../../fundamentals/button";
import { Link } from "react-router-dom";

import emptyOrderImg from "../../../assets/icons/orders/no_order.png"

const TableEmptyState = () => {
    return (
      <div
        className="bg-grey-100"
        style={{
          height: "566px",
          width: "-webkit-fill-available",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        }}
      >
        <img
          src={emptyOrderImg}
          alt=""
          className="max-h-[210px] max-w-[210px]"
        />
        <h2 className="my-4 text-[30px] font-bold">You have no orders yet</h2>
        <h3 className="mb-8">
          Your orders will be listed here when your customers submit orders on
          your store
        </h3>
        <Button variant="primary" className="h-11 w-[193px]">
          <Link to="/a/order/create">Create a product</Link>
        </Button>
      </div>
    )
    };

export default TableEmptyState;
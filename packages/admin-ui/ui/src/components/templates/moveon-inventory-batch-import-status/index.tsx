import { useQuery } from "@tanstack/react-query";
import { ProductLayoutType } from "../../../domain/moveon-inventory/overview";
import EditIcon from "../../fundamentals/icons/edit-icon";
import ProductGridCard from "../../molecules/product-grid-card";
import ProductListCard from "../../molecules/product-list-card";
import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { defaultMoveonInventoryFilter } from "../../../utils/filters";
import LoadingContainer from "../../atoms/loading-container";
import { TablePagination } from "../../organisms/table-container/pagination";
import { useNavigate } from "react-router-dom";
import { IRetrieveInventoryProductReturnType } from "../../../types/medusaProduct";
import Medusa from "@medusajs/medusa-js";
import { MEDUSA_BACKEND_URL } from "../../../constants/medusa-backend-url";
import { usePolling } from "../../../providers/polling-provider";
import BatchJobActivityList from "../../organisms/batch-jobs-activity-list";
import { EmptyActivityDrawer, ErrorActivityDrawer } from "../../organisms/activity-drawer";

interface IProps {
  layout: ProductLayoutType;
}

const MoveOnInventoryBatchImportStatus: React.FC<IProps> = ({ layout }) => {
  const { batchJobs, hasPollingError, refetch } = usePolling();
  let productTitle = "";
  let productImage = "";
  let status = "Successful"; // Initialize the status

  if (!hasPollingError && batchJobs?.length && batchJobs[0].result?.errors) {
    const data = batchJobs[0].result?.errors[0] as string;
    const titleMatch = data.match(/Product Title: (.+?),/);
    const imageMatch = data.match(/Product Image: (.+?),/);

    if (titleMatch && titleMatch.length === 2) {
      productTitle = titleMatch[1];
    }

    if (imageMatch && imageMatch.length === 2) {
      productImage = imageMatch[1];
    }
  }

  return (
    <>
      <div className="container mx-auto px-2 py-2">
        <div className="-mx-4 flex flex-wrap justify-center">
          {batchJobs[0].context.products.map((item, index) => {
            // Check if the current product should be marked as "Failed"
            if (item.title === productTitle) {
              status = "Failed";
            }

            return (
              <ProductGridCard
                status={status}
                productData={{
                  title: item.title,
                  id: item.id,
                  shop_id: 0,
                  vpid: "",
                  vendor: "",
                  link: "",
                  image: item.image,
                  updated_at: batchJobs[0].updated_at.toString(),
                  discount: 0,
                  price: 0,
                  price_real: 0,
                }}
                route="import-status"
                key={index}
                enableSelectOption={false}
                footerProgressBarEnabled={false}
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
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default React.memo(MoveOnInventoryBatchImportStatus);

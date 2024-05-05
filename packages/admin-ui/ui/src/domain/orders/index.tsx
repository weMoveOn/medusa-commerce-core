import { Fragment, useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useAdminCreateBatchJob } from "medusa-react"
import Spacer from "../../components/atoms/spacer"
import RouteContainer from "../../components/extensions/route-container"
import Button from "../../components/fundamentals/button"
import ExportIcon from "../../components/fundamentals/icons/export-icon"
import ExportModal from "../../components/organisms/export-modal"
import useNotification from "../../hooks/use-notification"
import useToggleState from "../../hooks/use-toggle-state"
import { usePolling } from "../../providers/polling-provider"
import { useRoutes } from "../../providers/route-provider"
import { getErrorMessage } from "../../utils/error-messages"
import Details from "./ms-details"
import { transformFiltersAsExportContext } from "./utils"
import EditIcon from "../../components/fundamentals/icons/edit-icon"
import MsOrderTable from "../../components/templates/ms-order-table"
import MsTableViewHeader from "../../components/organisms/ms-custom-table-header"
import useViewportSize from "../../hooks/use-view-port-size"
import MsOrderTableMobile from "../../components/templates/ms-order-table/ms-order-table-mobile"
import BodyCard from "../../components/organisms/body-card"

const VIEWS = ["orders"]

const OrderIndex = () => {
  const view = "orders"

  const { t } = useTranslation()
  const { resetInterval } = usePolling()
  const navigate = useNavigate()
  const createBatchJob = useAdminCreateBatchJob()
  const notification = useNotification()

  const [contextFilters, setContextFilters] =
    useState<Record<string, { filter: string[] }>>()

  const {
    open: openExportModal,
    close: closeExportModal,
    state: exportModalOpen,
  } = useToggleState(false)

  const { isMobile } = useViewportSize()

  const actions = useMemo(() => {
    return [
      <div className="flex gap-4">
        <Button
          key="export"
          variant="primary"
          size="small"
          onClick={() => openExportModal()}
          className="h-[48px]"
        >
          <ExportIcon size={20} />
          Export Orders
        </Button>
        <Button
          key="order_create"
          variant="primary"
          size="small"
          onClick={() => navigate(`/a/order/create`)}
          className="h-[48px]"
        >
          <EditIcon size={20} />
          Create Manual Order
        </Button>
      </div>,
    ]
  }, [view])
  const mobileActions = useMemo(() => {
    return [
      <div className="flex gap-4">
        <Button
          key="order_create"
          variant="primary"
          size="small"
          onClick={() => navigate(`/a/order/create`)}
          className="h-[48px]"
        >
          <EditIcon size={20} />
          Create Manual Order
        </Button>
      </div>,
    ]
  }, [isMobile])

  const handleCreateExport = () => {
    const reqObj = {
      dry_run: false,
      type: "order-export",
      context: contextFilters
        ? transformFiltersAsExportContext(contextFilters)
        : {},
    }

    createBatchJob.mutate(reqObj, {
      onSuccess: () => {
        resetInterval()
        notification(
          t("orders-success", "Success"),
          t(
            "orders-successfully-initiated-export",
            "Successfully initiated export"
          ),
          "success"
        )
      },
      onError: (err) => {
        notification(t("orders-error", "Error"), getErrorMessage(err), "error")
      },
    })

    closeExportModal()
  }

  return (
    <>
      {!isMobile ? (
        <Fragment>
          <div className="gap-y-xsmall flex h-full grow flex-col">
            <div className="flex w-full grow flex-col">
              <BodyCard
                compact={true}
                customHeader={
                  <MsTableViewHeader
                    views={VIEWS}
                    setActiveView={(v) => {
                      if (v === "drafts") {
                        navigate(`/a/draft-orders`)
                      }
                    }}
                    activeView={view}
                    textStyle="text-[32px] font-semibold text-grey-90"
                  />
                }
                className="h-fit border-none bg-inherit"
                insidePadding={false}
                customActionable={actions}
              />
              <MsOrderTable setContextFilters={setContextFilters} />
            </div>
            <Spacer />
          </div>
          {exportModalOpen && (
            <ExportModal
              title={t("orders-export-orders", "Export Orders")}
              handleClose={() => closeExportModal()}
              onSubmit={handleCreateExport}
              loading={createBatchJob.isLoading}
            />
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div className="">
            <div>
              <BodyCard
                compact={true}
                customHeader={
                  <MsTableViewHeader
                    views={VIEWS}
                    setActiveView={(v) => {
                      if (v === "drafts") {
                        navigate(`/a/draft-orders`)
                      }
                    }}
                    activeView={view}
                    textStyle="text-[32px] font-semibold text-grey-90"
                  />
                }
                className="h-fit border-none bg-inherit w-[100vw]"
                customActionable={mobileActions}
                insideClass="px-2 py-2"
              />
            </div>
            <MsOrderTableMobile setContextFilters={setContextFilters} />
          </div>
        </Fragment>
      )}
    </>
  )
}

const Orders = () => {
  const { getNestedRoutes } = useRoutes()

  const nestedRoutes = getNestedRoutes("/products")

  return (
    <Routes>
      <Route index element={<OrderIndex />} />
      <Route path="/:id" element={<Details />} />
      {nestedRoutes.map((r, i) => {
        return (
          <Route
            path={r.path}
            key={i}
            element={<RouteContainer route={r} previousPath={"/orders"} />}
          />
        )
      })}
    </Routes>
  )
}

export default Orders

import { useMemo, useState } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

import { useAdminCreateBatchJob } from "medusa-react"
import RouteContainer from "../../components/extensions/route-container"
import WidgetContainer from "../../components/extensions/widget-container"
import Button from "../../components/fundamentals/button"
import ExportIcon from "../../components/fundamentals/icons/export-icon"
import BodyCard from "../../components/organisms/body-card"

import ExportModal from "../../components/organisms/export-modal"

import useNotification from "../../hooks/use-notification"
import useToggleState from "../../hooks/use-toggle-state"
import { usePolling } from "../../providers/polling-provider"
import { useRoutes } from "../../providers/route-provider"
import { useWidgets } from "../../providers/widget-provider"
import { getErrorMessage } from "../../utils/error-messages"
import { transformFiltersAsExportContext } from "./utils"
import IconSquare from "../../components/fundamentals/icon-square"
import { SetupAccount } from "./setup-account"
import { SetupStore } from "./setup-store"
import AccordionMVN from "../../moveshop-ui/components/molecules/accordion"
import { SetupProduct } from "./setup-product"
// eslint-disable-next-line no-undef

const MoveOnGlobalCard = () => {
  return (
    <div className=" medium:flex hidden items-center justify-between rounded-lg bg-white p-4">
      <div>
        <h2 className="medium:text-2xl mb-3 text-xl font-bold">
          MoveOn Global
        </h2>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
        <Button size="small" variant="secondary" className="mt-3">
          Explore now
        </Button>
      </div>
      <div className="h-[200px] w-[400px] rounded-xl  bg-black"></div>
    </div>
  )
}

const MoveOnGlobalCardSmall = () => {
  return (
    <div className="p-small rounded-lg bg-white ">
      <div className="h-[100px] w-[200px] rounded-xl  bg-black"></div>
      <div className="mt-3">
        <h2 className="mb-3 text-2xl font-bold">MoveOn Global</h2>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
      </div>
      <Button size="small" variant="secondary" className="mt-3">
        Explore now
      </Button>
    </div>
  )
}
const MoveOnGlobal = () => {
  return (
    <>
      <div className="mb-7 mt-12">
        <div className="grid grid-cols-3 items-center justify-center gap-5">
          <div className="h-1 w-full bg-black"></div>
          <div className="flex items-center justify-center gap-3">
            <IconSquare className="h-7 w-7" />
            <div className="medium:text-2xl text-xl font-bold">
              Introducing MoveOn
            </div>
          </div>
          <div className="h-1  rounded-lg bg-black"></div>
        </div>
      </div>
      <div className="p-small rounded-3xl bg-white">
        <MoveOnGlobalCard />
        <div className={"small:block medium:hidden"}>
          <MoveOnGlobalCardSmall />
        </div>
        <div className="medium:flex-row mt-3 flex flex-col items-center justify-between gap-3">
          <MoveOnGlobalCardSmall />
          <MoveOnGlobalCardSmall />
          <MoveOnGlobalCardSmall />
        </div>
      </div>
    </>
  )
}

const HomeIndex = () => {
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

  const { getWidgets } = useWidgets()

  const actions = useMemo(() => {
    return [
      <Button
        key="export"
        variant="secondary"
        size="small"
        onClick={() => openExportModal()}
      >
        <ExportIcon size={20} />
        Export Orders
      </Button>,
    ]
  }, [view])

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
      <div className="gap-y-xsmall flex h-full grow flex-col">
        {getWidgets("order.list.before").map((w, i) => {
          return (
            <WidgetContainer
              key={i}
              injectionZone={"order.list.before"}
              widget={w}
              entity={undefined}
            />
          )
        })}

        <div className="flex w-full grow flex-col">
          <BodyCard>
            <div className="">
              <SetupAccount />
              <SetupStore />
              <SetupProduct />
              <div className="mb-32 mt-12">
                <MoveOnGlobal />
              </div>
            </div>
          </BodyCard>
        </div>
        {getWidgets("order.list.after").map((w, i) => {
          return (
            <WidgetContainer
              key={i}
              injectionZone={"order.list.after"}
              widget={w}
              entity={undefined}
            />
          )
        })}
      </div>
      {exportModalOpen && (
        <ExportModal
          title={t("orders-export-orders", "Export Orders")}
          handleClose={() => closeExportModal()}
          onSubmit={handleCreateExport}
          loading={createBatchJob.isLoading}
        />
      )}
    </>
  )
}

const Home = () => {
  const { getNestedRoutes } = useRoutes()

  const nestedRoutes = getNestedRoutes("/products")

  return (
    <Routes>
      <Route index element={<HomeIndex />} />
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

export default Home

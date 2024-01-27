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
import Details from "./details"
import { transformFiltersAsExportContext } from "./utils"
import CircleQuarterSolid from "../../components/fundamentals/icons/circle-quarter-solid"
import BackButton from "../../components/atoms/back-button"
import IconCircle from "../../components/fundamentals/icon-circle"
import IconSquare from "../../components/fundamentals/icon-square"

const VIEWS = ["orders", "drafts"]
// eslint-disable-next-line no-undef

const Prepare = () => {
  return (
    <>
      <div>
        <div>
          <h1 className="text-2xl"> Prepare your sail to sell</h1>
          <p>
            Here’s a guide to get started. As your business grows, you’ll get
            fresh tips and insights here.
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-[#F2F2F2] p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconCircle />
              <div>
                <p className=" text-xl font-medium">
                  Set up your MoveShop Account
                </p>
                <p>1/5 steps completed</p>
              </div>
            </div>

            <div className=" flex flex-col">
              <div className="flex flex-col space-y-2">
                <label htmlFor="file">
                  <input
                    className="hidden rounded border p-3"
                    type="file"
                    name="file"
                    id="file"
                  />
                  <span className="rounded-lg border bg-white p-3 text-base">
                    Updated Profile
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-7 flex flex-col">
            <label htmlFor="search" className="text-lg font-bold">
              Raptor Shopping
            </label>
            <div className="mt-3 flex ">
              <input
                className="w-1/2 rounded-xl  p-3"
                type="search"
                name="search"
                id="search"
                placeholder="raptorshopping.moveshop.store"
              />
              <Button
                key="search"
                variant="secondary"
                size="small"
                className="my-2 -ml-28 bg-[#D1D1D1] text-sm"
              >
                Share Shop
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ProgressCard = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <span>
          <CircleQuarterSolid size={40} />
          {/* <div className="h-1 w-full bg-black"></div> */}
        </span>
        <span className="mt-3 font-medium">Add Product</span>
      </div>
    </div>
  )
}

const BarCard = () => {
  return (
    <div className="mt-5 flex items-center justify-between rounded bg-[#E7E7E7] p-5">
      <div className="">
        <div className="flex items-center justify-center gap-3">
          <p>
            <IconCircle />
          </p>
          <p className="text-2xl font-bold">Add your first product</p>
        </div>
      </div>
      <div className="flex gap-3 border border-b-0  border-l-2 border-r-0 border-t-0 border-black ">
        <div className="ml-5">
          <IconCircle />
        </div>
      </div>
    </div>
  )
}

const MoveOnGlobalCard = () => {
  return (
    <div className="m-5 flex items-center justify-between rounded-lg bg-white p-5">
      <div>
        <h2 className="mb-3 text-2xl font-bold">MoveOn Global</h2>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
        <BackButton className="mt-3 border" label="Explore now"></BackButton>
      </div>
      <div className="h-[200px] w-[400px] rounded-xl  bg-black"></div>
    </div>
  )
}

const MoveOnGlobalCardSmall = () => {
  return (
    <div className="m-5  rounded-lg bg-white p-5">
      <div className="h-[100px] w-[200px] rounded-xl  bg-black"></div>
      <div className="mt-3">
        <h2 className="mb-3 text-2xl font-bold">MoveOn Global</h2>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
      </div>
    </div>
  )
}
const MoveOnGlobal = () => {
  return (
    <div className="mt-12 rounded-lg bg-[#E7E7E7] p-7">
      <MoveOnGlobalCard />
      <div className="flex items-center justify-between gap-3">
        <MoveOnGlobalCardSmall />
        <MoveOnGlobalCardSmall />
        <MoveOnGlobalCardSmall />
      </div>
    </div>
  )
}

const Setup = () => {
  return (
    <div className="mb-9">
      <div className="mb-3 mt-5">
        <h1 className="text-2xl">Setup with your store</h1>
        <p>
          Write a description, add photos, and set pricing for the products you
          plan to sell.
        </p>
      </div>
      <hr />
      <div className="mt-5 flex justify-between text-center ">
        <ProgressCard />
        <ProgressCard />
        <ProgressCard />
        <ProgressCard />
        <ProgressCard />
      </div>

      <div>
        <BarCard />
        <BarCard />
        <BarCard />
        <BarCard />
        <BarCard />
      </div>

      <div>
        <div className="mt-12 grid grid-cols-3 items-center justify-center gap-5">
          <div className="h-1 w-full bg-black"></div>
          <div className="flex items-center justify-center gap-3">
            <IconCircle />
            <div className="text-2xl font-bold">Introducing MoveOn</div>
          </div>
          <div className="h-1 w-full bg-black"></div>
        </div>
      </div>
      <div>
        <MoveOnGlobal />
      </div>
    </div>
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
            <Prepare />

            <Setup />
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

export default Home

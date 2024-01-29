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
import IconCircle from "../../components/fundamentals/icon-circle"
import IconSquare from "../../components/fundamentals/icon-square"
import InputField from "../../components/molecules/input"

import clsx from "clsx"
import Accordion from "../../components/organisms/accordion"

const VIEWS = ["orders", "drafts"]
// eslint-disable-next-line no-undef

const Prepare = () => {
  return (
    <div className={"mt-small"}>
      <div>
        <h1 className="medium:text-2xl text-xl font-bold">
          Prepare your sail to sell
        </h1>
        <p>
          Here’s a guide to get started. As your business grows, you’ll get
          fresh tips and insights here.
        </p>
      </div>

      <div className="p-small mt-6  rounded-xl bg-[#F2F2F2]">
        <div className="medium:items-center medium:flex-row flex flex-col items-start justify-between gap-4">
          <div className="medium:items-center medium:flex-row flex flex-col  items-start gap-3">
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
          <p className="text-xl font-medium">Raptor Shopping</p>
          <p>
            Write a description, add photos, and set pricing for the products
            you plan to sell.
          </p>
          <div className=" flex mt-3 ">
            <input
              name={"search"}
              type="search"
              placeholder="raptorshopping.moveshop.store"
              className="medium:w-1/3 w-full rounded-xl  p-3"
            />

            <Button
              key="search"
              variant="secondary"
              size="small"
              className="-ml-28 bg-[#D1D1D1] my-2 text-sm"
            >
              Share Shop
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


const MoveOnGlobalCard = () => {
  return (
    <div className=" hidden medium:flex items-center justify-between rounded-lg bg-white p-4">
      <div>
        <h2 className="mb-3 medium:text-2xl text-xl font-bold">MoveOn Global</h2>
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
    <div className="rounded-lg bg-white p-small ">
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

      <div className="mt-12 mb-7">
        <div className="grid grid-cols-3 items-center justify-center gap-5">
          <div className="h-1 w-full bg-black"></div>
          <div className="flex items-center justify-center gap-3">
            <IconSquare className="h-7 w-7" />
            <div className="medium:text-2xl text-xl font-bold">Introducing MoveOn</div>
          </div>
          <div className="h-1  bg-black"></div>
        </div>
      </div>
      <div className="rounded-3xl bg-[#E7E7E7] p-small">
        <MoveOnGlobalCard />
        <div className={"small:block medium:hidden"}>
          <MoveOnGlobalCardSmall />
        </div>
        <div className="flex flex-col medium:flex-row items-center justify-between gap-3 mt-3">
          <MoveOnGlobalCardSmall />
          <MoveOnGlobalCardSmall />
          <MoveOnGlobalCardSmall />
        </div>
      </div>
    </>
  )
}


const stepperData = [
  { id: 1, title: "Step 1", content: "Add Product", status: "active" },
  { id: 2, title: "Step 2", content: "Shipping", status: "active" },
  { id: 3, title: "Step 3", content: "Payments", status: "active" },
  { id: 4, title: "Step 4", content: "Online Store", status: "inactive" },
  { id: 5, title: "Step 5", content: "Launch", status: "inactive" },

]

const StepActive = ({ step, isLastIndex }: any) => {
  return (
    <li className={clsx("flex justify-between  items-center w-full", {
      "text-blue-600 dark:text-blue-500": true,
      "after:content-[\"\"] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800": true, // active line
      "w-1/12": isLastIndex,
    })}>
      <span
        className={clsx("flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0", {
          "text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300": true,
        })}>
        <svg className={clsx("w-3.5 h-3.5", {
          "text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300": true,
        })} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M1 5.917 5.724 10.5 15 1.5" />
        </svg>
      </span>

    </li>
  )
}


const StepTitle = ({ title, isLastIndex }: any) => {
  return (

    <>
      <li className={clsx("flex justify-between items-center w-full", {
        "dark:after:border-gray-700": true,
        "w-1/12": isLastIndex,
      })}>
        <span
          className={clsx("flex items-center justify-center rounded-full font-bold lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0", {
            "text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100": false,
          })}>
          {title}
      </span>
      </li>
    </>
  )
}


const StepInactive = ({ isLastIndex, step }: any) => {
  return (

    <>
      <li className={clsx("flex justify-between items-center ", {
        "after:content-[\"\"] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700 w-full": !isLastIndex,
        "w-1/12": isLastIndex,
      })}>
        <span
          className={clsx("flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0", {
            "text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100": true,
          })}>


      </span>
      </li>
    </>
  )
}
const Stepper = ({ label }: any) => {

  const lastIndex = stepperData.length - 1


  return (
    <div>

      <ol className="flex items-center justify-between w-full">
        {stepperData.map((step, index) => {

          if (step.status === "active") {
            return <StepActive isLastIndex={lastIndex === index} step={step} />
          } else {
            return <StepInactive isLastIndex={lastIndex === index} step={step} />
          }

        })}

      </ol>
      <br />
      <ol className="flex items-center justify-between w-full">
        {stepperData.map((step, index) => <StepTitle title={step?.content} isLastIndex={lastIndex === index} />)}
      </ol>
    </div>
  )
}




const OnboardingIndex = () => {
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
            "Successfully initiated export",
          ),
          "success",
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
            <Stepper />
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

const Onboarding = () => {
  const { getNestedRoutes } = useRoutes()

  const nestedRoutes = getNestedRoutes("/products")

  return (
    <Routes>
      <Route index element={<OnboardingIndex />} />
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

export default Onboarding

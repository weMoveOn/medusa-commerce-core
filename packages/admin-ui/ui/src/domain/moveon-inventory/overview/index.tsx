import { useAdminCreateBatchJob, useAdminCreateCollection } from "medusa-react"
import React, { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Fade from "../../../components/atoms/fade-wrapper"
import Spacer from "../../../components/atoms/spacer"
import Button from "../../../components/fundamentals/button"
import ExportIcon from "../../../components/fundamentals/icons/export-icon"
import PlusIcon from "../../../components/fundamentals/icons/plus-icon"
import UploadIcon from "../../../components/fundamentals/icons/upload-icon"
import BodyCard from "../../../components/organisms/body-card"
import TableViewHeader from "../../../components/organisms/custom-table-header"
import ExportModal from "../../../components/organisms/export-modal"
import AddCollectionModal from "../../../components/templates/collection-modal"
import CollectionsTable from "../../../components/templates/collections-table"
import MoveOnProduct from "../../../components/templates/moveon-product"
import useNotification from "../../../hooks/use-notification"
import useToggleState from "../../../hooks/use-toggle-state"
import { usePolling } from "../../../providers/polling-provider"
import { getErrorMessage } from "../../../utils/error-messages"

type ViewsType = "Product List" | "Imported Products"

const VIEWS: ViewsType[] = ["Product List", "Imported Products"]

const Overview = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const url = useMemo(() => {
    const currentUrl = new URL(window.location.href)
    return currentUrl
  }, [])

  const searchParams = useMemo(() => {
    const currentSearchParams = new URLSearchParams(url.search)
    return currentSearchParams
  }, [url])

  const [view, setView] = useState<ViewsType>("Product List")
  const {
    state: createProductState,
    close: closeProductCreate,
    open: openProductCreate,
  } = useToggleState()

  const { resetInterval } = usePolling()
  const createBatchJob = useAdminCreateBatchJob()

  const notification = useNotification()

  const createCollection = useAdminCreateCollection()

  useEffect(() => {
    if (location.search.includes("?view=product-list")) {
      setView("Product List")
    }
  }, [location, view, searchParams])

  useEffect(() => {
    switch (view) {
      case "Imported Products":
        searchParams.set("view", "imported-product")
        break
      case "Product List":
        searchParams.set("view", "product-list")
        break

      default:
        searchParams.delete("view")
    }

    const offset = searchParams.get("offset")
    const limit = searchParams.get("limit")
    searchParams.delete("offset")
    searchParams.delete("limit")
    if (offset !== null) {
      searchParams.set("offset", offset)
    }
    if (limit !== null) {
      searchParams.set("limit", limit)
    }

    url.search = searchParams.toString()
    window.history.replaceState(null, "", url.href)
  }, [view, searchParams, url])

  const CurrentView = () => {
    switch (view) {
      case "Product List":
        return <MoveOnProduct />
      default:
        return <CollectionsTable />
    }
  }

  const CurrentAction = () => {
    switch (view) {
      case "Product List":
        return (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => openImportModal()}
            >
              <UploadIcon size={20} />
              Import Products
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => openExportModal()}
            >
              <ExportIcon size={20} />
              Export Products
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={openProductCreate}
            >
              <PlusIcon size={20} />
              New Product
            </Button>
          </div>
        )
      default:
        return (
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => setShowNewCollection(!showNewCollection)}
            >
              <PlusIcon size={20} />
              New Collection
            </Button>
          </div>
        )
    }
  }

  const [showNewCollection, setShowNewCollection] = useState(false)
  const {
    open: openExportModal,
    close: closeExportModal,
    state: exportModalOpen,
  } = useToggleState(false)

  const {
    open: openImportModal,
    close: closeImportModal,
    state: importModalOpen,
  } = useToggleState(false)

  const handleCreateCollection = async (data, colMetadata) => {
    const metadata = colMetadata
      .filter((m) => m.key && m.value) // remove empty metadata
      .reduce((acc, next) => {
        return {
          ...acc,
          [next.key]: next.value,
        }
      }, {})

    await createCollection.mutateAsync(
      { ...data, metadata },
      {
        onSuccess: ({ collection }) => {
          notification("Success", "Successfully created collection", "success")
          navigate(`/a/collections/${collection.id}`)
          setShowNewCollection(false)
        },
        onError: (err) => notification("Error", getErrorMessage(err), "error"),
      }
    )
  }

  const handleCreateExport = () => {
    const reqObj = {
      type: "product-export",
      context: {},
      dry_run: false,
    }

    createBatchJob.mutate(reqObj, {
      onSuccess: () => {
        resetInterval()
        notification("Success", "Successfully initiated export", "success")
      },
      onError: (err) => {
        notification("Error", getErrorMessage(err), "error")
      },
    })

    closeExportModal()
  }

  return (
    <>
      <div className="flex h-full grow flex-col">
        <div className="flex w-full grow flex-col">
          <BodyCard
            forceDropdown={false}
            customActionable={CurrentAction()}
            customHeader={
              <TableViewHeader
                views={VIEWS}
                setActiveView={setView}
                activeView={view}
              />
            }
            className="h-fit"
          >
            <CurrentView />
          </BodyCard>
          <Spacer />
        </div>
      </div>

      {showNewCollection && (
        <AddCollectionModal
          onClose={() => setShowNewCollection(!showNewCollection)}
          onSubmit={handleCreateCollection}
        />
      )}
      {exportModalOpen && (
        <ExportModal
          title="Export Products move shop"
          handleClose={() => closeExportModal()}
          onSubmit={handleCreateExport}
          loading={createBatchJob.isLoading}
        />
      )}
      {importModalOpen && (
        // <ImportProducts handleClose={() => closeImportModal()} />
        <span>ImportProducts</span>
      )}
      <Fade isVisible={createProductState} isFullScreen={true}>
        {/* <NewProduct onClose={closeProductCreate} /> */}
        <span>ImportProducts</span>
      </Fade>
    </>
  )
}

export default React.memo(Overview)

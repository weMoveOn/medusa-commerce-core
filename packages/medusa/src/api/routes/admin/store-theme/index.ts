import { Router } from "express"
import multer from "multer"
import { DeleteResponse } from "../../../../types/common"

import middlewares, { transformBody } from "../../../middlewares"
import { FileServiceUploadResult } from "@medusajs/types"
import {StoreTheme} from "../../../../models";

const route = Router()
const upload = multer({ dest: "uploads/" })

export default (app) => {
  app.use("/store-theme", route)

  route.post(
    "/create",
    upload.array("files"),
    middlewares.wrap(require("./create-upload").default)
  )

  route.post(
    "/:id/publish",
    middlewares.wrap(require("./theme-publish").default)
  )

  route.post(
    "/:id/duplicate",
    middlewares.wrap(require("./duplicate-theme").default)
  )

  return app
}



export const defaultAdminStoreThemeFields: (keyof StoreTheme)[] = [
  "id",
  "store_id",
  "name",
  "is_published",
  "serving_type",
  "archive_path",
  "serving_path",
  "created_at",
  "updated_at",
  "deleted_at",
]

export type AdminUploadsRes = {
  uploads: FileServiceUploadResult[]
}

export type AdminDeleteUploadsRes = DeleteResponse

export type AdminUploadsDownloadUrlRes = {
  download_url: string
}

export * from "./create-upload"
export * from "./duplicate-theme"
export * from "./theme-publish"

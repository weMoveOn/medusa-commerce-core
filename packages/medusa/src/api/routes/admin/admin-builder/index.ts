import { Router } from "express"
import middlewares from "../../../middlewares"

export default (app) => {
  const route = Router()
  app.use("/admin-builder", route)
  route.post(
    "/create",
    middlewares.wrap(require("./create-admin-builder").default)
  )
  route.get("/", middlewares.wrap(require("./retrieve-admin-builder").default))

  route.get(
    "/:property_id",
    middlewares.wrap(require("./retrieve-by-property-id-admin-builder").default)
  )
  route.put(
    "/update",
    middlewares.wrap(require("./update-admin-builder").default)
  )

  return app
}

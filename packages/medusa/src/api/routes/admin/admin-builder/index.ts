import { Router } from "express"
import middlewares from "../../../middlewares"

export default (app) => {
  const route = Router()
  app.use("/admin-builder", route)

  // route.get("/", async (req, res) => {
  //   const AdminBuilder: AdminBuilderService = req.scope.resolve(
  //     "adminBuilderService"
  //   )

  //   const bodyData = req.body
  //   const result = AdminBuilder.create(bodyData)

  //   res.json({
  //     data: result,
  //   })
  // })
  route.post(
    "/create",
    middlewares.wrap(require("./create-admin-builder").default)
  )

  return app
}

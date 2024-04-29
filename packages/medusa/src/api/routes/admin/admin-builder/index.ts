import { Router } from "express"
import { PaginatedResponse } from "../../../../types/common"
import middlewares from "../../../middlewares"

const route = Router()

export default (app) => {
  app.use("/builder", route)

  route.post("/create", middlewares.wrap(require("./create-admin-builder").default))
  route.get("/", (req, res) => {
    res.send({ success: true })
  })
  return app
}

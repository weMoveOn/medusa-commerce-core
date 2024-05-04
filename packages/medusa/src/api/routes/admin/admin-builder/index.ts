import { Router } from "express"
import { AdminBuilder } from "../../../../models/admin-builder"

export default (app) => {
  const route = Router()
  app.use("/admin-builder", route)

  route.get("/", async (req, res) => {
    const bodyData = req.body

    const manager = req.scope.resolve("manager")

    const repo = manager.getRepository(AdminBuilder)
    const result = await repo.find()

    res.json({
      data: result,
    })
  })

  route.post("/create", async (req, res) => {
    const bodyData = req.body

    const manager = req.scope.resolve("manager")

    const repo = manager.getRepository(AdminBuilder)
    const result = await repo.save(bodyData)

    res.json({
      data: result,
    })
  })
  return app
}

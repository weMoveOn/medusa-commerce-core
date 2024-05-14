import { promiseAll } from "@medusajs/utils"
import fs from "fs"
import { StoreThemeService } from "../../../../services";
import {EntityManager} from "typeorm";

export default async (req, res) => {
  const fileService = req.scope.resolve("fileService")

  const result = await promiseAll(
    req.files.map(async (f) => {
      return fileService.upload(f).then((result) => {
        fs.unlinkSync(f.path)
        return result
      })
    })
  )
  const storeThemeService: StoreThemeService = req.scope.resolve(
      "storeThemeService"
  )
  const manager: EntityManager = req.scope.resolve("manager")

  const created = await manager.transaction(async (transactionManager) => {
    return await storeThemeService
        .withTransaction(transactionManager)
        .create(result)
  })

  res.status(200).json({ theme: created })
}

export class IAdminPostUploadsFileReq {
  originalName: string
  path: string
}

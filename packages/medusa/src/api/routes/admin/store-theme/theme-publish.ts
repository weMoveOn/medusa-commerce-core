import { promiseAll } from "@medusajs/utils"
import fs from "fs"
import { StoreThemeService } from "../../../../services";
import {EntityManager} from "typeorm";
import {validator} from "../../../../utils";
import {IsString} from "class-validator";
import {defaultAdminReturnReasonsFields, defaultAdminReturnReasonsRelations} from "../return-reasons";
import {defaultAdminStoreThemeFields} from "./index";

export default async (req, res) => {
  const { id } = req.params

  const { store_id } = await validator(AdminStoreThemePublishQuery, req.query)

  const storeThemeService: StoreThemeService = req.scope.resolve(
      "storeThemeService"
  )
  const manager: EntityManager = req.scope.resolve("manager")

  await manager.transaction(async (transactionManager) => {
    return await storeThemeService
        .withTransaction(transactionManager)
        .update(store_id,id)
  })
  const reason = await storeThemeService.retrieve(store_id, id, {
    select: defaultAdminStoreThemeFields,
  })

  res.status(200).json({ theme: reason })
}

export class IAdminThemePublish {
  originalName: string
  path: string
}
class AdminStoreThemePublishQuery {
  @IsString()
  store_id: string
}
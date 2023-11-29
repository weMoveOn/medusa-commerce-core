import { asValue, createContainer } from "awilix"
import getMigrations, {
  getModuleSharedResources,
  revertIsolatedModulesMigration,
  runIsolatedModulesMigration,
} from "./utils/get-migrations"

import { createMedusaContainer } from "@medusajs/utils"
import configModuleLoader from "../loaders/config"
import databaseLoader from "../loaders/database"
import featureFlagLoader from "../loaders/feature-flags"
import Logger from "../loaders/logger"
import { loadMedusaApp } from "../loaders/medusa-app"
import pgConnectionLoader from "../loaders/pg-connection"

const getDataSource = async (directory) => {
  const configModule = configModuleLoader(directory)
  const featureFlagRouter = featureFlagLoader(configModule)
  const { coreMigrations } = getMigrations(directory, featureFlagRouter)
  const { migrations: moduleMigrations } = getModuleSharedResources(
    configModule,
    featureFlagRouter
  )

  const container = createContainer()
  container.register("db_entities", asValue([]))

  return await databaseLoader({
    container,
    configModule,
    customOptions: {
      migrations: coreMigrations.concat(moduleMigrations),
      logging: "all",
    },
  })
}

const runLinkMigrations = async (directory) => {
  const configModule = configModuleLoader(directory)
  const container = createMedusaContainer()
  const featureFlagRouter = featureFlagLoader(configModule)

  container.register({
    featureFlagRouter: asValue(featureFlagRouter),
  })

  await pgConnectionLoader({ configModule, container })

  const { runMigrations } = await loadMedusaApp(
    { configModule, container },
    { registerInContainer: false }
  )

  const options = {
    database: {
      clientUrl: configModule.projectConfig.database_url,
    },
  }
  await runMigrations(options)
}

const main = async function ({ directory }) {
  const args = process.argv

  args.shift()
  args.shift()
  args.shift()

  const configModule = configModuleLoader(directory)
  const dataSource = await getDataSource(directory)

  if (args[0] === "run") {
    await dataSource.runMigrations()
    await dataSource.destroy()
    await runIsolatedModulesMigration(configModule)

    await runLinkMigrations(directory)
    process.exit()

    Logger.info("Migrations completed.")
  } else if (args[0] === "revert") {
    await dataSource.undoLastMigration({ transaction: "all" })
    await dataSource.destroy()
    await revertIsolatedModulesMigration(configModule)
    Logger.info("Migrations reverted.")
  } else if (args[0] === "show") {
    const unapplied = await dataSource.showMigrations()
    Logger.info(unapplied)
    await dataSource.destroy()
    process.exit(unapplied ? 1 : 0)
  }
}

export default main

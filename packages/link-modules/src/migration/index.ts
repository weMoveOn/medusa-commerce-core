import {
  JoinerRelationship,
  LoaderOptions,
  Logger,
  ModuleJoinerConfig,
  ModuleServiceInitializeOptions,
} from "@medusajs/types"
import { generateEntity } from "../utils"

import { DALUtils, ModulesSdkUtils } from "@medusajs/utils"

export function getMigration(
  joinerConfig: ModuleJoinerConfig,
  serviceName: string,
  primary: JoinerRelationship,
  foreign: JoinerRelationship
) {
  return async function runMigrations(
    {
      options,
      logger,
    }: Pick<
      LoaderOptions<ModuleServiceInitializeOptions>,
      "options" | "logger"
    > = {} as any
  ) {
    logger ??= console as unknown as Logger

    const dbData = ModulesSdkUtils.loadDatabaseConfig("link_modules", options)
    const entity = generateEntity(joinerConfig, primary, foreign)
    const pathToMigrations = __dirname + "/../migrations"

    const orm = await DALUtils.mikroOrmCreateConnection(
      dbData,
      [entity],
      pathToMigrations
    )

    const tableName = entity.meta.collection

    let hasTable = false
    try {
      await orm.em.getConnection().execute(`SELECT 1 FROM ${tableName} LIMIT 0`)
      hasTable = true
    } catch {}

    const generator = orm.getSchemaGenerator()
    if (hasTable) {
      /* const updateSql = await generator.getUpdateSchemaSQL()
      const entityUpdates = updateSql
        .split(";")
        .map((sql) => sql.trim())
        .filter((sql) =>
          sql.toLowerCase().includes(`alter table "${tableName.toLowerCase()}"`)
        )

      if (entityUpdates.length > 0) {
        try {
          await generator.execute(entityUpdates.join(";"))
          logger.info(`Link module "${serviceName}" migration executed`)
        } catch (error) {
          logger.error(
            `Link module "${serviceName}" migration failed to run - Error: ${error}`
          )
        }
      } else {
        logger.info(`Skipping "${tableName}" migration.`)
      }*/
      logger.info(
        `Link module "${serviceName}" table update skipped because the table already exists. Please write your own migration if needed.`
      )
    } else {
      try {
        await generator.createSchema()

        logger.info(`Link module "${serviceName}" migration executed`)
      } catch (error) {
        logger.error(
          `Link module "${serviceName}" migration failed to run - Error: ${error}`
        )
      }
    }

    await orm.close()
  }
}

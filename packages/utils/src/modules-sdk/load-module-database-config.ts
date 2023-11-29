import { MedusaError } from "../common"
import { ModulesSdkTypes } from "@medusajs/types"

function getEnv(key: string, moduleName: string): string {
  const value =
    process.env[`${moduleName.toUpperCase()}_${key}`] ??
    process.env[`MEDUSA_${key}`] ??
    process.env[`${key}`]
  return value ?? ""
}

function isModuleServiceInitializeOptions(
  obj: unknown
): obj is ModulesSdkTypes.ModuleServiceInitializeOptions {
  return !!(obj as any)?.database
}

function getDefaultDriverOptions(clientUrl: string) {
  const localOptions = {
    connection: {
      ssl: false,
    },
  }

  const remoteOptions = {
    connection: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }

  if (clientUrl) {
    return clientUrl.match(/localhost/i) ? localOptions : remoteOptions
  }

  return process.env.NODE_ENV?.match(/prod/i)
    ? remoteOptions
    : process.env.NODE_ENV?.match(/dev/i)
    ? localOptions
    : {}
}

function getDatabaseUrl(
  config: ModulesSdkTypes.ModuleServiceInitializeOptions
): string {
  const { clientUrl, host, port, user, password, database } = config.database!
  if (clientUrl) {
    return clientUrl
  }
  return `postgres://${user}:${password}@${host}:${port}/${database}`
}

/**
 * Load the config for the database connection. The options can be retrieved
 * e.g through PRODUCT_* (e.g PRODUCT_POSTGRES_URL) or * (e.g POSTGRES_URL) environment variables or the options object.
 * @param options
 * @param moduleName
 */
export function loadDatabaseConfig(
  moduleName: string,
  options?: ModulesSdkTypes.ModuleServiceInitializeOptions,
  silent: boolean = false
): Pick<
  ModulesSdkTypes.ModuleServiceInitializeOptions["database"],
  "clientUrl" | "schema" | "driverOptions" | "debug"
> {
  const clientUrl = getEnv("POSTGRES_URL", moduleName)
  
  const database = {
    clientUrl,
    schema: getEnv("POSTGRES_SCHEMA", moduleName) ?? "public",
    driverOptions: JSON.parse(
      getEnv("POSTGRES_DRIVER_OPTIONS", moduleName) ||
        JSON.stringify(getDefaultDriverOptions(clientUrl))
    ),
    debug: process.env.NODE_ENV?.startsWith("dev") ?? false,
  }

  if (isModuleServiceInitializeOptions(options)) {
    database.clientUrl = getDatabaseUrl(options)
    database.schema = options.database!.schema ?? database.schema
    database.driverOptions =
      options.database!.driverOptions ??
      getDefaultDriverOptions(database.clientUrl)
    database.debug = options.database!.debug ?? database.debug
  }

  if (!database.clientUrl && !silent) {
    throw new MedusaError(
      MedusaError.Types.INVALID_ARGUMENT,
      "No database clientUrl provided. Please provide the clientUrl through the [MODULE]_POSTGRES_URL, MEDUSA_POSTGRES_URL or POSTGRES_URL environment variable or the options object in the initialize function."
    )
  }

  return database
}

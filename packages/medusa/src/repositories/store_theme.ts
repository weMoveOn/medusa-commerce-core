import { StoreTheme } from "../models"
import { dataSource } from "../loaders/database"

export const StoreThemeRepository = dataSource.getRepository(StoreTheme)

export default StoreThemeRepository

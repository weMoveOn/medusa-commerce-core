import { StoreTheme } from "../models"
import { dataSource } from "../loaders/database"

const StoreThemeRepository = dataSource.getRepository(StoreTheme)

export default StoreThemeRepository

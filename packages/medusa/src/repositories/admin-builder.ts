import { dataSource } from "../loaders/database"
import { AdminBuilder } from "../models/admin-builder"

export const AdminBuilderRepository = dataSource.getRepository(AdminBuilder)
export default AdminBuilderRepository

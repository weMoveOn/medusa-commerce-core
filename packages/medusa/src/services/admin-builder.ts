import { EntityManager } from "typeorm"
import { AdminBuilder } from "../models/admin-builder"
import { IAdminBuildersCreate } from "../interfaces/admin-builder"
import { TransactionBaseService } from "../interfaces"
import { buildQuery } from "../utils"
type InjectedDependencies = {
  manager: EntityManager
  adminBuilderRepository: typeof AdminBuilder
}

class AdminBuilderService extends TransactionBaseService {
  constructor(container: InjectedDependencies) {
    super(container)
  }

  async create(createData: IAdminBuildersCreate) {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      // Exist
      const exist = await this.update(createData, createData.property_id)
      if (exist) {
        exist.property_id = createData.property_id
        exist.type = createData.type
        exist.value = createData.value
        const result = await adminBuilderRepository.save(exist)
        return result
      } else {
        const data = adminBuilderRepository.create(createData)
        const result = await adminBuilderRepository.save(data)
        return result
      }
    } catch (error: any) {
      throw error
    }
  }
  async update(createData: IAdminBuildersCreate, property_id: string) {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      const exist = await this.getByPropertyId(property_id)
      if (exist) {
        exist.property_id = createData.property_id
        exist.type = createData.type
        exist.value = createData.value
        const result = await adminBuilderRepository.save(exist)
        return result
      } else {
        // TODO: need to handle later
        return null
      }
    } catch (error: any) {
      throw error
    }
  }
  async get() {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      const result = await adminBuilderRepository.find()

      return result
    } catch (error: any) {
      throw error
    }
  }
  async getByPropertyId(id: string) {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      const query = buildQuery({ property_id: id })
      const result = await adminBuilderRepository.findOne(query)

      return result
    } catch (error: any) {
      throw error
    }
  }
}

export default AdminBuilderService

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
      const data = adminBuilderRepository.create(createData)
      const result = await adminBuilderRepository.save(data)

      return result
    } catch (error: any) {
      if (error.detail?.includes("already exists")) {
        throw {
          status: 422,
          data: {
            errors: [],
          },
        }
      } else {
        this.handleErrorResponse(error)
      }
    }
  }
  async get() {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      const result = await adminBuilderRepository.find()

      return result
    } catch (error: any) {
      if (error.detail?.includes("already exists")) {
        throw {
          status: 422,
          data: {
            errors: [],
          },
        }
      } else {
        this.handleErrorResponse(error)
      }
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
      if (error.detail?.includes("already exists")) {
        throw {
          status: 422,
          data: {
            errors: [],
          },
        }
      } else {
        this.handleErrorResponse(error)
      }
    }
  }

  // Reusable error handling function
  private handleErrorResponse(error: any): never {
    if (error.type === "not_found") {
      throw {
        status: 404,
        data: error,
      }
    } else if (error.response) {
      throw {
        status: error.response.status,
        data: error,
      }
    } else if (error.request) {
      throw {
        status: 500,
        data: error,
      }
    } else {
      throw {
        status: 500,
        data: error,
      }
    }
  }
}

export default AdminBuilderService

import { EntityManager } from "typeorm"
import { AdminBuilder } from "../models/admin-builder"
import { IAdminBuildersCreate } from "../interfaces/admin-builder"
import { TransactionBaseService } from "../interfaces"

type InjectedDependencies = {
  manager: EntityManager
  priceRoleRepository: typeof AdminBuilder
}

class AdminBuilderService extends TransactionBaseService {
  constructor(container: InjectedDependencies) {
    super(container)
  }

  async create(createData: IAdminBuildersCreate): Promise<AdminBuilder> {
    const adminBuilderRepository =
      this.activeManager_.getRepository(AdminBuilder)
    try {
      // @ts-ignore
      const data = adminBuilderRepository.create(createData)
      return await adminBuilderRepository.save(data)
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

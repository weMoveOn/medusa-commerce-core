import { FulfillmentTypes, IFulfillmentModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"
import { StepResponse, createStep } from "@medusajs/workflows-sdk"

export const createFulfillmentStepId = "create-fulfillment"
/**
 * This step creates a fulfillment
 */
export const createFulfillmentStep = createStep(
  createFulfillmentStepId,
  async (data: FulfillmentTypes.CreateFulfillmentDTO, { container }) => {
    const service = container.resolve<IFulfillmentModuleService>(
      Modules.FULFILLMENT
    )

    const fulfillment = await service.createFulfillment(data)

    return new StepResponse(fulfillment, fulfillment.id)
  },
  async (id, { container }) => {
    if (!id) {
      return
    }

    const service = container.resolve<IFulfillmentModuleService>(
      Modules.FULFILLMENT
    )

    await service.cancelFulfillment(id)
  }
)

import { EntityManager } from "typeorm"
import { CartService, EventBusService } from "../services"

type InjectedDependencies = {
  eventBusService: EventBusService
  cartService: CartService
  manager: EntityManager
}

class CartSubscriber {
  protected readonly manager_: EntityManager
  protected readonly cartService_: CartService
  protected readonly eventBus_: EventBusService

  constructor({ manager, cartService, eventBusService }: InjectedDependencies) {
    this.cartService_ = cartService
    this.eventBus_ = eventBusService
    this.manager_ = manager

      //#TODO: should remove any
    this.eventBus_.subscribe(
      CartService.Events.CUSTOMER_UPDATED,
      async (storeId:any,cartId:string) => {
        await this.onCustomerUpdated(storeId,cartId)
      }
    )
  }

  async onCustomerUpdated(storeId:string,cartId:string) {
    await this.manager_.transaction(
      "SERIALIZABLE",
      async (transactionManager) => {
        const cartServiceTx =
          this.cartService_.withTransaction(transactionManager)

        const cart = await cartServiceTx.retrieve(storeId,cartId,{
          relations: ["payment_sessions"],
        })

        if (!cart.payment_sessions?.length) {
          return
        }

        return await cartServiceTx.setPaymentSessions(storeId,cart.id)
      }
    )
  }
}

export default CartSubscriber

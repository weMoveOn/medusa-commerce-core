# Database Transaction Not Rolling Back When Promise.all is Used

Due to how `Promise.all` works, when you run multiple database transactions within it, these transactions may not be rolled back when an error occurs.

To mitigate this issue, use the `promiseAll` function which can be imported from `@medusajs/utils`. For example:

```ts
import { promiseAll } from "@medusajs/utils"
import { TransactionBaseService } from "@medusajs/medusa"

class MyService extends TransactionBaseService {
  async performTransactions() {
    return await promiseAll([
      // your transactions....
    ])
  }
}
```

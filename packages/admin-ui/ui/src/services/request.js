import axios from "axios"
import {
  MEDUSA_BACKEND_URL,
  MOVEON_INVENTORY_URL,
} from "../constants/medusa-backend-url"

const client = axios.create({ baseURL: MEDUSA_BACKEND_URL })
const clientForMoveOnInventory = axios.create({ baseURL: MOVEON_INVENTORY_URL })

const token = `15750|OkfmLCz1pkWsuUZutblbUCmL5iINhcyaWfY60TYh`

export default function medusaRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
  }
  return client(options)
}

export function moveOnInventoryRequest(method, path = "", payload = {}) {
  const options = {
    method,
    withCredentials: true,
    url: path,
    data: payload,
    json: true,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return clientForMoveOnInventory(options)
}

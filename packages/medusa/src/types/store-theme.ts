export type CreateStoreTheme = {
  url: string
  key: string
}

export type UpdateReturnReason = {
  description?: string
  label?: string
  parent_return_reason_id?: string
  metadata?: Record<string, unknown>
}

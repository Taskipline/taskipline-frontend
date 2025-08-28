export interface SerializedError {
  message: string
  code?: string
  field?: string
}

export type BackendErrorResponse =
  | { errors: SerializedError[] }
  | { message: string }

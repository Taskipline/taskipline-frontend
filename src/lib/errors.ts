import { SerializedError } from '@/types/error'

export class ApiError extends Error {
  statusCode: number
  errors: SerializedError[]

  constructor(statusCode: number, errors: SerializedError[]) {
    // Use the message from the first error as the primary error message
    // This is useful for simple toast notifications
    super(errors[0]?.message || 'An API error occurred')

    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

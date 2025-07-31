import axios, { AxiosError } from 'axios'
import { apiUrl } from '@/lib/env'
import { useAuthStore } from '@/stores/authStore'
import { BackendErrorResponse, SerializedError } from '@/types/error'
import { ApiError } from './errors'

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response.status
      const data = error.response.data as BackendErrorResponse

      // Case 1: Handle structured errors (e.g., from auth endpoints)
      if (data && 'errors' in data && Array.isArray(data.errors)) {
        return Promise.reject(new ApiError(statusCode, data.errors))
      }

      // Case 2: Handle simple errors (e.g., from waitlist endpoint)
      if (data && 'message' in data && typeof data.message === 'string') {
        const serializedErrors: SerializedError[] = [{ message: data.message }]
        return Promise.reject(new ApiError(statusCode, serializedErrors))
      }
    }

    // Fallback for genuine network errors or unexpected formats
    return Promise.reject(
      new ApiError(500, [{ message: 'A network error occurred.' }])
    )
  }
)

export default apiClient

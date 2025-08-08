import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { apiUrl } from '@/lib/env'
import { useAuthStore, type User } from '@/stores/authStore'
import { BackendErrorResponse, SerializedError } from '@/types/error'
import { ApiError } from './errors'

export type RefreshResponse = { accessToken: string; user?: User }

export async function refreshAccessToken() {
  const res = await axios.post<RefreshResponse>(
    `${apiUrl}/auth/refresh-token`,
    {},
    { withCredentials: true }
  )
  return res.data
}

let isRefreshing = false
let failedQueue: Array<{
  resolve: (accessToken: string) => void
  reject: (err: unknown) => void
}> = []

const processQueue = (error?: unknown, accessToken?: string) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else if (accessToken) resolve(accessToken)
    else reject(new Error('No accessToken'))
  })
  failedQueue = []
}

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { accessToken } = useAuthStore.getState()

    if (accessToken) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      if (originalRequest?.url?.includes('/auth/refresh-token')) {
        useAuthStore.getState().logout?.()
        if (typeof window !== 'undefined') window.location.href = '/signin'
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then((newAccessToken) => {
          originalRequest._retry = true
          originalRequest.headers = originalRequest.headers ?? {}
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return apiClient(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const data = await refreshAccessToken()
        const newAccessToken = data.accessToken

        const authState = useAuthStore.getState()
        const maybeSetAccessToken = (
          authState as { setAccessToken?: (t: string) => void }
        ).setAccessToken
        if (typeof maybeSetAccessToken === 'function') {
          maybeSetAccessToken(newAccessToken)
        } else if (typeof authState.setAuth === 'function') {
          authState.setAuth(newAccessToken, authState.user as User)
        }

        processQueue(undefined, newAccessToken)

        // Retry the original request
        originalRequest.headers = originalRequest.headers ?? {}
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
        return apiClient(originalRequest)
      } catch (refreshErr) {
        processQueue(refreshErr)
        useAuthStore.getState().logout?.()
        if (typeof window !== 'undefined') window.location.href = '/signin'
        return Promise.reject(refreshErr)
      } finally {
        isRefreshing = false
      }
    }

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

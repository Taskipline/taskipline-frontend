import { User } from '@/stores/authStore'

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface SignupCredentials {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface SignupResponse {
  message: string
}

export interface ResendLinkResponse {
  message: string
}

export interface ForgotPasswordResponse {
  message: string
}

export interface ResetPasswordCredentials {
  token: string
  password: string
  confirmPassword: string
}

export type GoogleAuthPayload = {
  code: string
}

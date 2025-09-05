import apiClient from '@/lib/apiClient'
import {
  ForgotPasswordResponse,
  GoogleAuthPayload,
  LoginCredentials,
  LoginResponse,
  ResendLinkResponse,
  ResetPasswordCredentials,
  SignupCredentials,
  SignupResponse,
} from '@/types/auth'

export const signin = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    '/auth/signin',
    credentials
  )
  return response.data
}

export const signup = async (
  credentials: SignupCredentials
): Promise<SignupResponse> => {
  const response = await apiClient.post<SignupResponse>(
    '/auth/signup',
    credentials
  )
  return response.data
}

export const verifyAccount = async (token: string): Promise<void> => {
  await apiClient.get(`/auth/verify/${token}`)
}

export const resendVerificationLink = async (
  email: string
): Promise<ResendLinkResponse> => {
  const response = await apiClient.post<ResendLinkResponse>(
    '/auth/resend-verification',
    { email }
  )
  return response.data
}

export const forgotPassword = async (
  email: string
): Promise<ForgotPasswordResponse> => {
  const response = await apiClient.post<ForgotPasswordResponse>(
    '/auth/forgot-password',
    { email }
  )
  return response.data
}

export const resetPassword = async (
  credentials: ResetPasswordCredentials
): Promise<void> => {
  await apiClient.patch(`/auth/reset-password/${credentials.token}`, {
    password: credentials.password,
    confirmPassword: credentials.confirmPassword,
  })
}

export const signInWithGoogle = async (
  payload: GoogleAuthPayload
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/google', payload)
  return response.data
}

export const signOut = async (): Promise<void> => {
  try {
    await apiClient.post('/auth/signout')
  } catch (error) {
    console.error('Error signing out on server:', error)
  }
}

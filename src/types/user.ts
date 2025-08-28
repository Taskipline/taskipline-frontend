import type { User } from '@/stores/authStore'

export interface DeleteAccountCredentials {
  password: string
}

export interface UpdateProfilePayload {
  firstName?: string
  lastName?: string
}

export interface UpdateProfileResponse {
  message: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    // Add other user properties as needed
  }
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface ChangePasswordResponse {
  message: string
}

export interface UpdatePreferencesPayload {
  emailNotifications: boolean
  enableAIFeatures: boolean
}

export interface UpdatePreferencesResponse {
  message?: string
  user?: User
  preferences?: Preferences
}

export interface Preferences {
  emailNotifications: boolean
  enableAIFeatures: boolean
}

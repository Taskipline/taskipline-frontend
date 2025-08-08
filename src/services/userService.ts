import apiClient from '@/lib/apiClient'
import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  DeleteAccountCredentials,
  UpdatePreferencesPayload,
  UpdatePreferencesResponse,
  UpdateProfilePayload,
  UpdateProfileResponse,
} from '@/types/user'

export const deleteAccount = async (
  credentials: DeleteAccountCredentials
): Promise<void> => {
  await apiClient.delete('/user/delete-account', {
    data: credentials,
  })
}

export const updateProfile = async (
  payload: UpdateProfilePayload
): Promise<UpdateProfileResponse> => {
  const response = await apiClient.patch<UpdateProfileResponse>(
    '/user/profile',
    payload
  )
  return response.data
}

export async function changePassword(
  payload: ChangePasswordPayload
): Promise<ChangePasswordResponse> {
  const res = await apiClient.patch<ChangePasswordResponse>(
    '/user/change-password',
    payload
  )
  return res.data
}

export async function updatePreferences(
  payload: UpdatePreferencesPayload
): Promise<UpdatePreferencesResponse> {
  const res = await apiClient.patch<UpdatePreferencesResponse>(
    '/user/preferences',
    payload
  )
  return res.data
}

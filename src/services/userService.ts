import apiClient from '@/lib/apiClient'
import {
  DeleteAccountCredentials,
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

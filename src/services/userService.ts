import apiClient from '@/lib/apiClient'
import { DeleteAccountCredentials } from '@/types/user'

export const deleteAccount = async (
  credentials: DeleteAccountCredentials
): Promise<void> => {
  await apiClient.delete('/user/delete-account', {
    data: credentials,
  })
}

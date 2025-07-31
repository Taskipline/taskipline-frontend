import apiClient from '@/lib/apiClient'
import { JoinWaitlistResponse } from '@/types/waitlist'

export const joinWaitlist = async (
  email: string
): Promise<JoinWaitlistResponse> => {
  const response = await apiClient.post<JoinWaitlistResponse>('/waitlist', {
    email,
  })
  return response.data
}

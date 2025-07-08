import { apiUrl } from '@/lib/env'
import { ApiError } from '@/lib/errors'

export const joinWaitlist = async (email: string) => {
  const response = await fetch(`${apiUrl}/waitlist/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })
  console.log('Waitlist response', response)

  if (!response.ok) {
    const errorData = await response.json()
    console.error('Error joining waitlist:', errorData)
    throw new ApiError(
      errorData.message || 'Something went wrong',
      response.status
    )
  }

  return response.json()
}

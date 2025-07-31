'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useQueryClient } from '@tanstack/react-query'

export default function AccountActionSettingsSection() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()

  const handleSignout = () => {
    // 1. Clear the authentication token and user data from the client
    logout()

    // 2. Clear all cached API data to ensure a clean state for the next user
    queryClient.clear()

    // 3. Notify the user and redirect to the signin page
    notify('success', 'You have been signed out.')
    router.push('/signin')
  }

  return (
    <section className="grid gap-4">
      <Title text="Account Actions" type="sub-heading-2" />
      <Button
        variant="secondary"
        className="w-fit rounded-[20px] cursor-pointer"
        onClick={handleSignout}
      >
        Signout
      </Button>
    </section>
  )
}

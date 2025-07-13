'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function AccountActionSettingsSection() {
  const router = useRouter()
  const handleLogout = () => {
    // Logic for logging out the user
    console.log('User logged out')
    notify('success', 'Logout successful')
    // Redirect to the login page or home page after logout
    router.push('/signin')
  }
  return (
    <section className="grid gap-4">
      <Title text="Account Actions" type="sub-heading-2" />
      <Button
        variant="secondary"
        className="w-fit rounded-[20px] cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </section>
  )
}

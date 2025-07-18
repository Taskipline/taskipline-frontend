'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function DangerZoneSettingsSection() {
  const router = useRouter()
  const handleDeleteAccount = () => {
    // Logic for logging out the user
    console.log('Account deleted successfully')
    notify('success', 'Delete successful')
    // Redirect to the login page or signup page after deletion
    router.push('/signin')
  }
  return (
    <section className="grid gap-4">
      <Title text="Danger Zone" type="sub-heading-2" className="text-error" />
      <Button
        variant="destructive"
        className="w-fit rounded-[20px] cursor-pointer"
        onClick={handleDeleteAccount}
      >
        Signout
      </Button>
    </section>
  )
}

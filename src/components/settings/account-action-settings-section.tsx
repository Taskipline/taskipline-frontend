'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useQueryClient } from '@tanstack/react-query'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

export default function AccountActionSettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Account Actions" type="sub-heading-2" />
      <LogoutDialog />
    </section>
  )
}

function LogoutDialog() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()

  const handleSignout = () => {
    // 1. Clear the authentication accessToken and user data from the client
    logout()

    // 2. Clear all cached API data to ensure a clean state for the next user
    queryClient.clear()

    // 3. Notify the user and redirect to the signin page
    notify('success', 'You have been signed out.')
    router.push('/signin')
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-fit rounded-[20px] cursor-pointer"
        >
          Signout
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Signout</DialogTitle>
          <DialogDescription>
            Are you sure you want to sign out?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <Button
            variant="destructive"
            className="w-fit rounded-[20px] cursor-pointer"
            onClick={handleSignout}
          >
            Signout
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-[20px] cursor-pointer"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

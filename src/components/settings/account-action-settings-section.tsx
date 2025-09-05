'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { googleLogout } from '@react-oauth/google'
import { signOut } from '@/services/authService'
import { Loader2 } from 'lucide-react'

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

  const signOutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      // 1. Revoke Google OAuth session
      googleLogout()

      // 2. Clear local auth state
      logout()

      // 3. Clear all cached API data
      queryClient.clear()

      notify('success', 'You have been signed out successfully')

      // 4. Redirect to signin page
      router.push('/signin')
    },
    onError: (error) => {
      console.error('Error signing out:', error)
      notify('error', 'There was a problem signing out')
    },
  })

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
            onClick={() => signOutMutation.mutate()}
            disabled={signOutMutation.isPending}
          >
            {signOutMutation.isPending ? (
              <span className="flex items-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing out...
              </span>
            ) : (
              'Signout'
            )}
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="rounded-[20px] cursor-pointer"
              disabled={signOutMutation.isPending}
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

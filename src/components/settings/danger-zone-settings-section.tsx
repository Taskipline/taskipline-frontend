'use client'

import { notify } from '@/utilities/common'
import Title from '../title'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
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
import { useAuthStore } from '@/stores/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { deleteAccount } from '@/services/userService'
import { ApiError } from '@/lib/errors'
import { CustomInput } from '../ui/input'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function DangerZoneSettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Danger Zone" type="sub-heading-2" />
      <DeleteAccountDialog />
    </section>
  )
}

function DeleteAccountDialog() {
  const router = useRouter()
  const { logout } = useAuthStore()
  const queryClient = useQueryClient()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      logout()
      queryClient.clear()
      notify('success', 'Your account has been successfully deleted.')
      router.push('/signup')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 401) {
          notify('error', 'Incorrect password. Please try again.')
        } else {
          notify('error', error.message)
        }
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!password) {
      notify('error', 'Please enter your password to confirm.')
      return
    }
    mutation.mutate({ password })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="w-fit rounded-[20px] cursor-pointer"
        >
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action cannot be
            undone. Please enter your password to confirm.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2">
          <CustomInput
            label="Password"
            id="delete-account-password"
            htmlFor="delete-account-password"
            placeholder="Enter your password"
            type={showPassword ? 'text' : 'password'}
            rightIcon={showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
            onRightIconClick={togglePassword}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            disabled={mutation.isPending}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <Button
            variant="destructive"
            className="w-fit rounded-[20px] cursor-pointer"
            onClick={handleDeleteAccount}
          >
            {mutation.isPending ? <Loader2 /> : 'Delete Account'}
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

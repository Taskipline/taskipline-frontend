'use client'

import { EyeClosedIcon, EyeIcon, Loader2 } from 'lucide-react'
import Title from '../title'
import { CustomInput } from '../ui/input'
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
import { Button } from '../ui/button'
import { useState } from 'react'
import { notify } from '@/utilities/common'
import { useMutation } from '@tanstack/react-query'
import { changePassword } from '@/services/userService'
import { ApiError } from '@/lib/errors'

export default function SecuritySettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Security" type="sub-heading-2" />
      <ChangePasswordDialog />
    </section>
  )
}

function ChangePasswordDialog() {
  const [isOpen, setIsOpen] = useState(false)

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const toggleShowOldPassword = () => setShowOldPassword((s) => !s)
  const toggleShowNewPassword = () => setShowNewPassword((s) => !s)

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      notify('success', data.message || 'Password changed successfully.')
      setIsOpen(false)
      setOldPassword('')
      setNewPassword('')
      setConfirmNewPassword('')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      notify('error', 'Please fill in all fields.')
      return
    }
    if (newPassword !== confirmNewPassword) {
      notify('error', 'New passwords do not match.')
      return
    }
    if (newPassword === oldPassword) {
      notify('error', 'New password must be different from old password.')
      return
    }
    mutation.mutate({ oldPassword, newPassword, confirmNewPassword })
  }

  const isDisabled =
    mutation.isPending ||
    !oldPassword ||
    !newPassword ||
    !confirmNewPassword ||
    newPassword !== confirmNewPassword

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
          Change Password
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Make changes to your password here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 w-sm mx-auto">
            <CustomInput
              label="Old Password"
              htmlFor="old-password"
              placeholder="Enter your old password"
              type={showOldPassword ? 'text' : 'password'}
              rightIcon={
                showOldPassword ? (
                  <EyeIcon size={16} />
                ) : (
                  <EyeClosedIcon size={16} />
                )
              }
              onRightIconClick={toggleShowOldPassword}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              disabled={mutation.isPending}
              required
            />
            <CustomInput
              label="New Password"
              htmlFor="new-password"
              placeholder="Enter your new password"
              type={showNewPassword ? 'text' : 'password'}
              rightIcon={
                showNewPassword ? (
                  <EyeIcon size={16} />
                ) : (
                  <EyeClosedIcon size={16} />
                )
              }
              onRightIconClick={toggleShowNewPassword}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={mutation.isPending}
              required
            />
            <CustomInput
              label="Confirm New Password"
              htmlFor="confirm-new-password"
              placeholder="Re-enter your new password"
              type={showNewPassword ? 'text' : 'password'}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              disabled={mutation.isPending}
              required
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isDisabled}>
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

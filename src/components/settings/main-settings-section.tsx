'use client'

import { Edit, Loader2 } from 'lucide-react'
import Title from '../title'
import { Button } from '../ui/button'
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
import { CustomInput } from '../ui/input'
import { useAuthStore } from '@/stores/authStore'
import { notify } from '@/utilities/common'
import { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updateProfile } from '@/services/userService'
import { ApiError } from '@/lib/errors'

export default function MainSettingsSection() {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <section className="grid gap-4">
        <Title text="Profile" type="sub-heading-2" />
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      </section>
    )
  }

  return (
    <section className="grid gap-4">
      <Title text="Profile" type="sub-heading-2" />
      <div className="bg-secondary size-20 rounded-full flex items-center justify-center">
        <UpdateProfilePictureDialog />
      </div>
      <div className="flex gap-4 max-w-sm">
        <CustomInput
          label="First Name"
          htmlFor="first-name"
          value={user.firstName}
          disabled
        />
        <CustomInput
          label="Last Name"
          htmlFor="last-name"
          placeholder="Enter your email"
          value={user.lastName}
          disabled
        />
      </div>
      <CustomInput
        label="Email"
        htmlFor="email"
        placeholder="Enter your email"
        value={user.email}
        disabled
      />
      <UpdateProfileDialog />
    </section>
  )
}

function UpdateProfileDialog() {
  const { user, accessToken, setAuth } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
    }
  }, [user, isOpen])

  const mutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (response) => {
      if (accessToken) {
        setAuth(accessToken, response.user)
      }
      notify('success', response.message || 'Profile updated successfully!')
      setIsOpen(false)
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

    if (!user) return

    const payload: { firstName?: string; lastName?: string } = {}
    if (firstName !== user.firstName) payload.firstName = firstName
    if (lastName !== user.lastName) payload.lastName = lastName

    if (Object.keys(payload).length === 0) {
      notify('info', 'No changes to save.')
      return
    }

    mutation.mutate(payload)
  }

  const hasChanges =
    user && (firstName !== user.firstName || lastName !== user.lastName)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-fit">
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="grid gap-2">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="flex gap-4">
              <CustomInput
                label="First Name"
                id="update-first-name"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={mutation.isPending}
                required
              />
              <CustomInput
                label="Last Name"
                id="update-last-name"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={mutation.isPending}
                required
              />
            </div>
            <CustomInput
              label="Email"
              id="update-email"
              value={user?.email || ''}
              disabled
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!hasChanges || mutation.isPending}
              className="cursor-pointer"
            >
              {mutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

function UpdateProfilePictureDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer">
          <Edit className="size-5 cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            Upload a new profile picture or update the existing one.
          </DialogDescription>
        </DialogHeader>
        <CustomInput htmlFor="picture" type="file" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" disabled>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

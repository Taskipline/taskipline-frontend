'use client'

import { EyeClosedIcon, EyeIcon } from 'lucide-react'
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

export default function SecuritySettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Security" type="sub-heading-2" />
      {/* <CustomInput rightIcon={<Pencil className="size-5" />} disabled /> */}
      <ChangePasswordDialog />
    </section>
  )
}

function ChangePasswordDialog() {
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword)
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword)
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Change Password</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change password</DialogTitle>
            <DialogDescription>
              Make changes to your password here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-4 w-sm mx-auto">
              <CustomInput
                label="Old Password"
                htmlFor="password"
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
              />
              <CustomInput
                label="New Password"
                htmlFor="confirm password"
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
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}

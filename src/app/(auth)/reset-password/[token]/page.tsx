'use client'

import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

export default function ForgotPassword() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  const handleResetPassword = async () => {
    // show a confirmation modal and clicking ok goes back to login
    notify('success', 'password reset successful')
    router.push('/signin')
  }
  return (
    <div className="grid gap-6">
      <Title
        text="Reset your password"
        type="auth"
        textAlignment="text-center"
      />
      <div className="grid gap-4 w-sm mx-auto">
        <CustomInput
          label="New Password"
          htmlFor="password"
          placeholder="Enter your new password"
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            showPassword ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />
          }
          onRightIconClick={togglePassword}
        />
        <CustomInput
          label="Confirm New Password"
          htmlFor="confirm password"
          placeholder="Confirm your new password"
          type={showConfirmPassword ? 'text' : 'password'}
          rightIcon={
            showConfirmPassword ? (
              <EyeIcon size={16} />
            ) : (
              <EyeClosedIcon size={16} />
            )
          }
          onRightIconClick={toggleConfirmPassword}
        />
        <Label>
          Password must be at least 8 characters long and include a mix of
          letters, numbers, and symbols.
        </Label>
        <Button
          className="rounded-[20px] max-w-sm cursor-pointer"
          onClick={handleResetPassword}
        >
          Reset Password
        </Button>
      </div>
    </div>
  )
}

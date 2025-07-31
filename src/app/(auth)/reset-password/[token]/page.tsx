'use client'

import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import { useState } from 'react'
import { CheckCircle, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { resetPassword } from '@/services/authService'
import { ApiError } from '@/lib/errors'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ResetPassword({
  params,
}: {
  params: { token: string }
}) {
  const { token } = params
  const router = useRouter()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword)

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      notify('success', 'Password reset successfully! You can now sign in.')
      router.push('/signin')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      notify('error', 'Passwords do not match.')
      return
    }
    if (password.length < 8) {
      notify('error', 'Password must be at least 8 characters long.')
      return
    }
    mutation.mutate({ token, password, confirmPassword })
  }

  if (mutation.isSuccess) {
    return (
      <div className="max-w-sm mx-auto grid gap-4">
        <CheckCircle className="mx-auto h-12 w-12 text-success" />
        <Title text="Password Reset" type="auth" />
        <p className="text-foreground/80">
          Your password has been successfully reset. You can now sign in with
          your new password.
        </p>
        <Button asChild>
          <Link href="/signin">Go to Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Title
        text="Reset your password"
        type="auth"
        textAlignment="text-center"
      />
      <form onSubmit={handleResetPassword} className="grid gap-4 w-sm mx-auto">
        <CustomInput
          label="New Password"
          id="password"
          placeholder="Enter your new password"
          type={showPassword ? 'text' : 'password'}
          rightIcon={showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          onRightIconClick={togglePassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={mutation.isPending}
          required
        />
        <CustomInput
          label="Confirm New Password"
          id="confirm-password"
          placeholder="Confirm your new password"
          type={showConfirmPassword ? 'text' : 'password'}
          rightIcon={
            showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />
          }
          onRightIconClick={toggleConfirmPassword}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={mutation.isPending}
          required
        />
        <Label>
          Password must be at least 8 characters long and include a mix of
          letters, numbers, and symbols.
        </Label>
        <Button
          type="submit"
          className="rounded-[20px] max-w-sm cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Reset Password'
          )}
        </Button>
      </form>
    </div>
  )
}

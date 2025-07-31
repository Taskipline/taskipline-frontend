'use client'

import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { forgotPassword } from '@/services/authService'
import { ApiError } from '@/lib/errors'
import { Loader2, MailCheck } from 'lucide-react'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      notify(
        'success',
        data.message || 'Password reset link sent successfully!'
      )
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleSendResetLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      notify('error', 'Please enter your email address.')
      return
    }
    mutation.mutate(email)
  }

  if (mutation.isSuccess) {
    return (
      <div className="grid gap-6">
        <MailCheck className="mx-auto h-12 w-12 text-primary" />
        <Title text="Check your email" type="auth" />
        <p className="text-foreground/80">
          We&apos;ve sent a password reset link to <strong>{email}</strong>.
        </p>
        <Link href="/signin">
          <Button variant="link">Back to Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Title
        text="Forgot your password?"
        type="auth"
        textAlignment="text-center"
      />
      <form onSubmit={handleSendResetLink} className="grid gap-4 w-sm mx-auto">
        <Label className="text-center mx-auto leading-6">
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Label>
        <CustomInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={mutation.isPending}
          required
        />
        <Button
          type="submit"
          className="rounded-[20px] max-w-sm cursor-pointer"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Send Reset Link'
          )}
        </Button>
        <Label className="text-center mx-auto">
          Remember your password?{' '}
          <Link href="/signin" className="text-primary">
            Sign In
          </Link>
        </Label>
      </form>
    </div>
  )
}

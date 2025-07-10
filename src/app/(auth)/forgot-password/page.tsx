'use client'

import { Button } from '@/components/UI/button'
import { CustomInput } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import Title from '@/components/UI/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const router = useRouter()

  const handleSendResetLink = async () => {
    notify('success', 'check your mail for link')
    // send email that contains the link to reset password
    router.push('/reset-password/1234')
  }
  return (
    <div className="grid gap-6">
      <Title
        text="Forgot your password?"
        type="auth"
        textAlignment="text-center"
      />
      <div className="grid gap-4 w-sm mx-auto">
        <Label className="text-center mx-auto">
          Enter the email address associated with your account and we&apos;ll
          send you a link to reset your password.
        </Label>
        <CustomInput
          label="Email"
          htmlFor="email"
          placeholder="Enter your email"
        />
        <Button
          className="rounded-[20px] max-w-sm cursor-pointer"
          onClick={handleSendResetLink}
        >
          Send Reset Link
        </Button>
        <Label className="text-center mx-auto">
          Remember your password?{' '}
          <Link href="/signin" className="text-primary">
            Sign In
          </Link>
        </Label>
      </div>
    </div>
  )
}

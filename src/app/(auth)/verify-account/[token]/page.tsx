'use client'

import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { verifyAccount, resendVerificationLink } from '@/services/authService'
import { ApiError } from '@/lib/errors'
import { notify } from '@/utilities/common'

import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import Title from '@/components/title'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

export default function VerifyAccountPage() {
  const params = useParams()
  const token = params.token as string

  const verificationStarted = useRef(false)

  // --- Verification Mutation ---
  const verificationMutation = useMutation({
    mutationFn: verifyAccount,
  })

  useEffect(() => {
    if (token && !verificationStarted.current) {
      verificationStarted.current = true
      verificationMutation.mutate(token)
    }
  }, [token, verificationMutation])

  // --- Resend Link Mutation ---
  const [email, setEmail] = useState('')
  const resendMutation = useMutation({
    mutationFn: resendVerificationLink,
    onSuccess: (data) => {
      notify(
        'success',
        data.message ||
          'A new verification link has been sent! Check your email.'
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

  const handleResendLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      notify('error', 'Please enter your email address.')
      return
    }
    resendMutation.mutate(email)
  }

  // --- Render Logic ---

  // State 1: Verifying the token
  if (verificationMutation.isPending) {
    return <Loading />
  }

  // State 2: Verification failed
  if (verificationMutation.isError) {
    const errorMessage =
      verificationMutation.error instanceof ApiError
        ? verificationMutation.error.message
        : 'The verification link is invalid or has expired.'

    return (
      <div className="max-w-sm mx-auto grid gap-4">
        <XCircle className="mx-auto h-12 w-12 text-destructive" />
        <Title text="Verification Failed" type="auth" />
        <p className="text-destructive">{errorMessage}</p>
        <p className="text-foreground/80">
          Enter your email below to receive a new link.
        </p>
        <form onSubmit={handleResendLink} className="grid gap-4 mt-2">
          <CustomInput
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={resendMutation.isPending}
            required
          />
          <Button
            type="submit"
            className="max-w-sm"
            disabled={resendMutation.isPending}
          >
            {resendMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Resend Verification Link'
            )}
          </Button>
        </form>
      </div>
    )
  }

  // State 3: Verification was successful
  if (verificationMutation.isSuccess) {
    return (
      <div className="max-w-sm mx-auto grid gap-4 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-success" />
        <Title
          text="Account Verified"
          type="auth"
          textAlignment="text-center"
        />
        <p className="text-foreground/80">
          Your account has been successfully verified. You can now log in to
          start using Taskipline.
        </p>
        <Button asChild>
          <Link href="/signin">Go to Sign In</Link>
        </Button>
      </div>
    )
  }

  return <Loading />
}

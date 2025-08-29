'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, Loader2, MailCheck } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { signup } from '@/services/authService'
import { ApiError } from '@/lib/errors'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export default function Signup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const mutation = useMutation({
    mutationFn: signup,
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) {
      notify('error', 'Please fill out all fields.')
      return
    }
    if (!agreedToTerms) {
      notify(
        'error',
        'You must agree to the terms and privacy policy to continue.'
      )
      return
    }
    mutation.mutate({ firstName, lastName, email, password })
  }

  if (mutation.isSuccess) {
    return (
      <div className="grid gap-6 text-center">
        <MailCheck className="mx-auto h-12 w-12 text-primary" />
        <Title text="Check your email" type="auth" />
        <p className="text-foreground/80">
          We&apos;ve sent a verification link to <strong>{email}</strong>.
          Please check your inbox to complete your registration.
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
        text="Create your account"
        type="auth"
        textAlignment="text-center"
      />
      <form onSubmit={handleSignup} className="grid gap-4 w-sm mx-auto">
        <div className="flex gap-x-4">
          <CustomInput
            id="first-name"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={mutation.isPending}
            required
          />
          <CustomInput
            id="last-name"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={mutation.isPending}
            required
          />
        </div>
        <CustomInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={mutation.isPending}
          required
        />
        <CustomInput
          id="password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          rightIcon={showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
          onRightIconClick={togglePassword}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={mutation.isPending}
          required
        />
        <div className="flex items-center gap-3">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(Boolean(checked))}
            disabled={mutation.isPending}
          />
          <Label htmlFor="terms" className="font-normal">
            I agree to the{' '}
            <Link href="#terms" className="text-primary">
              Terms of service
            </Link>{' '}
            and{' '}
            <Link href="#privacy-policy" className="text-primary">
              Privacy Policy
            </Link>
          </Label>
        </div>
        <Button
          type="submit"
          className="rounded-[20px] max-w-sm cursor-pointer"
          disabled={
            mutation.isPending ||
            !agreedToTerms ||
            !email ||
            !password ||
            !firstName ||
            !lastName
          }
        >
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Create Account'
          )}
        </Button>
        <Label className="mx-auto font-normal">Or Sign Up With</Label>
        <div className="grid grid-cols-2 gap-2 justify-between">
          <Button className="rounded-[20px]" variant="secondary" asChild>
            <Link href="#google-sign-in">
              <FaGoogle />
              Google
            </Link>
          </Button>
          <Button className="rounded-[20px]" variant="secondary" asChild>
            <Link href="#github-sign-in">
              <FaGithub />
              Github
            </Link>
          </Button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import { signin } from '@/services/authService'
import { ApiError } from '@/lib/errors'

export default function Signin() {
  const router = useRouter()
  const { setAuth } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      setAuth(data.token, data.user)
      notify('success', 'Login successful!')
      router.push('/dashboard')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      notify('error', 'Please enter both email and password.')
      return
    }
    mutation.mutate({ email, password })
  }

  return (
    <div className="grid gap-6">
      <Title text="Welcome back" type="auth" textAlignment="text-center" />
      <form onSubmit={handleSignin} className="grid gap-4 w-sm mx-auto">
        <CustomInput
          label="Email"
          id="email"
          htmlFor="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          autoComplete="email"
          autoFocus
          disabled={mutation.isPending}
        />
        <CustomInput
          label="Password"
          id="password"
          htmlFor="password"
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
        <Label>
          <Link href="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
        </Label>
        <Button
          type="submit"
          className="rounded-[20px] max-w-sm cursor-pointer"
          disabled={mutation.isPending || !email || !password}
        >
          {mutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Sign in'
          )}
        </Button>
        <Label className="mx-auto">Or Sign In With</Label>
        <div className="grid grid-cols-2 gap-2 justify-between">
          <Button className="rounded-[20px]" variant="secondary" asChild>
            <Link href="#google-sign-in">Google</Link>
          </Button>
          <Button className="rounded-[20px]" variant="secondary" asChild>
            <Link href="#github-sign-in">Github</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useMutation } from '@tanstack/react-query'
import {
  signin,
  signInWithGithub,
  signInWithGoogle,
} from '@/services/authService'
import { ApiError } from '@/lib/errors'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { useGoogleLogin } from '@react-oauth/google'
import { githubClientId, githubRedirectUri, githubState } from '@/lib/env'

export default function Signin() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setAuth } = useAuthStore()

  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)
  const codeProcessed = useRef(false)

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user)
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

  const signInWithGoogleMutation = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user)
      notify('success', 'Google login successful!')
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

  const signInWithGithubMutation = useMutation({
    mutationFn: signInWithGithub,
    onSuccess: (data) => {
      setAuth(data.accessToken, data.user)
      notify('success', 'Github login successful!')
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

  const googleAuth = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log('Google auth success:', tokenResponse)

      try {
        signInWithGoogleMutation.mutate({
          accessToken: tokenResponse.access_token,
        })
      } catch (error) {
        console.error('Error processing Google tokens:', error)
        notify('error', 'Failed to process Google authentication.')
      }
    },
    flow: 'implicit',
    onError: (error) => {
      console.error('Google login error details:', error)
      notify('error', `Google sign-in failed: ${error.toString()}`)
    },
    scope: 'email profile openid',
  })

  const githubAuth = () => {
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${encodeURIComponent(githubRedirectUri)}&scope=read:user user:email&state=${githubState}`
    window.location.href = authUrl
  }

  useEffect(() => {
    if (code && !codeProcessed.current) {
      console.log('GitHub OAuth params:', { code, state, error })

      if (error) {
        notify('error', `GitHub auth error: ${error}`)
        // router.push('/signin')
        return
      }

      if (state !== githubState) {
        notify('error', 'Invalid state parameter')
        // router.push('/signin')
        return
      }

      codeProcessed.current = true
      signInWithGithubMutation.mutate({ code })
    }
  }, [code, error, state, signInWithGithubMutation, router])

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
          <Link
            href="/forgot-password"
            className="text-primary font-normal underline italic"
          >
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
      </form>
      <Label className="mx-auto font-normal">Or Sign In With</Label>
      <div className="grid grid-cols-2 gap-2 justify-between w-sm mx-auto">
        <Button
          className="rounded-[20px] cursor-pointer"
          variant="secondary"
          onClick={() => googleAuth()}
          type="button"
          disabled={signInWithGoogleMutation.isPending}
        >
          <FaGoogle />
          {signInWithGoogleMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Google'
          )}
        </Button>
        <Button
          className="rounded-[20px] cursor-pointer"
          variant="secondary"
          onClick={() => githubAuth()}
          type="button"
          disabled={signInWithGithubMutation.isPending}
        >
          <FaGithub />
          {signInWithGithubMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            'Github'
          )}
        </Button>
      </div>
    </div>
  )
}

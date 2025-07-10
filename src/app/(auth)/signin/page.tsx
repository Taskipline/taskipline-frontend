'use client'

import { Button } from '@/components/UI/button'
import { CustomInput } from '@/components/UI/input'
import { Label } from '@/components/UI/label'
import Title from '@/components/UI/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const handleSignin = async () => {
    notify('success', 'login successful')
    router.push('/signin#dashboard')
  }
  return (
    <div className="grid gap-6">
      <Title text="Welcome back" type="auth" textAlignment="text-center" />
      <div className="grid gap-4 w-sm mx-auto">
        <CustomInput
          label="Email"
          htmlFor="email"
          placeholder="Enter your email"
        />
        <CustomInput
          label="Password"
          htmlFor="password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          isPassword
          togglePasswordIcon={togglePassword}
        />
        <Label>
          <Link href="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
        </Label>
        <Button
          className="rounded-[20px] max-w-sm cursor-pointer"
          onClick={handleSignin}
        >
          Sign in
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
      </div>
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { CustomInput } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Title from '@/components/title'
import { notify } from '@/utilities/common'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'

export default function Signup() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const togglePassword = () => setShowPassword(!showPassword)

  const handleSignup = async () => {
    notify('success', 'sign up successful')
    router.push('/signup#login')
  }
  return (
    <div className="grid gap-6">
      <Title
        text="Create your account"
        type="auth"
        textAlignment="text-center"
      />
      <div className="grid gap-4 w-sm mx-auto">
        <div className="flex gap-x-4">
          <CustomInput
            htmlFor="first-name"
            placeholder="Enter your first name"
          />
          <CustomInput htmlFor="last-name" placeholder="Enter your last name" />
        </div>
        <CustomInput htmlFor="email" placeholder="Enter your email" />
        <CustomInput
          htmlFor="password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          rightIcon={
            showPassword ? <EyeIcon size={16} /> : <EyeClosedIcon size={16} />
          }
          onRightIconClick={togglePassword}
        />
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label htmlFor="terms">
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
          className="rounded-[20px] max-w-sm cursor-pointer"
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <Label className="mx-auto">Or Sign Up With</Label>
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

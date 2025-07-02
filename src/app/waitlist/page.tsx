'use client'

import { Button } from '@/components/UI/button'
import Header from '@/components/UI/header'
import { Input } from '@/components/UI/input'
import Image from 'next/image'
import waitlistImage from '@/components/UI/Images/waitlist.png'
import { useState } from 'react'
import { validateEmail } from '@/utilities/common'

export default function LandingPageLayout() {
  const [email, setEmail] = useState('')
  console.log('Email:', email)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Form submitted with email:', email)
  }
  return (
    <div>
      <Header />
      <div className="grid py-10 px-4 gap-4">
        <Image src={waitlistImage} alt="Join waitlist" className="mx-auto" />
        <div className="grid gap-y-4 text-center justify-center">
          <h2 className="font-bold text-[28px] leading-[35px]">
            Join the Taskipline Waitlist
          </h2>
          <p className="font-normal text-base leading-6">
            Get early access to Taskipline and exclusive updates on our
            progress. Be among the first to experience the future of
            productivity.
          </p>
          <Input
            className="w-60 md:w-[480px] mx-auto"
            placeholder="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
          <Button
            className="mx-auto text-white"
            variant="secondary"
            onClick={handleSubmit}
            disabled={validateEmail(email) ? false : true}
          >
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

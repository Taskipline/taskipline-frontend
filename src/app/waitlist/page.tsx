'use client'

import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import waitlistImage from '@/components/ui/Images/waitlist.png'
import { useState } from 'react'
import { notify, validateEmail } from '@/utilities/common'
import { joinWaitlist } from '@/services/waitlistService'
import { Loader } from 'lucide-react'
import { ApiError } from '@/lib/errors'

export default function LandingPageLayout() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await joinWaitlist(email)
      notify('success', response.message || 'Successfully joined waitlist!')
      setEmail('')
      console.log('Waitlist JSON response:', response)
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        notify('info', 'You are already on the waitlist.')
        console.error('Error joining waitlist: Email already exists (409)')
      } else if (err instanceof Error) {
        notify('error', err.message || 'Error joining waitlist')
        console.error('Error joining waitlist:', err.message)
      } else {
        notify('error', 'An unknown error occurred')
        console.error('Unknown error:', err)
      }
    } finally {
      setLoading(false)
    }
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
          />
          <Button
            className="mx-auto text-white"
            variant="secondary"
            onClick={handleSubmit}
            disabled={!validateEmail(email) || loading}
          >
            {loading ? <Loader className="animate-spin" /> : 'Join Waitlist'}
          </Button>
        </div>
      </div>
    </div>
  )
}

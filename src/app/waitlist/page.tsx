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
import { useMutation } from '@tanstack/react-query'

export default function LandingPageLayout() {
  const [email, setEmail] = useState('')

  const mutation = useMutation({
    mutationFn: joinWaitlist,
    onSuccess: (response) => {
      notify('success', response.message || 'Successfully joined waitlist!')
      setEmail('')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        if (error.statusCode === 409) {
          notify('info', 'You are already on the waitlist!')
        } else {
          notify('error', error.message)
        }
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate(email)
  }

  return (
    <div>
      <Header />
      <div className="grid py-10 px-4 gap-4">
        <Image src={waitlistImage} alt="Join waitlist" className="mx-auto" />
        <form
          onSubmit={handleSubmit}
          className="grid gap-y-4 text-center justify-center"
        >
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
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={mutation.isPending}
          />
          <Button
            type="submit"
            className="mx-auto"
            variant="default"
            disabled={!validateEmail(email) || mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader className="animate-spin" />
            ) : (
              'Join Waitlist'
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

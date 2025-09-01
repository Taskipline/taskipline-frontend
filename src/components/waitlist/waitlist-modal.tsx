'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CustomInput } from '@/components/ui/input'
import { ApiError } from '@/lib/errors'
import { joinWaitlist } from '@/services/waitlistService'
import { notify, validateEmail } from '@/utilities/common'
import { useMutation } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import { useState } from 'react'

export default function WaitlistModal({
  ctaSize = 'lg',
}: {
  ctaSize?: 'default' | 'lg'
}) {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')

  const mutation = useMutation({
    mutationFn: joinWaitlist,
    onSuccess: (response) => {
      notify('success', response.message || 'Successfully joined waitlist!')
      setEmail('')
      setOpen(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-fit cursor-pointer"
          variant="default"
          size={ctaSize}
        >
          Join Waitlist
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the Taskipline Waitlist</DialogTitle>
          <DialogDescription>
            Get early access to Taskipline and exclusive updates on our
            progress. Be among the first to experience the future of
            productivity.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-4">
            <CustomInput
              className=""
              width="w-full"
              placeholder="Email Address"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={mutation.isPending}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={!validateEmail(email) || mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  Joining <Loader className="ml-2 animate-spin" />
                </>
              ) : (
                'Join Waitlist'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

import { Button } from '@/components/UI/button'
import { Input } from '@/components/UI/input'
import WaitlistHeader from '@/components/waitlist/header'
import Image from 'next/image'
import waitlistImage from '@/components/UI/Images/waitlist.png'

export default function Home() {
  return (
    <div>
      <WaitlistHeader />
      <div className="">
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
            className="w-[480px] mx-auto"
            placeholder="Email Address"
            type="email"
          />
          <Button className="w-[116px] mx-auto text-white" variant="secondary">
            Join Waitlist
          </Button>
        </div>
      </div>
    </div>
  )
}

import { Button } from '@/components/UI/button'
import Image from 'next/image'
import waitlistImage from '@/components/UI/Images/home.png'
import Header from '@/components/UI/header'
import { CustomHomeCard } from '@/components/UI/card'
import { Calendar1, Gamepad2, Goal, List, NotebookPen } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/UI/popover'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid py-10 px-4 gap-4 max-w-3xl mx-auto">
        <Image src={waitlistImage} alt="Join waitlist" className="mx-auto" />
        <div className="grid gap-y-4 text-center justify-center">
          <h2 className="font-bold text-[28px] leading-[35px]">
            Building discipline with Taskipline
          </h2>
          <p className="font-normal text-base leading-6">
            Taskipline is a discipline-focused productivity platform that
            unifies tasks, calendar, notes, and goals-powered by AI,
            gamification, and a customizable experience designed for web and
            mobile.
          </p>
          <div className="grid grid-cols-2 p-4 gap-3 item-center">
            {taskiplinePerks.map((perk, index) => (
              <CustomHomeCard key={index} icon={perk.icon} text={perk.text} />
            ))}
          </div>
          {/* <Button className="mx-auto text-white" variant="secondary">
            <Link href="/waitlist">Join Waitlist</Link>
          </Button> */}
          <Popover>
            <PopoverTrigger>
              <Button className="mx-auto text-white" variant="secondary">
                Join Waitlist
              </Button>
            </PopoverTrigger>
            <PopoverContent>Coming soon.</PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}

const taskiplinePerks = [
  {
    icon: <List />,
    text: 'Tasks',
  },
  {
    icon: <Goal />,
    text: 'Goals',
  },
  {
    icon: <Calendar1 />,
    text: 'Calendar',
  },
  {
    icon: <NotebookPen />,
    text: 'Notes',
  },
  {
    icon: <Gamepad2 />,
    text: 'Gamification',
  },
]

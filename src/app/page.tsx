import Image from 'next/image'
import waitlistImage from '@/components/ui/Images/home.png'
import Header from '@/components/header'
import { CustomHomeCard } from '@/components/ui/card'
import {
  Calendar1,
  Gamepad2,
  Goal,
  List,
  MailPlusIcon,
  NotebookPen,
} from 'lucide-react'
import Link from 'next/link'
import Title from '@/components/title'
import WaitlistModal from '@/components/waitlist/waitlist-modal'

export default function Home() {
  return (
    <div>
      <Header />
      <div className="grid py-2 px-4 gap-4 max-w-3xl mx-auto">
        <Image src={waitlistImage} alt="Join waitlist" className="h-[300px]" />
        <div className="grid gap-10">
          <section className="grid gap-y-4 text-center justify-center">
            <h2 className="font-bold text-[28px] leading-[35px] text-left">
              Building discipline with Taskipline
            </h2>
            <p className="font-normal text-base text-muted-foreground leading-6 text-left">
              Taskipline is a discipline-focused productivity platform that
              unifies tasks, calendar, notes, and goals-powered by AI,
              gamification, and a customizable experience designed for web and
              mobile.
            </p>
            <div className="text-left">
              <WaitlistModal />
            </div>
          </section>
          <section className="grid gap-6">
            <Title text="Explore the features" type="sub-heading" />
            <div className="grid grid-cols-2 gap-3 md:gap-5 item-center">
              {taskiplinePerks.map((perk, index) => (
                <CustomHomeCard
                  key={index}
                  icon={perk.icon}
                  text={perk.text}
                  description={perk.description}
                />
              ))}
            </div>
          </section>
          <section className="grid gap-6">
            <Title text="What inspired this platform?" type="sub-heading" />
            <div className="grid gap-2">
              <p className="font-normal text-muted-foreground text-left">
                I started Taskipline to tackle my own productivity struggles. I
                craved a tool that would keep me organized, disciplined, and
                motivated to revisit my goals and tasks regularly. Inspired by
                &apos;Atomic Habits&apos; by James Clear and &apos;The Power of
                Habit&apos; by Charles Duhigg, I realized how small, consistent
                changes can drive remarkable results.
              </p>
              <p className="font-normal text-muted-foreground text-left">
                That&apos;s why I built this platform: to help set meaningful
                goals, manage tasks (linked or standalone), capture reflections
                in notes, organize schedules with a calendar, and gamify the
                experience through streaks and leaderboards—all to foster
                lasting habits and productivity.
              </p>
            </div>
          </section>
          {/* contact */}
          <section className="grid gap-4">
            <Title text="Get in touch" type="sub-heading" />
            <div className="grid gap-2">
              <p className="font-normal text-muted-foreground text-left">
                I&apos;m always open to feedback, suggestions, or just a chat
                about productivity and discipline. Feel free to reach out to me
                at{' '}
                <Link
                  href="mailto:emzyakints2005@gmail.com"
                  className="text-primary underline"
                >
                  emzyakints2005@gmail.com
                </Link>
                .
              </p>
              <p className="font-normal text-muted-foreground text-left">
                You can also follow me on{' '}
                <Link
                  href="https://twitter.com/emmy_ak7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Twitter
                </Link>{' '}
                and{' '}
                <Link
                  href="https://www.instagram.com/emmy_akintz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  Instagram
                </Link>{' '}
                for updates and productivity tips.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

const taskiplinePerks = [
  {
    icon: <List className="size-4" />,
    text: 'Tasks',
    description:
      'Efficiently manage short and long-term tasks. Set priorities, deadlines, and allocate tasks to specific goals for streamlined organization.',
  },
  {
    icon: <Goal className="size-4" />,
    text: 'Goals',
    description:
      'Define clear goals and optionally link tasks to them. Track progress through completion rates and stay focused on what matters most.',
  },
  {
    icon: <Calendar1 className="size-4" />,
    text: 'Calendar',
    description:
      'Organize your schedule seamlessly. View tasks, goals, and notes in daily, weekly, or monthly layouts for comprehensive planning.',
  },
  {
    icon: <NotebookPen className="size-4" />,
    text: 'Notes',
    description:
      'Capture reflections and important information for future reference. Link notes to specific tasks or goals for enhanced context and productivity.',
  },
  {
    icon: <Gamepad2 className="size-4" />,
    text: 'Gamification',
    description:
      'Stay motivated with streaks and leaderboards that encourage you to achieve goals and complete tasks over time.',
  },
  {
    icon: <MailPlusIcon className="size-4" />,
    text: 'Email to Tasks',
    description:
      'Connect your email to automatically convert new messages into tasks, ensuring nothing slips through the cracks.',
  },
]

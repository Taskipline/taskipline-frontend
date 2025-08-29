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
                I started this project to solve my own productivity challenges.
                I needed a platform to really help me stay organized and
                disciplined and to also give me a reason/desire to keep
                revisiting my goals and tasks. There were these two books I read
                &apos;Atomic Habits by James Clear&apos; and &apos;The power of
                habits by Charles Duhigg&apos;. They both emphasized the
                importance of habits and how small changes can lead to
                remarkable results.
              </p>
              <p className="font-normal text-muted-foreground text-left">
                So I decided to build a platform that would really help with
                that by helping set goals I can keep coming back to from time to
                time, have tasks under each goal or independently, have notes to
                reflect on my progress and a calendar to organize my schedule. I
                also wanted to gamify the experience with streaks and
                leaderboards to keep me motivated.
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
                  href="mailto:taskipline@emmy-akintz.tech"
                  className="text-primary underline"
                >
                  taskipline@emmy-akintz.tech
                </Link>
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
      'You can manage your long and short term tasks efficiently. You can also set priorities and deadlines for your tasks and add allocate them to specific goals.',
  },
  {
    icon: <Goal className="size-4" />,
    text: 'Goals',
    description:
      'You can set and choose whether to have tasks under each goal. You can also track the progress of your goals by the completion rate of the tasks under each goal.',
  },
  {
    icon: <Calendar1 className="size-4" />,
    text: 'Calendar',
    description:
      'You can organize your schedule with the calendar feature. You can view your tasks, goals and even notes on a daily, weekly, or monthly basis.',
  },
  {
    icon: <NotebookPen className="size-4" />,
    text: 'Notes',
    description:
      'You can have reflections and note them down for future reference. You can also jot down important information.', //You can also link notes to specific tasks or goals for better context
  },
  {
    icon: <Gamepad2 className="size-4" />,
    text: 'Gamification',
    description:
      'You can stay motivated with streaks and leaderboard systems that motivates you to want to achieve your goals and complete your tasks overtime.',
  },
  {
    icon: <MailPlusIcon className="size-4" />,
    text: 'Email to tasks',
    description:
      'You can connect your email to the platform and be rest assured every new email you get is converted to a task automatically.',
  },
]

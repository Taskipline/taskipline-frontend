import Link from 'next/link'
import { Progress } from '../ui/progress'
import Image from 'next/image'
import GoalModal from './goal-modal'
import { ArrowUpRight } from 'lucide-react'

export default function GoalTile({
  title,
  progress,
}: {
  title: string
  progress: number
}) {
  return (
    <Link
      href="/dashboard#goal/1234"
      className="grid gap-2 p-4 hover:bg-accent-foreground/10 rounded-lg transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-base leading-6">{title}</h3>
          <GoalModal
            type="view"
            callToActionButtonVariant="link"
            callToActionButtonContent={<ArrowUpRight className="size-5" />}
          />
        </div>
        <p className="text-sm leading-[21px]">{progress}%</p>
      </div>
      <Progress value={progress} />
    </Link>
  )
}

export function MainGoalTile({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="flex justify-between p-4 hover:bg-accent-foreground/10 rounded-lg transition-colors cursor-default">
      <div className="grid gap-2">
        <div>
          <h3 className="font-medium text-base leading-6">{title}</h3>
          <p className="text-sm leading-[21px] text-foreground/70">
            {description}
          </p>
        </div>
        <GoalModal type="view" />
      </div>
      <Image
        src="https://picsum.photos/300/200"
        alt={title}
        width={200}
        height={300}
        className="rounded-lg"
      />
    </div>
  )
}

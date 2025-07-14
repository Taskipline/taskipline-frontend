import { ListChecks } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import Link from 'next/link'

export default function TaskTile({
  title,
  date,
  completed,
  onCheckClick,
}: {
  title: string
  date: string
  completed: boolean
  onCheckClick?: () => void
}) {
  return (
    <div className="flex items-center justify-between hover:bg-accent-foreground/10 p-4 rounded-lg transition-colors">
      <Link
        href="/dashboard#task-tile"
        className="flex items-center gap-2 md:gap-4"
      >
        <div className="bg-accent size-12 rounded-lg flex items-center justify-center">
          <ListChecks className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-medium text-base leading-6">{title}</h3>
          <p className="text-sm leading-[21px] text-foreground/70">{date}</p>
        </div>
      </Link>
      <Checkbox checked={completed} onClick={onCheckClick} />
    </div>
  )
}

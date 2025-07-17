import { ArrowUpRight, ListChecks } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import TaskModal from './task-modal'

export default function TaskTile({
  title,
  date,
  completed,
  onCheckClick,
  showIcon = true,
}: {
  title: string
  date: string
  completed: boolean
  onCheckClick?: () => void
  showIcon?: boolean
}) {
  return (
    <div className="flex items-center justify-between hover:bg-accent-foreground/10 px-4 py-2 rounded-lg transition-colors">
      <div className="flex items-center gap-2 md:gap-4">
        {showIcon && (
          <div className="bg-accent size-12 rounded-lg flex items-center justify-center">
            <ListChecks className="w-5 h-5" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-base leading-6">{title}</h3>
            <TaskModal
              type="view"
              callToActionButtonVariant="link"
              callToActionButtonContent={<ArrowUpRight className="size-5" />}
            />
          </div>
          <p className="text-sm leading-[21px] text-foreground/70">{date}</p>
        </div>
      </div>
      <Checkbox checked={completed} onClick={onCheckClick} />
    </div>
  )
}

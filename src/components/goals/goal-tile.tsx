import Link from 'next/link'
import { Progress } from '../ui/progress'

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
        <h3>{title}</h3>
        <p>{progress}%</p>
      </div>
      <Progress value={progress} />
    </Link>
  )
}

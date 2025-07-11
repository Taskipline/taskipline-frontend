import Link from 'next/link'

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
      <div className="bg-secondary h-2 rounded-full w-full overflow-hidden">
        <div
          className={`h-full bg-primary rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </Link>
  )
}

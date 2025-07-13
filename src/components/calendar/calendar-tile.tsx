import { Calendar } from 'lucide-react'
import Link from 'next/link'

export default function CalendarTile() {
  return (
    <Link
      href="/dashboard#calendar1234"
      className="flex gap-2 md:gap-4 hover:bg-accent-foreground/10 p-4 rounded-lg transition-colors"
    >
      <div className="bg-accent size-12 rounded-lg flex items-center justify-center">
        <Calendar className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-medium text-base leading-6">
          Submit Quarterly Report
        </h3>
        <p className="text-sm leading-[21px] text-foreground/70">
          July 15, 2024
        </p>
      </div>
    </Link>
  )
}

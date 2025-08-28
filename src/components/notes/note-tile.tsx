import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

export default function NoteTile() {
  return (
    <Link href="/dashboard#note-tile">
      <div className="p-4 hover:bg-accent-foreground/10 rounded-lg transition-colors flex items-start justify-between">
        <div>
          <h3 className="font-medium text-base leading-6">
            Brainstorming Session
          </h3>
          <p className="text-sm leading-[21px] text-foreground/70">
            Ideas for the new marketing campaign
          </p>
        </div>
        <ArrowUpRight className="w-5 h-5" />
      </div>
    </Link>
  )
}

import { ArrowRight } from 'lucide-react'
import Title from '../title'
import { Button } from '../ui/button'

export default function HelpSupportSettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Help & Support" type="sub-heading-2" />
      <Tile text="Help & Documentation" />
    </section>
  )
}

function Tile({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <div className="flex justify-between hover:bg-accent-foreground/10 transition-colors p-2 rounded-lg cursor-pointer">
      <p>{text}</p>
      <Button
        variant="ghost"
        size="icon"
        onClick={onClick}
        className="rounded-[20px]"
      >
        <ArrowRight className="w-5 h-5" />
      </Button>
    </div>
  )
}

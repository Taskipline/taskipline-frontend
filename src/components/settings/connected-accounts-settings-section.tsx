import Title from '../title'
import { Button } from '../ui/button'

export default function ConnectedAccountsSettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="Connected Accounts" type="sub-heading-2" />
      <Tile text="Connect with Google" />
      <Tile text="Connect with GitHub" />
    </section>
  )
}

function Tile({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <div className="flex justify-between hover:bg-accent-foreground/10 transition-colors p-2 rounded-lg cursor-pointer">
      <p>{text}</p>
      <Button variant="secondary" onClick={onClick} className="rounded-[20px]">
        Connect
      </Button>
    </div>
  )
}

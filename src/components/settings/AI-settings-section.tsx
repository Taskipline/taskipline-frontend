import Title from '../title'
import { CustomSwitch } from '../ui/switch'

export default function AISettingsSection() {
  return (
    <section className="grid gap-4">
      <Title text="AI Features" type="sub-heading-2" />
      <CustomSwitch
        title="Enable AI Features"
        description="Enable AI-powered task suggestions, smart scheduling, and personalized insights."
        checked={false}
      />
    </section>
  )
}

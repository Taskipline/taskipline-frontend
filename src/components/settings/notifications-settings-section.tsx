import Title from '../title'
import { CustomSwitch } from '../ui/switch'

export default function NotificationsSettingsSection() {
  return (
    <div className="grid gap-4">
      <Title text="Notifications" type="sub-heading-2" />
      <CustomSwitch
        title="Email Notifications"
        description="Receive email notifications for task reminders, updates, and other important events."
        checked={false}
      />
      <CustomSwitch
        title="Push Notifications"
        description="Get push notifications on your device for immediate alerts and reminders."
        checked={false}
      />
    </div>
  )
}

import AccountActionSettingsSection from '@/components/settings/account-action-settings-section'
import AISettingsSection from '@/components/settings/AI-settings-section'
import AppearanceSettingsSection from '@/components/settings/appearance-settings-section'
import ConnectedAccountsSettingsSection from '@/components/settings/connected-accounts-settings-section'
import HelpSupportSettingsSection from '@/components/settings/help-support-settings-section'
import MainSettingsSection from '@/components/settings/main-settings-section'
import NotificationsSettingsSection from '@/components/settings/notifications-settings-section'
import SecuritySettingsSection from '@/components/settings/security-settings-section'
import Title from '@/components/title'

export default function Settings() {
  return (
    <div className="grid gap-10">
      <Title text="Settings" />
      <div className="grid gap-8">
        <MainSettingsSection />
        <SecuritySettingsSection />
        <NotificationsSettingsSection />
        <AppearanceSettingsSection />
        <AISettingsSection />
        <ConnectedAccountsSettingsSection />
        <HelpSupportSettingsSection />
        <AccountActionSettingsSection />
      </div>
    </div>
  )
}

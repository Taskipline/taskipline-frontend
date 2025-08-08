'use client'

import { useAuthStore, User } from '@/stores/authStore'
import Title from '../title'
import { CustomSwitch } from '../ui/switch'
import { useEffect, useMemo, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { updatePreferences } from '@/services/userService'
import { ApiError } from '@/lib/errors'
import { notify } from '@/utilities/common'

export default function NotificationsSettingsSection() {
  const { user, accessToken, setAuth } = useAuthStore()

  const initial = useMemo(
    () => ({
      emailNotifications: user?.preferences?.emailNotifications ?? false,
      enableAIFeatures: user?.preferences?.enableAIFeatures ?? false,
    }),
    [user]
  )

  const [emailNotifications, setEmailNotifications] = useState(
    initial.emailNotifications
  )
  const [enableAIFeatures, setEnableAIFeatures] = useState(
    initial.enableAIFeatures
  )

  useEffect(() => {
    setEmailNotifications(initial.emailNotifications)
    setEnableAIFeatures(initial.enableAIFeatures)
  }, [initial.emailNotifications, initial.enableAIFeatures])

  const mutation = useMutation({
    mutationFn: updatePreferences,
    onSuccess: (data) => {
      if (data.user && accessToken) {
        setAuth(accessToken, data.user)
      } else if (user && accessToken && data.preferences) {
        setAuth(accessToken, {
          ...user,
          preferences: {
            ...(user.preferences ?? {}),
            ...data.preferences,
          },
        } as User)
      }
      notify('success', data.message || 'Preference saved.')
    },
    onError: (error) => {
      if (error instanceof ApiError) {
        notify('error', error.message)
      } else {
        notify('error', 'An unexpected error occurred.')
      }
    },
  })

  // Save on toggle with optimistic UI (rollback on error)
  const handleToggleEmail = (checked: boolean) => {
    const prev = emailNotifications
    setEmailNotifications(checked)
    mutation.mutate(
      { emailNotifications: checked, enableAIFeatures },
      {
        onError: () => setEmailNotifications(prev),
      }
    )
  }

  if (!user?.preferences) {
    return (
      <div className="grid gap-4">
        <Title text="Notifications" type="sub-heading-2" />
        <p className="text-sm text-muted-foreground">Loading preferences...</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <Title text="Notifications" type="sub-heading-2" />
      <CustomSwitch
        title="Email Notifications"
        description="Receive email notifications for task reminders, updates, and other important events."
        checked={emailNotifications}
        onCheckedChange={handleToggleEmail}
        disabled={mutation.isPending}
      />
      {/* <CustomSwitch
        title="Push Notifications"
        description="Get push notifications on your device for immediate alerts and reminders."
        checked={false}
      /> */}
    </div>
  )
}

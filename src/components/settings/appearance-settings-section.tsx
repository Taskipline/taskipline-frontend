'use client'

import { useTheme } from 'next-themes'
import Title from '../title'
import { Button } from '../ui/button'

export default function AppearanceSettingsSection() {
  const { theme, setTheme } = useTheme()

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
  ]

  return (
    <section className="grid gap-4">
      <Title text="Appearance" type="sub-heading-2" />
      <div className="flex gap-4">
        {themeOptions.map((option) => (
          <Button
            key={option.value}
            variant={theme === option.value ? 'secondary' : 'outline'}
            onClick={() => setTheme(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </section>
  )
}

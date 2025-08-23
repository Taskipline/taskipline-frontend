import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tasks | Taskipline',
  description: 'Manage your tasks effectively to stay on top of your goals.',
  openGraph: {
    title: 'Tasks | Taskipline',
    description: 'Manage your tasks effectively to stay on top of your goals.',
  },
}

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

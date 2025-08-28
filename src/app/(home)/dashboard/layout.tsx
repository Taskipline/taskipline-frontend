import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Taskipline',
  description: 'Your personal dashboard for managing tasks, goals, and more.',
  openGraph: {
    title: 'Dashboard | Taskipline',
    description: 'Your personal dashboard for managing tasks, goals, and more.',
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Waitlist | Taskipline',
  description: 'Join the waitlist for Taskipline to get early access.',
  openGraph: {
    title: 'Waitlist | Taskipline',
    description: 'Join the waitlist for Taskipline to get early access.',
    url: 'https://taskipline.emmy-akintz.tech/waitlist',
  },
}

export default function WaitlistLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

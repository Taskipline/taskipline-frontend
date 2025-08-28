import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password | Taskipline',
  description: 'Reset your password if you have forgotten it.',
  openGraph: {
    title: 'Forgot Password | Taskipline',
    description: 'Reset your password if you have forgotten it.',
    url: '/forgot-password',
  },
}

export default function ForgotPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

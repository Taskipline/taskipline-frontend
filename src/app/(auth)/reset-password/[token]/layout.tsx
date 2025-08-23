import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reset Password | Taskipline',
  description: 'Reset your password using the provided token.',
  openGraph: {
    title: 'Reset Password | Taskipline',
    description: 'Reset your password using the provided token.',
    url: '/reset-password/[token]',
  },
}

export default function ResetPasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

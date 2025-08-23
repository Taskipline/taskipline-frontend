import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Verify Account | Taskipline',
  description: 'Verify your account using the provided token.',
  openGraph: {
    title: 'Verify Account | Taskipline',
    description: 'Verify your account using the provided token.',
    url: '/verify-account/[token]',
  },
}

export default function VerifyAccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

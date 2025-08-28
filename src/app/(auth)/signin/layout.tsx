import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Taskipline',
  description: 'Sign in to your Taskipline account.',
  openGraph: {
    title: 'Sign In | Taskipline',
    description: 'Sign in to your Taskipline account.',
    url: '/signin',
  },
}

export default function SigninLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

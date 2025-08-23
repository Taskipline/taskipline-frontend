import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up | Taskipline',
  description: 'Create a new account on Taskipline.',
  openGraph: {
    title: 'Sign Up | Taskipline',
    description: 'Create a new account on Taskipline.',
    url: '/signup',
  },
}

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

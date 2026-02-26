import { Metadata } from 'next'
import { Suspense } from 'react'

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
  return (
    <main>
      <Suspense>{children}</Suspense>
    </main>
  )
}

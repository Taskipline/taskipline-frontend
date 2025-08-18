import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'
import QueryProvider from '@/providers/QueryProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// todo: adjust the icons

export const metadata: Metadata = {
  title: 'Taskipline | Building discipline with taskipline',
  description:
    'Taskipline is a discipline-focused productivity platform that unifies tasks, calendar, notes, and goals-powered by AI, gamification, and a customizable experience designed for web and mobile.',
  keywords: [
    'taskipline',
    'productivity',
    'tasks',
    'calendar',
    'notes',
    'goals',
    'AI',
    'gamification',
    'customizable',
    'web',
    'mobile',
    'discipline',
    'productivity platform',
    'task management',
    'goal setting',
    'note-taking',
    'calendar integration',
    'task organization',
    'productivity tools',
    'taskipline features',
    'taskipline benefits',
    'taskipline waitlist',
    'taskipline app',
    'taskipline platform',
    'taskipline productivity',
    'taskipline dashboard',
    'taskipline user experience',
    'taskipline community',
    'taskipline updates',
    'taskipline news',
    'taskipline launch',
  ],
  openGraph: {
    title: 'Taskipline | Building discipline with taskipline',
    description:
      'Taskipline is a discipline-focused productivity platform that unifies tasks, calendar, notes, and goals-powered by AI, gamification, and a customizable experience designed for web and mobile.',
    // url: 'https://taskipline.com',
    url: 'https://taskipline.emmy-akintz.tech',
    siteName: 'Taskipline',
    images: [
      {
        url: '/images/taskipline-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Taskipline Open Graph Image',
      },
    ],
    locale: 'en_US',
  },
  // metadataBase: new URL('https://taskipline.com'),
  metadataBase: new URL('https://taskipline.emmy-akintz.tech'),
  twitter: {
    card: 'summary_large_image',
    title: 'Taskipline | Building discipline with taskipline',
    description:
      'Taskipline is a discipline-focused productivity platform that unifies tasks, calendar, notes, and goals-powered by AI, gamification, and a customizable experience designed for web and mobile.',
    creator: '@emmy_ak7',
    images: ['/images/taskipline-og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster
              toastOptions={{
                style: {
                  background: 'var(--primary)',
                  color: 'black',
                  // border: '1px solid var(--color-primary-200)',
                },
                success: {
                  style: {
                    background: 'var(--color-success)',
                    color: '#ffffff',
                  },
                  iconTheme: {
                    primary: '#ffffff',
                    secondary: 'var(--color-success)',
                  },
                },
                error: {
                  style: {
                    background: 'var(--color-error)',
                    color: '#ffffff',
                  },
                  iconTheme: {
                    primary: '#ffffff',
                    secondary: 'var(--color-error)',
                  },
                },
                duration: 3000,
              }}
            />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from 'react-hot-toast'

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
  title: 'Taskipline',
  description: 'Building discipline with taskipline',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon-16x16.png',
        sizes: '16x16',
      },
      {
        rel: 'icon',
        url: '/favicon-32x32.png',
        sizes: '32x32',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  )
}

import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Goals | Taskipline',
  description: 'Manage your goals effectively with Taskipline',
  openGraph: {
    title: 'Goals | Taskipline',
    description: 'Manage your goals effectively with Taskipline',
    // url: "https://taskipline.com/goals",
    url: 'https://taskipline.emmy-akintz.tech/goals',
    siteName: 'Taskipline',
    // images: [
    //   {
    //     url: 'https://taskipline.com/images/og-image-goals.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'Goals on Taskipline',
    //   },
    // ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function GoalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

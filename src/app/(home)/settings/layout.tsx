import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | Taskipline',
  description: 'Manage your account settings and preferences.',
  openGraph: {
    title: 'Settings | Taskipline',
    description: 'Manage your account settings and preferences.',
    url: 'https://taskipline.emmy-akintz.tech/settings',
    siteName: 'Taskipline',
    // images: [
    //     {
    //         url: "/images/og-image.png",
    //         width: 1200,
    //         height: 630,
    //         alt: "Taskipline Settings",
    //     },
    // ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main>{children}</main>
}

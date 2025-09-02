import Header from '@/components/header'
import { clientId } from '@/lib/env'
import { GoogleOAuthProvider } from '@react-oauth/google'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GoogleOAuthProvider clientId={clientId!}>
      <section>
        <Header auth />
        <div className="grid py-10 px-6 gap-4 max-w-3xl mx-auto">
          {children}
        </div>
      </section>
    </GoogleOAuthProvider>
  )
}

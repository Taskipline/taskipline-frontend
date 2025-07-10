import Header from '@/components/UI/header'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      <Header auth />
      <div className="grid py-10 px-6 gap-4 max-w-3xl mx-auto">{children}</div>
    </section>
  )
}

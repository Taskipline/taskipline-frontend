import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <section className="flex-1 flex flex-col px-10 py-10">
        <SidebarTrigger />
        {children}
      </section>
    </SidebarProvider>
  )
}

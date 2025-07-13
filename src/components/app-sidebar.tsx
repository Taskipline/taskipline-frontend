'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Goal, Home, List, Settings } from 'lucide-react'
import Link from 'next/link'
import Title from './title'
import { usePathname } from 'next/navigation'
import { ModeToggle } from './mode-toggle'

const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Tasks',
    url: '/tasks',
    icon: List,
  },
  // {
  //   title: 'Calendar',
  //   url: '/calendar',
  //   icon: Calendar,
  // },
  // {
  //   title: 'Notes',
  //   url: '/notes',
  //   icon: NotebookPen,
  // },
  {
    title: 'Goals',
    url: '/goals',
    icon: Goal,
  },
]

export function AppSidebar() {
  const pathName = usePathname()
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex gap-2 p-2 items-center justify-between">
          <Title text="Taskipline" className="cursor-default" />
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathName === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild isActive={pathName === '/settings'}>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}

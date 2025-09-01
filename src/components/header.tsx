'use client'

import Link from 'next/link'
import { Button } from './ui/button'
import TaskiplineLogo from './ui/Icons/taskipline-logo'
import { ModeToggle } from './mode-toggle'
import { usePathname } from 'next/navigation'
import WaitlistModal from './waitlist/waitlist-modal'

export default function Header({ auth = false }: { auth?: boolean }) {
  const pathName = usePathname()
  if (auth) {
    return (
      <header className="sticky top-0 z-50 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between md:relative mx-auto">
          <TextAndLogo />
          <div className="flex items-center gap-2">
            {pathName === '/signup' ? (
              <Button asChild variant="outline">
                <Link href="/signin">Sign In</Link>
              </Button>
            ) : (
              pathName === '/signin' && (
                <Button asChild variant="outline">
                  <Link href="/signup">Signup</Link>
                </Button>
              )
            )}
            <ModeToggle />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between md:relative mx-auto">
        {/* Logo and Text - Left Side */}
        <TextAndLogo />

        {/* Desktop Navigation - Right Side */}
        <div className="hidden md:flex md:absolute right-0 items-center space-x-6">
          <nav className="flex items-center space-x-6">
            {/* <Link
              href="#product"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Product
            </Link>
            <Link
              href="#prices"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Prices
            </Link>
            <Link
              href="#resources"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Resources
            </Link> */}
          </nav>
          <WaitlistModal ctaSize="default" />
          {/* <Button asChild>
            <Link href="/signin">Sign In</Link>
          </Button> */}
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden gap-2">
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-4 py-8 px-4">
                <Link
                  href="#product"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                >
                  Product
                </Link>
                <Link
                  href="#prices"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                >
                  Prices
                </Link>
                <Link
                  href="#resources"
                  className="text-sm font-medium transition-colors hover:text-primary py-2"
                >
                  Resources
                </Link>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet> */}
          <WaitlistModal ctaSize="default" />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

function TextAndLogo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <TaskiplineLogo />
      <span className="font-bold text-xl">Taskipline</span>
    </Link>
  )
}

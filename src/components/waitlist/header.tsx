import Link from 'next/link'
import { Button } from '../UI/button'
import TaskiplineLogo from '../UI/Icons/taskipline-logo'
import { Sheet, SheetContent, SheetTrigger } from '../UI/sheet'
import { Menu } from 'lucide-react'

export default function WaitlistHeader() {
  return (
    <header className="sticky top-0 z-50 w-full px-6 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Text - Left Side */}
        <Link href="/" className="flex items-center space-x-2">
          <TaskiplineLogo />
          <span className="font-bold text-xl">Taskipline</span>
        </Link>

        {/* Desktop Navigation - Right Side */}
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <Link
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
            </Link>
          </nav>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link
                href="/product"
                className="text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Product
              </Link>
              <Link
                href="/prices"
                className="text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Prices
              </Link>
              <Link
                href="/resources"
                className="text-sm font-medium transition-colors hover:text-primary py-2"
              >
                Resources
              </Link>
              <div className="pt-4">
                <Button asChild className="w-full">
                  <Link href="/login">Login</Link>
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

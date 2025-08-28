import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const neutralRoutes = ['/']
const guestOnlyRoutes = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-account',
  '/waitlist',
]

const redirects = {
  signIn: '/signin',
  afterAuth: '/dashboard',
}

function matchPath(path: string, routes: string[]): boolean {
  return routes.some((r) => {
    if (r === '/') return path === '/'
    return path === r || path.startsWith(`${r}/`)
  })
}

function isAuthenticated(request: NextRequest): boolean {
  const raw = request.cookies.get('auth-storage')?.value
  if (!raw) return false
  try {
    const parsed = JSON.parse(raw)
    return Boolean(parsed?.state?.accessToken)
  } catch {
    return false
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authed = isAuthenticated(request)

  const isNeutral = matchPath(path, neutralRoutes)
  const isGuestOnly = matchPath(path, guestOnlyRoutes)
  const isDefaultProtected = !isNeutral && !isGuestOnly

  // Neutral: no auth-based redirects
  if (isNeutral) return NextResponse.next()

  // Guest-only: redirect authed users away
  if (isGuestOnly && authed) {
    return NextResponse.redirect(new URL(redirects.afterAuth, request.nextUrl))
  }

  // Default protected: require auth
  if (isDefaultProtected && !authed) {
    return NextResponse.redirect(new URL(redirects.signIn, request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

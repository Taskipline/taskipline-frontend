import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = [
  '/signin',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-account',
  '/waitlist',
]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicRoute = publicRoutes.some((publicPath) =>
    path.startsWith(publicPath)
  )

  const authCookie = request.cookies.get('auth-storage')?.value

  let isAuth = false
  if (authCookie) {
    try {
      const { state } = JSON.parse(authCookie)
      if (state.accessToken) {
        isAuth = true
      }
    } catch {
      isAuth = false
    }
  }

  if (!isPublicRoute && !isAuth) {
    return NextResponse.redirect(new URL('/signin', request.nextUrl))
  }

  if (isPublicRoute && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

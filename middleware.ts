import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const protectedRoute = createRouteMatcher([
    '/dashboard(.*)'
])

export default clerkMiddleware(async (auth, request) => {
    const { userId } = await auth()
    
    // Protect dashboard routes
    if (protectedRoute(request)) {
        await auth.protect()
    }
    
    // Redirect authenticated users from home page to dashboard
    if (userId && request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
    return NextResponse.next()
})

export const config = {
    matcher: [
        // Match all routes except static assets, _next files, and public files
        '/((?!_next|.*\\..*).*)',
        '/(api|trpc)(.*)',
    ],
}
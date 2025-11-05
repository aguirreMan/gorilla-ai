import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRoute = createRouteMatcher([
    '/dashboard(.*)'
])

export default clerkMiddleware(async (auth, request) => {
    if (protectedRoute(request)) await auth.protect()
})

export const config = {
    matcher: [
        // Match all routes except static assets, _next files, and public files
        '/((?!_next|.*\\..*).*)',
        '/(api|trpc)(.*)',
    ],
}
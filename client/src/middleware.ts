import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Utility to check protected routes
const isProtectedRoute = (req: NextRequest) => {
    return req.nextUrl.pathname.startsWith("/dashboard")
}

// Function to validate JWT token with Strapi
async function validateStrapiToken(token: string | undefined) {
    if (!token) return null

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/users/me`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )

        if (!res.ok) return null

        const user = await res.json()
        return user
    } catch (err) {
        console.error("Error validating token with Strapi:", err)
        return null
    }
}

export async function middleware(req: NextRequest) {
    const token =
        req.cookies.get("jwtNutrifyS")?.value ||
        req.headers.get("Authorization")?.replace("Bearer ", "")

    if (isProtectedRoute(req)) {
        const user = await validateStrapiToken(token)
        if (!user) {
            return NextResponse.redirect(new URL("/login", req.url))
        }

        // You can attach user to request if needed via headers or rewrites
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        "/(api|trpc)(.*)",
    ],
}

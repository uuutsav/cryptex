import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAuthRoute = createRouteMatcher(["/login(.*)", "/signup(.*)"]);
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {

    const { userId } = await auth();

    if (isPublicRoute(req) || (!userId && isAuthRoute(req))) {
        return NextResponse.next();
    }

    if (userId && isAuthRoute(req)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (!userId && !isAuthRoute(req)) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        '/((?!_next|.*\\.(?:html?|css|js|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
};

import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/jwt";
import { USER_ROLES } from "@/utils/constants";
import { RouteConfig } from "@/utils/routeConfig";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const baseUrl = process.env.NEXT_PUBLIC_APP_BASE_URL || "";
  const pathname = req.nextUrl.pathname;
  console.log(pathname)
  const redirectPath = process.env.NEXT_PUBLIC_APP_BASE_URL;

  /* -------------------- AUTH CHECK -------------------- */
  if (!token) {
    return NextResponse.redirect(new URL(`${redirectPath}`, req.url));
  }

  try {
    const payload = await verifyAccessToken(token);
    const role = payload.role;

    /* ---------------- DASHBOARD PROTECTION ---------------- */

    if (pathname.startsWith("/dashboard")) {
      // SUPER ADMIN DASHBOARD
      if (
        pathname.startsWith(RouteConfig.SADMIN_DASHBOARD) &&
        role !== USER_ROLES.SUPER_ADMIN
      ) {
        return NextResponse.redirect(
          new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
        );
      }

      // ADMIN DASHBOARD
      if (
        pathname.startsWith(RouteConfig.ADMIN_DASHBOARD) &&
        role !== USER_ROLES.ADMIN
      ) {
        return NextResponse.redirect(
          new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
        );
      }

      // SOCIETY ADMIN DASHBOARD
      if (
        pathname.startsWith(RouteConfig.SOC_ADMIN_DASHBOARD) &&
        role !== USER_ROLES.SOCIETY_ADMIN
      ) {
        return NextResponse.redirect(
          new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
        );
      }

      // VISITOR DASHBOARD
      if (
        pathname.startsWith(RouteConfig.VISITOR_DASHBOARD) &&
        role !== USER_ROLES.VISITOR
      ) {
        return NextResponse.redirect(
          new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
        );
      }

      return NextResponse.next();
    }

    /* ---------------- ROLE BASED MODULE ACCESS ---------------- */

    // SUPER ADMIN MODULES
    if (pathname.startsWith("/superAdmin")) {
      if (role === USER_ROLES.SUPER_ADMIN) return NextResponse.next();
      return NextResponse.redirect(
        new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
      );
    }

    // ADMIN MODULES
    if (pathname.startsWith("/admin")) {
      if (
        role === USER_ROLES.ADMIN ||
        role === USER_ROLES.SUPER_ADMIN
      ) {
        return NextResponse.next();
      }
      return NextResponse.redirect(
        new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
      );
    }

    // VISITOR MODULES
    if (pathname.startsWith("/visitor")) {
      if (role === USER_ROLES.VISITOR) return NextResponse.next();
      return NextResponse.redirect(
        new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
      );
    }

    /* ---------------- FALLBACK ---------------- */
    return NextResponse.redirect(
      new URL(`${baseUrl}${RouteConfig.NOT_AUTHORIZED}`, req.url)
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.redirect(new URL(`${redirectPath}`, req.url));
  }
}

/* ---------------- MIDDLEWARE MATCHER ---------------- */

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/superAdmin/:path*",
    "/admin/:path*",
    "/visitor/:path*",
  ],
};

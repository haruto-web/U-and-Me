import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

function redirectWithCookies(
  request: NextRequest,
  response: NextResponse,
  pathname: string,
  error?: string,
) {
  const destination = request.nextUrl.clone();
  destination.pathname = pathname;
  destination.search = "";

  if (error) {
    destination.searchParams.set("error", error);
  }

  const redirectResponse = NextResponse.redirect(destination);

  response.cookies.getAll().forEach((cookie) => {
    redirectResponse.cookies.set(cookie);
  });
  for (const name of ["cache-control", "expires", "pragma"]) {
    const value = response.headers.get(name);
    if (value) {
      redirectResponse.headers.set(name, value);
    }
  }

  return redirectResponse;
}

export async function proxy(request: NextRequest) {
  const session = await updateSession(request);
  const { response } = session;
  const isLoginPage = request.nextUrl.pathname === "/login";

  if (session.failed) {
    return response;
  }

  if (!session.configured) {
    return isLoginPage
      ? response
      : redirectWithCookies(request, response, "/login", "configuration");
  }

  if (!session.userId) {
    return isLoginPage
      ? response
      : redirectWithCookies(request, response, "/login");
  }

  const { data: profile, error: profileError } = await session.supabase
    .from("profiles")
    .select("is_member, is_admin")
    .eq("id", session.userId)
    .maybeSingle();

  if (profileError) {
    console.error("Could not verify shared-space membership.", profileError);
    return NextResponse.json(
      { error: "Could not verify account access. Please try again." },
      { status: 503, headers: { "Cache-Control": "private, no-store" } },
    );
  }

  if (!profile?.is_member) {
    return isLoginPage
      ? response
      : redirectWithCookies(request, response, "/login", "not_authorized");
  }

  if (isLoginPage || (request.nextUrl.pathname.startsWith("/admin") && !profile.is_admin)) {
    return redirectWithCookies(request, response, "/");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

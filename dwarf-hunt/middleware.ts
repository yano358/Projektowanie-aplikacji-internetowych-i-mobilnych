import { checkSession } from "@/app/actions";
import { NextResponse, type NextRequest } from "next/server";
import updateSession from "./config/signUpClient";

export async function middleware(request: NextRequest, response: NextResponse) {
  await updateSession(request);
  const data = await checkSession();
  const { pathname } = request.nextUrl;

  const name = pathname.substring(12);
  const slug = `/discussion/${name}`;

  if (
    data &&
    (request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/signup")
  ) {
    const redirectUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  } else {
    if (
      !data &&
      (request.nextUrl.pathname === "/private" ||
        request.nextUrl.pathname === "/" ||
        request.nextUrl.pathname === slug.toString() ||
        request.nextUrl.pathname === "/achievents")
    ) {
      const redirectUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.next();
    }
  }
}

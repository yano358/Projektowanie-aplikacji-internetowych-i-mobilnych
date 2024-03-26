import { checkSesh } from "@/app/actions";
import { NextResponse, type NextRequest } from "next/server";
import updateSession from "./config/signUpClient";

export async function middleware(request: NextRequest, response: NextResponse) {
  await updateSession(request);
  const data = await checkSesh();
  console.log(data);
  const { pathname } = request.nextUrl;

  const name = pathname.substring(12);
  const slug = `/discussion/${name}`;
  console.log(slug);
  console.log(request.nextUrl.pathname);
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
        request.nextUrl.pathname === "/achievements" ||
        request.nextUrl.pathname === "/manageaccount" ||
        request.nextUrl.pathname === "/leaderboard")
    ) {
      const redirectUrl = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.next();
    }
  }
}

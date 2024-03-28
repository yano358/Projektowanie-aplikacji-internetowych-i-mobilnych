import { checkSesh } from "@/app/actions";
import { NextResponse, type NextRequest } from "next/server";
import updateSession from "./config/signUpClient";
import { supabase } from "./config/supabase";

async function checkAccount() {
  const data = await checkSesh();
  if (data) {
    const accounts = await supabase
      .from("accounts")
      .select("*")
      .eq("user_id", data.user.id);
    if (accounts.data?.length === 0) {
      return true;
    } else return false;
    return false;
  }
}

export async function middleware(request: NextRequest, response: NextResponse) {
  await updateSession(request);
  const data = await checkSesh();
  const { pathname } = request.nextUrl;
  const name = pathname.substring(12);
  const slug = `/discussion/${name}`;
  if (data && (await checkAccount())) {
    const { error } = await supabase
      .from("accounts")
      .insert([{ user_id: data.user.id, username: data.user.email }]);
  }
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

"use server";

import { signUpSupabaseServerClient } from "../../../config/signUpClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function checkSesh() {
  const supabase = await signUpSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  return data;
}
export async function signUp(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const supabase = await signUpSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}
export async function signOut() {
  const supabase = await signUpSupabaseServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/login");
}
// export async function onSubmitSignUp(data: {
//   email: string;
//   password: string;
//   confirmPassword: string;
// }) {
//   const res = await signUp(data);
// }

export async function signIn(data: { email: string; password: string }) {
  const supabase = await signUpSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  if (error) {
    redirect("/error");
  }
  revalidatePath("/", "layout");
  redirect("/");
}

// export async function onSubmitSignIn(data: {
//   email: string;
//   password: string;
// }) {
//   const res = await signIn(data);
// }

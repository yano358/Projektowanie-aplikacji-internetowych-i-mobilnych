import { Button, Box } from "@mui/material";
import { signUpSupabaseServerClient } from "../config/supabase";
import { redirect } from "next/navigation";

export default function SignOut() {
  const LogOut = async () => {
    "use server";
    const supabe = await signUpSupabaseServerClient();
    const { error } = await supabe.auth.signOut();
    if (error) {
      redirect("/error");
    }
    redirect("/");
  };

  return (
    <>
      <button onClick={LogOut}> Log out </button>
    </>
  );
}

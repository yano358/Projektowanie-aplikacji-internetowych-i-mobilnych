import { redirect } from "next/navigation";
import { Box } from "@mui/material";
import { signUpSupabaseServerClient } from "../../../config/signUpClient";

export default async function PrivatePage() {
  const supabase = await signUpSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return <Box>Hello {data.user.email}</Box>;
}

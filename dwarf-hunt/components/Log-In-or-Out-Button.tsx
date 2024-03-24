import { Box, Button } from "@mui/material";
import { WhiteButton } from "../components/NavBar";
import { signUpSupabaseServerClient } from "../config/signUpClient";
import { supabase } from "../config/supabase";
import Link from "next/link";
import { signOut, checkSession } from "@/app/actions";

export default function logInOutButton() {
  const user = checkSession();
  const btnClick = () => {
    console.log(user);
  };
  return <WhiteButton onClick={btnClick}>Sign out</WhiteButton>;
}

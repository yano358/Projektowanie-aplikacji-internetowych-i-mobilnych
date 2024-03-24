import { signUpSupabaseServerClient } from "../../../config/signUpClient";
import { Button } from "@mui/material";
const test = () => {
  const test2 = async () => {
    const supabase = await signUpSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();
    console.log(data);
  };
  return (
    <div>
      <Button onClick={test2}>Test</Button>
    </div>
  );
};
export default test;

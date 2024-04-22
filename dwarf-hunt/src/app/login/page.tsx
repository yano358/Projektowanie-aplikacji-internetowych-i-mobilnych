"use client";
import { Button, Box, TextField } from "@mui/material";
import { useState } from "react";
import { signIn } from "../actions";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newpassword = event.target.value;
    setPassword(newpassword);
  };
  const handleLoginClick = async () => {
    await signIn({ email: email, password: password });
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        top: 0,
        left: 0,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: "auto",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
          backgroundColor: "white",
          padding: "40px",
          marginTop: "40px",
          border: "2px solid #000",
          borderRadius: "8px",
        }}
      >
        <TextField
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <TextField
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" onClick={handleLoginClick}>
          Log in
        </Button>
        <Box
          sx={{
            display: "flex",
            padding: "5px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            border: "2px solid red",
            borderRadius: "8px",
          }}
        >
          Don't have an account yet?
        </Box>
        <Button variant="contained" href="/signup">
          Sign up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

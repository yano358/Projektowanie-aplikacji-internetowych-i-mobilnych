"use client";
import { Button, Box, TextField } from "@mui/material";
import { useState } from "react";

import NavBar from "../../../components/NavBar";
import signUp from "../actions/index";
const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newusername = event.target.value;
    setUsername(newusername);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newpassword = event.target.value;
    setPassword(newpassword);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newconfpassword = event.target.value;
    setConfirmPassword(newconfpassword);
  };

  const handleSignupClick = () => {
    signUp({
      email: email,
      password: password,
      confirmPassword: confirm_password,
    });
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <NavBar />
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
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
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
        <TextField
          required
          id="outlined-basic"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirm_password}
          onChange={handleConfirmPasswordChange}
        />
        <Button variant="contained" onClick={handleSignupClick}>
          Sign Up
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

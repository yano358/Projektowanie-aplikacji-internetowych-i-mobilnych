"use client";
import { Button, Box, TextField } from "@mui/material";
import { Console, log } from "console";
import { use, useState } from "react";

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<String>("");
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newusername = event.target.value;
    setUsername(newusername);
  };
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newpassword = event.target.value;
    setPassword(newpassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "center",
        // flexDirection: "column",
        // height: "100%",
        // width: "auto",
        //padding: "16px",
        backgroundColor: "lightyellow",
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
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsernameChange}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button variant="contained" href="/">
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;

"use client";
import { Box } from "@mui/system";
import NavBar from "../../../components/NavBar";
import { use, useEffect, useState } from "react";
import { changeEmail, checkSesh, changeUsername } from "../actions";
import { supabase } from "../../../config/supabase";
import { TextField, Button } from "@mui/material";

const ManageAccount = () => {
  const [userData, setUserData] = useState<any | undefined>(undefined);
  const [accountData, setAccountData] = useState<any | undefined>([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await checkSesh();
      setUserData(userData);
    };
    fetchUserData();
  }, []);
  useEffect(() => {
    const fetchAccountData = async () => {
      if (!userData) return;
      const accountData = await supabase
        .from("accounts")
        .select("username")
        .eq("user_id", userData.user.id);
      setAccountData(accountData);
    };
    fetchAccountData();
  }, [userData]);
  const [changeEmailFlag, setChangeEmailFlag] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>("");
  const handleNewEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newemail = event.target.value;
    if (newemail !== "") {
      setChangeEmailFlag(true);
    } else setChangeEmailFlag(false);
    setNewEmail(newemail);
  };
  const [changeUsernameFlag, setChangeUsernameFlag] = useState<boolean>(false);
  const [newUsername, setNewUsername] = useState<string>("");
  const handleNewUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newusername = event.target.value;
    if (newusername !== "") {
      setChangeUsernameFlag(true);
    } else setChangeUsernameFlag(false);
    setNewUsername(newusername);
  };
  const refetch = async () => {
    if (!userData) return;
    const accountData2 = await supabase
      .from("accounts")
      .select("username")
      .eq("user_id", userData.user.id);

    const username = accountData.data?.at(0)?.username;
    const newUsername = accountData2.data?.at(0)?.username;
    if (username === newUsername) {
      refetch();
    }
    setAccountData(accountData2);
  };
  const changeClick = () => {
    try {
      if (changeUsernameFlag) {
        changeUsername({ username: newUsername });
        setChangeUsernameFlag(false);
        refetch();
      }
    } catch (error) {
    } finally {
      if (changeEmailFlag) {
        changeEmail({ email: newEmail });
        setChangeEmailFlag(false);
      }
    }
  };
  return (
    <>
      <NavBar />
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
            padding: "25px",
            display: "flex",
            position: "relative",
            backgroundColor: "white",
            marginTop: "40px",
            border: "2px solid #000",
            borderRadius: "8px",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              padding: "50px",
              display: "flex",
              flexDirection: "draw",
              gap: 20,
              backgroundColor: "white",
              marginTop: "40px",
              border: "2px solid #000",
              borderRadius: "8px",
            }}
          >
            <TextField
              value={userData?.user.email}
              disabled
              label="Current Email"
              defaultValue="Current Email"
            ></TextField>
            <TextField
              label="New Email - leave empty to keep the same email"
              defaultValue={"New Email"}
              value={newEmail}
              onChange={handleNewEmailChange}
            ></TextField>
          </Box>
          <Box
            sx={{
              padding: "50px",
              display: "flex",
              flexDirection: "draw",
              gap: 20,
              backgroundColor: "white",
              marginTop: "40px",
              border: "2px solid #000",
              borderRadius: "8px",
            }}
          >
            <TextField
              value={accountData.data?.at(0)?.username}
              disabled
              label="Current username"
              defaultValue="Current username"
            ></TextField>
            <TextField
              label="New username - leave empty to keep the same"
              defaultValue={"New Username"}
              value={newUsername}
              onChange={handleNewUsernameChange}
            ></TextField>
          </Box>
          <Box padding="50px">
            <Button variant="contained" onClick={changeClick}>
              Change
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ManageAccount;

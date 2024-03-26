import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";

const BlackAppBar = styled(AppBar)({
  backgroundColor: "red",
  width: "100%",
  fontSize: "30px",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "10px",
});

interface TitleText {
  children?: React.ReactNode;
}

const TitleStrip: React.FC<TitleText> = ({ children }) => {
  return <BlackAppBar>{children}</BlackAppBar>;
};
export default TitleStrip;

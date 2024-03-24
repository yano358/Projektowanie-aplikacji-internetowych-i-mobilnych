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
  textData: string;
}

const TitleStrip: React.FC<TitleText> = ({ textData }) => {
  return <BlackAppBar>{textData}</BlackAppBar>;
};
export default TitleStrip;

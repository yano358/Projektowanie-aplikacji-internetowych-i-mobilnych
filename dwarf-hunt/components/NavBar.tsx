import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";

const BlackAppBar = styled(AppBar)({
  backgroundColor: "black",
  width: "100%",
  height: 65,
  position: "relative",
  top: 0,
  left: 0,
  justifyContent: "between",
});

const WhiteButton = styled(Button)({
  color: "black",
  backgroundColor: "white",
  margin: 7,
  "&:hover": {
    backgroundColor: "red",
    color: "white",
  },
});

const CenteredToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const NavBar: React.FC = () => {
  return (
    <BlackAppBar>
      <CenteredToolbar>
        <Link href="/" passHref>
          <WhiteButton>Mapa</WhiteButton>
        </Link>

        <Link href="/browse" passHref>
          <WhiteButton>Spis Krasnali</WhiteButton>
        </Link>

        <Link href="/achievements" passHref>
          <WhiteButton>Osiągnięcia</WhiteButton>
        </Link>
      </CenteredToolbar>
    </BlackAppBar>
  );
};

export default NavBar;

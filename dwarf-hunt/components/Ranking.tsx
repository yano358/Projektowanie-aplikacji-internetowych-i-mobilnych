import React, { ReactNode } from "react";
import { Box, Card } from "@mui/material";
import { styled } from "@mui/system";
import RankingTile from "../components/RankingTile";

const RankingBoxWrapper = styled(Box)({
  backgroundColor: "gray",
  width: "420px",
  height: "500px",
  position: "relative",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "scroll",
  margin: "10px auto",
  border: "2px solid gray",
  borderRadius: "3px",
  "&::-webkit-scrollbar": {
    width: "10px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "black",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "white",
  },
});

const TileContainer = styled(Box)({
  height: "25px",
  display: "flex",
  flexDirection: "row",
  backgroundColor: "red",
});

const PlaceTile = styled(Card)({
  backgroundColor: "inherit",
  width: "15%",
  color: "white",
  justifyContent: "left",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  border: "2px solid black",
  paddingLeft: "2px",
  borderRadius: 0,
  fontSize: "15px",
});

const NameTile = styled(Card)({
  backgroundColor: "inherit",
  width: "70%",
  color: "white",
  justifyContent: "left",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  border: "2px solid black",
  paddingLeft: "2px",
  borderRadius: 0,
  fontSize: "15px",
});

interface RankingBoxProps {
  children: ReactNode[];
}

const RankingBox: React.FC<RankingBoxProps> = ({ children }) => {
  return (
    <RankingBoxWrapper>
      <TileContainer>
        <PlaceTile>place</PlaceTile>
        <NameTile>name</NameTile>
        <PlaceTile>score</PlaceTile>
      </TileContainer>
      {children}
    </RankingBoxWrapper>
  );
};

export default RankingBox;

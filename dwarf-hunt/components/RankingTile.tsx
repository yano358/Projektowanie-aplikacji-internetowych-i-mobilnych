import React from "react";
import { Card, Box } from "@mui/material";
import { styled } from "@mui/system";

interface RankingData {
  name: string;
  score: string;
  place: string;
}

const TileContainer = styled(Box)({
  height: "35px",
  display: "flex",
  flexDirection: "row",
});

const PlaceTile = styled(Card)({
  backgroundColor: "inherit",
  width: "15%",
  color: "white",
  justifyContent: "left",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  border: "2px solid black",
  paddingLeft: "2px",
  borderRadius: 0,
  fontSize: "20px",
});

const NameTile = styled(Card)({
  backgroundColor: "inherit",
  width: "70%",
  color: "white",
  justifyContent: "left",
  textAlign: "left",
  display: "flex",
  alignItems: "center",
  border: "2px solid black",
  paddingLeft: "2px",
  borderRadius: 0,
  fontSize: "20px",
});

const RankingTile: React.FC<RankingData> = ({ name, score, place }) => {
  return (
    <TileContainer>
      <PlaceTile>{place}.</PlaceTile>
      <NameTile>{name}</NameTile>
      <PlaceTile>{score}</PlaceTile>
    </TileContainer>
  );
};

export default RankingTile;

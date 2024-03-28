import React, { useEffect, useState } from "react";
import { Card, Toolbar, Button } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { FC } from "react";

interface AchievementData {
  name: string;
  description: string;

  aqusition_date?: string;
  is_achieved: boolean;
}

const BlackCard = styled(Card)(({ isAchieved }: { isAchieved: boolean }) => ({
  backgroundColor: isAchieved ? "#4a4343" : "black",
  color: "white",
  width: 336,
  height: 200,
  position: "relative",
  justifyContent: "between",
  alignItems: "center",
  border: isAchieved ? "4px solid black" : "4px solid #4a4343",
  borderRadius: 10,
  margin: 10,
}));

const NameTile = styled(Card)({
  backgroundColor: "inherit",
  color: "white",
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderBottom: "2px solid red",
});

const DescriptionTile = styled(Card)({
  fontSize: "22px",
  backgroundColor: "inherit",
  color: "white",
  height: "60%",
  display: "flex",
  margin: 0,
  padding: "5px 10px",
  borderBottom: "2px solid red",
  textAlign: "justify",
  borderRadius: 0,
});

const DateTile = styled(Card)({
  fontSize: "10px",
  backgroundColor: "inherit",
  color: "white",
  height: "20%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: 0,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  padding: "5px 10px",
});

const AchievedBox: FC<AchievementData> = ({
  name,
  description,
  aqusition_date,
  is_achieved,
}) => {
  const dateA = aqusition_date ? aqusition_date.slice(0, 10) : "";

  return (
    <BlackCard isAchieved={is_achieved}>
      <NameTile>{name}</NameTile>
      <DescriptionTile>{description}</DescriptionTile>
      <DateTile>{dateA}</DateTile>
    </BlackCard>
  );
};

export default AchievedBox;

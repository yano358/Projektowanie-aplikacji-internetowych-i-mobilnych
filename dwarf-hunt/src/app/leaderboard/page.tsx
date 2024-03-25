"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import { checkSesh } from "../actions/index";
import TitleStrip from "../../../components/TitleStrip";
import Navbar from "../../../components/NavBar";
import Ranking from "../../../components/Ranking";
import RankingTile from "../../../components/RankingTile";

const LeaderboardPage = () => {
  const [scores, setScores] = useState<any[]>([]);
  const [yourPos, setYourPos] = useState<any>("");

  useEffect(() => {
    const fetchScoresData = async () => {
      const usersScores = await fetschScore();
      setScores(usersScores);
    };
    fetchScoresData();
  }, []);

  const fetschScore = async () => {
    try {
      const currentUserId = (await checkSesh()).user?.id;
      const { data, error } = await supabase
        .from("timered_leaderboard")
        .select("username, score, place")
        .range(0, 19);
      if (error) {
        throw error;
      }
      console.log("idd?" + currentUserId);
      const posData = await supabase
        .from("timered_leaderboard")
        .select("place")
        .eq("user_id", currentUserId)
        .single();

      if (posData && posData.data && posData.data.place !== undefined) {
        const place = posData.data.place;
        console.log("eee" + place);
        setYourPos("YOUR POSITION: " + place);
      } else {
        console.error("Position data or 'place' field not found!");
      }
      return data;
    } catch (error) {
      console.error("Error fetching user scores:", error);
      return [];
    }
  };

  return (
    <Box>
      <Navbar></Navbar>
      <TitleStrip textData="LEADERBOARD"></TitleStrip>

      <Ranking>
        {scores.map((score, index) => (
          <RankingTile
            key={index}
            name={score.username}
            place={score.place}
            score={score.score}
          />
        ))}
      </Ranking>
      <TitleStrip textData={yourPos}></TitleStrip>
    </Box>
  );
};

export default LeaderboardPage;

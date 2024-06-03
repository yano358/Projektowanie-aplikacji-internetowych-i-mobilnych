"use client";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import { checkSesh } from "../actions/index";
import TitleStrip from "../../../components/TitleStrip";
import Navbar from "../../../components/NavBar";
import Ranking from "../../../components/Ranking";
import RankingTile from "../../../components/RankingTile";
import { signOut } from "../actions/index";

const LeaderboardPage = () => {
  const [scores, setScores] = useState<any[] | undefined>([]);
  const [yourPos, setYourPos] = useState<any>("");
  const [loadedRecords, setLoadedRecords] = useState<number>(0);

  useEffect(() => {
    const fetchScoresData = async () => {
      const usersScores = await fetchScore();
      setScores(usersScores);
    };
    fetchScoresData();
  }, [loadedRecords]);

  const fetchScore = async () => {
    try {
      const currentUser = await checkSesh();
      if (!currentUser) {
        return;
      }
      const currentUserId = currentUser.user.id;
      const { data, error } = await supabase
        .from("timered_leaderboard")
        .select("username, score, place")
        .range(0, 9 + loadedRecords);
      if (error) {
        throw error;
      }
      const posData = await supabase
        .from("timered_leaderboard")
        .select("place")
        .eq("user_id", currentUserId)
        .single();

      if (posData && posData.data && posData.data.place !== undefined) {
        const place = posData.data.place;
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

  const handleLoadMore = () => {
    setLoadedRecords((prev) => prev + 10);
  };

  const logOutAction = async () => {
    await signOut();
  };
  return (
    <Box>
      <Navbar />
      <Button variant="contained" onClick={logOutAction}>
        Log out
      </Button>
      <TitleStrip>LEADERBOARD</TitleStrip>

      <Ranking>
        {scores &&
          scores.map((score, index) => (
            <RankingTile
              key={index}
              name={score.username}
              place={score.place}
              score={score.score}
            />
          ))}
        <Button
          onClick={handleLoadMore}
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            ":hover": { backgroundColor: "#34303b" },
          }}
        >
          Load more
        </Button>
      </Ranking>
      <TitleStrip>{yourPos}</TitleStrip>
    </Box>
  );
};

export default LeaderboardPage;

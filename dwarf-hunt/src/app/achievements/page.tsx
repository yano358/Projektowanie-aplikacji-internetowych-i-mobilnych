"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import NavBar from "../../../components/NavBar";
import AchievedBox from "../../../components/AchievedBox";
import TitleStrip from "../../../components/TitleStrip";

const YourAchievementsPage = () => {
  const [achievedAchievements, setAchieved] = useState<any[]>([]);
  const [unachievedAchievements, setUnachieved] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState(null); //TODO aadd getting user's session

  useEffect(() => {
    const fetchData = async () => {
      const userAchievements = await fetchUserAchievements();
      const achievedIds = userAchievements.map(
        (achievement: any) => achievement.achievement_id
      );
      setAchieved(userAchievements);
      const notAchieved = await fetchNotAchieved(achievedIds);
      setUnachieved(notAchieved);
    };
    fetchData();
  }, []);

  const fetchUserAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("user_achievements")
        .select(
          "achievement_id, created_at, accounts(user_id , username), achievements(id, name, description)"
        )
        .eq("user_id", "7df92215-10da-425e-b7ac-f6925ff98ac5"); //TODO aadd getting user's session
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error fetching user achievements:", error);
      return [];
    }
  };

  const fetchNotAchieved = async (achievedIds: string[]) => {
    try {
      const idsString = `(${achievedIds.join(",")})`;
      const { data, error } = await supabase
        .from("achievements")
        .select("id, name, description")
        .not("id", "in", idsString);
      if (error) {
        throw error;
      }
      return data;
    } catch (error) {
      console.error("Error fetching not achieved achievements:", error);
      return [];
    }
  };

  return (
    <Box>
      <NavBar />
      <TitleStrip textData={"Your Achievements:"}></TitleStrip>
      <Box display="flex" flexWrap="wrap">
        {achievedAchievements.map((achievement, index) => (
          <Box key={index} marginRight={1} marginBottom={1}>
            <Typography variant="body1">
              <AchievedBox
                name={achievement.achievements.name}
                description={achievement.achievements.description}
                aqusition_date={achievement.created_at}
                is_achieved={true}
              ></AchievedBox>
            </Typography>
          </Box>
        ))}
      </Box>

      <TitleStrip textData={"Not Achieved:"}></TitleStrip>
      <Box display="flex" flexWrap="wrap">
        {unachievedAchievements.map((achievement, index) => (
          <Box key={index} marginRight={1} marginBottom={1}>
            <Typography variant="body1">
              <AchievedBox
                name={achievement.name}
                description={achievement.description}
                aqusition_date="TBD"
                is_achieved={false}
              ></AchievedBox>
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default YourAchievementsPage;
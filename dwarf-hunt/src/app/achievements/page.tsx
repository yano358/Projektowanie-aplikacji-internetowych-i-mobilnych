"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import { checkSesh } from "../actions/index";
import { signUpSupabaseServerClient } from "../../../config/signUpClient";
import NavBar from "../../../components/NavBar";
import AchievedBox from "../../../components/AchievedBox";
import TitleStrip from "../../../components/TitleStrip";

const YourAchievementsPage = () => {
  const [achievedAchievements, setAchieved] = useState<any[]>([]);
  const [unachievedAchievements, setUnachieved] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userAchievements = await fetchUserAchievements();
        const achievedIds = userAchievements.map(
          (achievement: any) => achievement.achievement_id
        );
        setAchieved(userAchievements);
        const notAchieved = await fetchNotAchieved(achievedIds);
        setUnachieved(notAchieved);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchUserAchievements = async () => {
    try {
      const user = await checkSesh();
      const currentUserId = user?.user.id;
      const { data, error } = await supabase
        .from("user_achievements")
        .select(
          "achievement_id, created_at, accounts(user_id , username), achievements(id, name, description)"
        )
        .eq("user_id", currentUserId);
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

  if (isLoading) {
    return <Typography>Loading Achievements...</Typography>;
  }

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

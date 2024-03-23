"use client";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "../../../config/supabase";
import userGetter from "../private/page";

const YourAchievementsPage = () => {
  const [achievedAchievements, setAchieved] = useState<any[]>([]);
  const [unachievedAchievements, setUnachieved] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState(null);

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

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const userData = await getUserData();
  //     if (userData !== null && userData.user !== null) {
  //       console.log("fetched user data", userData);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  // const getUserData = async () => {
  //   try {
  //     const { data, error } = await supabase.auth.getUser();
  //     const something = userGetter();
  //     console.log("SOMETHING", something);
  //     if (error) {
  //       throw error;
  //     }
  //     console.log("to jest userData:", data);
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching user!!!", error);
  //     return null;
  //   }
  // };

  const fetchUserAchievements = async () => {
    try {
      const { data, error } = await supabase
        .from("user_achievements")
        .select(
          "achievement_id, accounts(user_id , username), achievements(id, name, description)"
        )
        .eq("user_id", "7df92215-10da-425e-b7ac-f6925ff98ac5");
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
      <Typography variant="h4" gutterBottom>
        Your Achievements:
      </Typography>
      <Box>
        {achievedAchievements.map((achievement, index) => (
          <Box key={index}>
            <Typography variant="body1">
              Achievement ID: {achievement.achievement_id}, Achievement name:{" "}
              {achievement.achievements.name}
              <br />
              <p>DESCRIPTION: {achievement.achievements.description}</p>
              <br />
            </Typography>
          </Box>
        ))}
      </Box>

      <Typography variant="h4" gutterBottom>
        Not Achieved:
      </Typography>
      <Box>
        {unachievedAchievements.map((achievement, index) => (
          <Box key={index}>
            <Typography variant="body1">
              Achievement ID: {achievement.id}, Achievement name:{" "}
              {achievement.name}
              <br />
              <p>DESCRIPTION: {achievement.description}</p>
              <br />
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default YourAchievementsPage;

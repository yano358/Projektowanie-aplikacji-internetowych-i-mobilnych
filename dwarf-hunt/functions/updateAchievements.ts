import { useState, useEffect } from "react";
import { supabase } from "../config/supabase";
import { checkSesh } from "@/app/actions";

export async function updateAchievements(user_uuid: string) {
  let accountTime = <number>0;
  let commentsAmount = <number>0;
  let interactionsAmount = <number>0;
  let rankingPlace = <number>0;
  let visitsAmount = <number>0;
  let achievedAchievements: number[] = [];
  const currentUser = await checkSesh();
  if (!currentUser) {
    console.log("nie udalo sie");
    return;
  }
  console.log("mamy go!", currentUser);
  const currentUserId = currentUser.user.id;

  async function fetchAccountTime() {
    const { data, error } = await supabase
      .from("account_time")
      .select("hours_since_creation")
      .eq("user_id", currentUserId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      accountTime = data.hours_since_creation;
    }
  }

  async function fetchCommentsAmount() {
    const { data, error } = await supabase
      .from("comments_counter")
      .select("comments_amount")
      .eq("user_id", currentUserId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      commentsAmount = data.comments_amount;
    }
  }

  async function fetchInteractionsAmount() {
    const { data, error } = await supabase
      .from("interactions_counter")
      .select("interactions_amount")
      .eq("user_id", currentUserId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      interactionsAmount = data.interactions_amount;
    }
  }

  async function fetchVisitsAmount() {
    const { data, error } = await supabase
      .from("completion")
      .select("visited_location_count")
      .eq("user_id", currentUserId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      visitsAmount = data.visited_location_count;
    }
  }

  async function fetchRankingPlace() {
    const { data, error } = await supabase
      .from("timered_leaderboard")
      .select("place")
      .eq("user_id", currentUserId)
      .single();

    if (error) {
      console.log(error);
    }
    if (data) {
      rankingPlace = data.place;
    }
  }

  async function fetchUserAchievements() {
    const { data, error } = await supabase
      .from("user_achievements")
      .select("achievement_id")
      .eq("user_id", currentUserId);
    if (error) {
      console.log(error);
    }
    if (data) {
      achievedAchievements = data.map(
        (achievement: { achievement_id: number }) => achievement.achievement_id
      );
    }
  }

  async function addAchievement(achievementId: Number) {
    console.log("probuje dodac ", achievementId, " do ", currentUserId);
    const { error } = await supabase
      .from("user_achievements")
      .insert({ achievement_id: achievementId, user_id: currentUserId });

    if (error) {
      console.error("cos... cos sie zepsulo");
      throw error;
    }
    console.log("Dodano nowe osiągnięcie:", achievementId);
  }

  async function printAll() {
    await fetchAccountTime();
    await fetchVisitsAmount();
    await fetchCommentsAmount();
    await fetchInteractionsAmount();
    await fetchRankingPlace();
    await fetchUserAchievements();

    // Time based achievements
    if (!achievedAchievements.includes(1) && accountTime > 24.0)
      await addAchievement(1);
    if (!achievedAchievements.includes(5) && accountTime > 72.0)
      await addAchievement(5);
    if (!achievedAchievements.includes(6) && accountTime > 168.0)
      await addAchievement(6);

    // Visits based achievements
    if (!achievedAchievements.includes(2) && visitsAmount >= 1)
      await addAchievement(2);
    if (!achievedAchievements.includes(5) && visitsAmount >= 2)
      await addAchievement(4);

    // ranking based achievements
    if (!achievedAchievements.includes(7) && rankingPlace >= 100)
      await addAchievement(7);
    if (!achievedAchievements.includes(8) && rankingPlace >= 10)
      await addAchievement(8);

    // comments based achievements
    if (!achievedAchievements.includes(9) && commentsAmount >= 1)
      await addAchievement(9);
    if (!achievedAchievements.includes(11) && commentsAmount >= 5)
      await addAchievement(11);

    // interactions based achievements
    if (!achievedAchievements.includes(12) && interactionsAmount >= 3)
      await addAchievement(12);

    // multiple factors based achievements
    if (
      !achievedAchievements.includes(4) &&
      visitsAmount >= 2 &&
      accountTime < 1.0
    )
      await addAchievement(4);
  }

  printAll();
}

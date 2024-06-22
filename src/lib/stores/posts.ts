import { atom } from "nanostores";
import {
  type UnlockedAchievement,
  type Achievement,
} from "@/types/achievement";

export const $currentAchievements = atom<Achievement[]>([]);
export const $currentUnlockedAchievements = atom<UnlockedAchievement[]>([]);

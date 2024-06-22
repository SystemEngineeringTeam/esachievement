import { atom } from "nanostores";
import { type Achievement } from "@/types/post-data/achievements";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";
import { type Nullable } from "@/types/utils";

export const $currentAchievements = atom<Nullable<Achievement[]>>();
export const $currentUnlockedAchievements =
  atom<Nullable<UnlockedAchievement[]>>();

import { type Member } from "./member";
import { type UnlockedAchievement } from "./post-data/unlocked-achievements";

export type DevMode = {
  isDevMode: string;
  members: Member[];
  unlockedAchievements: UnlockedAchievement[];
};

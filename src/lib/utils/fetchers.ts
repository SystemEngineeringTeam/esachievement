import { type Member } from "@/types/member";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

export function getUnlockedAchievementsFromMember(
  member: Member,
  unlockedAchievements: UnlockedAchievement[],
): UnlockedAchievement[] {
  return unlockedAchievements.filter((u) => u.memberEmail === member.email);
}

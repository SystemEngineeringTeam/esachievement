import { type Member } from "@/types/member";
import { type Achievement } from "@/types/post-data/achievements";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";
import { type Nullable } from "@/types/utils";

export function getUnlockedAchievementsFromMember(
  member: Member,
  unlockedAchievements: UnlockedAchievement[],
): UnlockedAchievement[] {
  return unlockedAchievements.filter((u) => u.memberEmail === member.email);
}

export async function fetchMembersAndUnlockedAchievements(
  fetchMembers: () => Promise<Member[]>,
  fetchUnlockedAchievements: () => Promise<Nullable<UnlockedAchievement[]>>,
): Promise<{
  members: Member[];
  unlockedAchievements: UnlockedAchievement[];
}> {
  const members = await fetchMembers();
  const unlockedAchievements = await fetchUnlockedAchievements();

  if (unlockedAchievements == null) {
    throw new Error(
      "`unlockedAchievements` is null!  Maybe you forgot to call `init()`",
    );
  }

  return {
    members,
    unlockedAchievements,
  };
}

export async function fetchAchievementsWithUnlocked(
  fetchAchievements: () => Promise<Nullable<Achievement[]>>,
  fetchUnlockedAchievements: () => Promise<Nullable<UnlockedAchievement[]>>,
): Promise<{
  achievements: Achievement[];
  unlockedAchievements: UnlockedAchievement[];
}> {
  const achievements = await fetchAchievements();
  const unlockedAchievements = await fetchUnlockedAchievements();

  if (achievements == null) {
    throw new Error(
      "`achievements` is null!  Maybe you forgot to call `init()`",
    );
  }

  if (unlockedAchievements == null) {
    throw new Error(
      "`unlockedAchievements` is null!  Maybe you forgot to call `init()`",
    );
  }

  return {
    achievements,
    unlockedAchievements,
  };
}

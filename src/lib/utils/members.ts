import { type Member } from "@/types/member";
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

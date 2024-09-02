import { useEsaDB } from "./_esaDB";
import { type useTeam as _useTeam } from "@/hooks/teams";
import { $currentUnlockedAchievements } from "@/lib/stores/posts";
import {
  type UnlockedAchievementsPostData,
  yUnlockedAchievementsPostData,
} from "@/types/post-data/unlocked-achievements";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useUnlockedAchievements = (useTeam: typeof _useTeam) =>
  useEsaDB<UnlockedAchievementsPostData>(useTeam, {
    postName: "unlockedAchievements",
    schema: yUnlockedAchievementsPostData,
    atom: $currentUnlockedAchievements,
  });

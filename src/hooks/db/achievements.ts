import { useEsaDB } from "./_esaDB";
import { type useTeam as _useTeam } from "@/hooks/teams";
import { $currentAchievements } from "@/lib/stores/posts";
import {
  type AchievementsPostData,
  yAchievementsPostData,
} from "@/types/post-data/achievements";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAchievements = (useTeam: typeof _useTeam) =>
  useEsaDB<AchievementsPostData>(useTeam, {
    postName: "achievements",
    schema: yAchievementsPostData,
    atom: $currentAchievements,
    initData: [],
  });

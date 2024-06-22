import { useEsaDB } from "./_esaDB";
import { type useTeam as _useTeam } from "@/hooks/teams";
import { $currentAchievements } from "@/lib/stores/posts";
import { yAchievementsPostData } from "@/types/post-data/achievements";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAchievements = (useTeam: typeof _useTeam) =>
  useEsaDB(useTeam, {
    postName: "achievements",
    schema: yAchievementsPostData,
    atom: $currentAchievements,
  });

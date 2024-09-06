import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { Info } from "@/components/achievements/Info";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { fetchMembersAndUnlockedAchievementsAndAchievements } from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";
import { RecentUnlockedCard } from "@/components/achievements/RecentUnlockedCard";

export default function Page(): ReactElement {
  const { id } = useParams();
  const { fetchMembers } = useTeam();
  const { fetch: fetchAchievements } = useAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);
  const swrMembersAndUnlockedAchievementsAndAchievements = useSWRImmutable(
    "membersAndUnlockedAchievementsAndAchievements",
    async () =>
      await fetchMembersAndUnlockedAchievementsAndAchievements(
        fetchMembers,
        fetchAchievements,
        fetchUnlockedAchievements,
      ),
  );

  return match(swrMembersAndUnlockedAchievementsAndAchievements)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { members, achievements, unlockedAchievements } }) => (
        <>
          {achievements.map((a) => {
            if (a.id === Number(id)) {
              const rateOfUnlocked = unlockedAchievements.filter(
                (ua) => ua.achievementID === a.id,
              ).length;
              return (
                <Info
                  key={a.id}
                  icon={a.icon}
                  name={a.name}
                  rateOfUnlocked={rateOfUnlocked}
                  tags={a.tags}
                />
              );
            }
            return null;
          })}
        </>
      ),
    )
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

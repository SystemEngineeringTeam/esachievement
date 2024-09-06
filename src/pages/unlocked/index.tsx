import { Box } from "@radix-ui/themes";
import { useState, type ReactElement } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { UnlockableCard } from "@/components/achievements/UnlockableCard";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useMember } from "@/hooks/member";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { fetchAchievementsWithUnlocked } from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";
import { type CurrentMember } from "@/types/member";
import { type Achievement } from "@/types/post-data/achievements";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 80vh;
  overflow: scroll;
`;

export default function Page(): ReactElement {
  const { fetchCurrentMember } = useMember();
  const { fetch: fetchAchievements } = useAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements, update } =
    useUnlockedAchievements(useTeam);
  const swrAchievementsWithUnlocked = useSWRImmutable(
    "achievementsWithUnlocked",
    async () => {
      const achievementsKit = await fetchAchievementsWithUnlocked(
        fetchAchievements,
        fetchUnlockedAchievements,
      );
      const currentMember = await fetchCurrentMember();

      return {
        ...achievementsKit,
        currentMember,
      };
    },
  );

  const [isUILocked, setIsUILocked] = useState(false);

  const handleUnlockToggle = async (
    targetAchievementId: Achievement["id"],
    unlockedAchievements: UnlockedAchievement[],
    currentMember: CurrentMember,
    isUnlocked: boolean,
    mutate: () => Promise<void>,
  ): Promise<void> => {
    setIsUILocked(true);

    try {
      await update(
        isUnlocked
          ? [
              ...unlockedAchievements,
              {
                achievementID: targetAchievementId,
                createdAt: new Date(),
                memberEmail: currentMember.email,
              },
            ]
          : unlockedAchievements.filter(
              ({ achievementID: id }) => id !== targetAchievementId,
            ),
      );
      await mutate();
    } finally {
      setIsUILocked(false);
    }
  };

  return match(swrAchievementsWithUnlocked)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({
        data: { achievements, unlockedAchievements, currentMember },
        mutate,
      }) => (
        <>
          <Box mt="20vh" />
          <BoxStyle width="70%">
            {achievements.map((achievement) => {
              const isUnlocked = unlockedAchievements.some(
                (u) => u.achievementID === achievement.id,
              );

              return (
                <UnlockableCard
                  key={achievement.id}
                  achievement={achievement}
                  isDisabled={isUILocked}
                  isUnlocked={isUnlocked}
                  setIsUnlocked={(u) => {
                    void handleUnlockToggle(
                      achievement.id,
                      unlockedAchievements,
                      currentMember,
                      u,
                      async () => {
                        await mutate();
                      },
                    );
                  }}
                />
              );
            })}
          </BoxStyle>
        </>
      ),
    )
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

import { Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { AchievementCard } from "@/components/achievements/Card";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { type Achievement } from "@/types/post-data/achievements";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 100%;
  overflow: scroll;
`;

export default function Page(): ReactElement {
  const { fetch } = useAchievements(useTeam);
  const swrAchievements = useSWR("achievements", fetchAchievements);

  async function fetchAchievements(): Promise<{
    achievements: Achievement[];
  }> {
    const achievements = await fetch();

    if (achievements == null) throw new Error("No achievements found.");

    return {
      achievements,
    };
  }

  return match(swrAchievements)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data: { achievements } }) => (
      <BoxStyle width="70%">
        <Box mt="20vh" />
        {achievements.map((achievement) => {
          const typedAchievement = achievement as unknown as Achievement;
          return (
            <AchievementCard
              key={achievement.id}
              achievement={typedAchievement}
            />
          );
        })}
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

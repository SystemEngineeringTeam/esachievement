import { Box, Table } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
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
  const { init, fetch } = useAchievements(useTeam);
  const swrAchievements = useSWR("achievements", fetchAchievements);

  async function fetchAchievements(): Promise<{
    achievements: Achievement[];
  }> {
    const achievements = await fetch();

    if (achievements == null) throw new Error("No unlockedAchievements found.");

    return {
      achievements,
    };
  }

  useEffect(() => {
    void init();
  }, []);

  return match(swrAchievements)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data: { achievements } }) => (
      <BoxStyle width="70%">
        <Box mt="12%" />
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>名前</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>説明</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>タグ</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {achievements.map((achievement) => {
              const typedAchievement = achievement as unknown as Achievement;
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={typedAchievement}
                />
              );
            })}
          </Table.Body>
        </Table.Root>
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

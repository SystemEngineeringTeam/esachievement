import { Box, Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import UnlockedAchievements from "@/assets/unlockedAchievements.json";
import { FirstPenguin } from "@/components/achievements/FirstPenguin";
import { RecentUnlockedCard } from "@/components/achievements/RecentUnlockedCard";
import { useParams } from "@/router";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  // const { params } = useMatch('/posts/$id')
  const { id } = useParams("/achievements/:id");

  const memberRecentUnlocked = UnlockedAchievements.unlockedAchievements.filter(
    (a) => a.memberEmail === id,
  );
  // memberRecentUnlocked.sort((a, b) => b.createdAt - a.createdAt)

  return (
    <>
      <FirstPenguin />
      <BoxStyle width="70%">
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
            {memberRecentUnlocked.map((achievement) => (
              <RecentUnlockedCard
                key={achievement.memberEmail}
                unlockedAchievement={
                  achievement as unknown as UnlockedAchievement
                }
              />
            ))}
          </Table.Body>
        </Table.Root>
      </BoxStyle>
    </>
  );
}

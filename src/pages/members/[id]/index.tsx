import { Box, Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import UnlockedAchievements from "@/assets/unlockedAchievements.json";
import { RecentUnlockedCard } from "@/components/achievements/RecentUnlockedCard";
import { useParams } from "@/router";

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  // const { params } = useMatch('/posts/$id')
  const { id } = useParams("/achievements/:id");

  const memberRecentUnlocked =
    UnlockedAchievements.unlockedAchievements.filter(
      (a) => a.memberEmail === id,
    );
  // memberRecentUnlocked.sort((a, b) => b.createdAt - a.createdAt)

  return (
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
              achievement={achievement}
            />
          ))}
        </Table.Body>
      </Table.Root>
    </BoxStyle>
  );
}

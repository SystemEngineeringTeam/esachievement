import { Box, Flex, Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import Members from "@/assets/members.json";
import UnlockedAchievements from "@/assets/unlockedAchievements.json";
import { RecentUnlockedCard } from "@/components/achievements/RecentUnlockedCard";
import { Info } from "@/components/member/Info";
import { useParams } from "@/router";
import { type Member } from "@/types/member";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

type MembersWithUnlockedCount = Array<
  Member & {
    unlockedCount: number;
  }
>;

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

const FlexStyle = styled(Flex)`
  margin: 1rem 1rem;
`;

export default function Page(): ReactElement {
  // const { params } = useMatch('/posts/$id')
  const { id } = useParams("/achievements/:id");

  const memberRecentUnlocked = UnlockedAchievements.unlockedAchievements.filter(
    (a) => a.memberEmail === id,
  );
  //  memberRecentUnlocked.sort((a, b) => b.createdAt - a.createdAt)

  const memberList: MembersWithUnlockedCount = Members.members.map((m) => {
    const unlockedArchievements =
      UnlockedAchievements.unlockedAchievements.filter(
        (u) => u.memberEmail === m.email,
      );
    return {
      ...m,
      unlockedCount: unlockedArchievements.length,
    };
  });

  memberList.sort((a, b) => b.unlockedCount - a.unlockedCount);
  const memberRank = memberList.map((m, index) => {
    if (m.email === id) {
      return index + 1;
    }
  });

  return (
    <FlexStyle gap="5">
      <Info id={id} point={memberRecentUnlocked.length} rank={memberRank} />
      <BoxStyle width="70%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
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
    </FlexStyle>
  );
}

import { Box, Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
// import SampleMember from "@/assets/members.json";
// import SampleUnlockedAchievements from "@/assets/unlockedAchievements.json";
import useSWR from "swr";
import { match } from "ts-pattern";
import { MemberCard } from "@/components/member/Card";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { type Member } from "@/types/member";

type MembersWithUnlockedCount = Array<
  Member & {
    unlockedCount: number;
  }
>;

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  const { fetchMembers } = useTeam();
  const { fetch } = useUnlockedAchievements(useTeam);
  const swrMembersWithUnlockedCount = useSWR(
    "membersWithUnlockedCount",
    fetchMembersWithUnlockedCount,
  );

  async function fetchMembersWithUnlockedCount(): Promise<MembersWithUnlockedCount> {
    const members = await fetchMembers();
    const unlockedAchievements = await fetch();

    if (unlockedAchievements == null)
      throw new Error("No unlockedAchievements found.");

    return members
      .map((m) => {
        const unlockedCount = unlockedAchievements.filter(
          (u) => u.memberEmail === m.email,
        ).length;
        return {
          ...m,
          unlockedCount,
        };
      })
      .sort((a, b) => b.unlockedCount - a.unlockedCount);
  }

  return match(swrMembersWithUnlockedCount)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data }) => (
      <BoxStyle width="70%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>名前</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>ポイント</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((m, idx) => (
              // eslint-disable-next-line react/no-array-index-key
              <MemberCard key={idx} member={m} point={m.unlockedCount} />
            ))}
          </Table.Body>
        </Table.Root>
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

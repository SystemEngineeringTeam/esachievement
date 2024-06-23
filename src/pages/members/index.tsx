import { Box, Table } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import styled from "styled-components";
// import SampleMember from "@/assets/members.json";
// import SampleUnlockedAchievements from "@/assets/unlockedAchievements.json";
import useSWR from "swr";
import { match } from "ts-pattern";
import { MemberCard } from "@/components/member/Card";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";
import { type ArrayElem } from "@/types/utils";

type Member = ArrayElem<
  Awaited<ReturnType<ReturnType<typeof useTeam>["fetchMembers"]>>
>;

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  const { fetchMembers } = useTeam();
  const { init, fetch } = useUnlockedAchievements(useTeam);
  const swrMembersWithUnlockedCount = useSWR(
    "membersWithUnlockedCount",
    fetchMembersWithUnlockedCount,
  );

  async function fetchMembersWithUnlockedCount(): Promise<{
    members: Member[];
    unlockedAchievements: UnlockedAchievement[];
  }> {
    const members = await fetchMembers();
    const unlockedAchievements = await fetch();

    if (unlockedAchievements == null)
      throw new Error("No unlockedAchievements found.");

    if (members == null) throw new Error("No members found.");

    return {
      members,
      unlockedAchievements,
    };
  }

  useEffect(() => {
    void init();
  }, []);

  let point: number = 0;
  return match(swrMembersWithUnlockedCount)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data: { members, unlockedAchievements } }) => (
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
            {members.map((member) => {
              point = 0;
              unlockedAchievements.forEach((unlockedAchievement) => {
                if (unlockedAchievement.memberEmail === member.email) {
                  point += 1;
                }
              });
              return <MemberCard key="index" member={member} point={point} />;
            })}
          </Table.Body>
        </Table.Root>
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

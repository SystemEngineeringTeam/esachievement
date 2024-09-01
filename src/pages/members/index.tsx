import { Box } from "@radix-ui/themes";
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
import { type MembersWithUnlockedCount } from "@/types/member";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
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

    const membersWithUnlockedCount = members
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

    return membersWithUnlockedCount;
  }

  return match(swrMembersWithUnlockedCount)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data }) => (
      <BoxStyle width="70%">
        <Box mt="20vh" />
        {data.map((m) => (
          <MemberCard key={m.email} member={m} point={m.unlockedCount} />
        ))}
                <Box mt="20vh" />
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

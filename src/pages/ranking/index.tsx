import { Text, Box } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { type Member } from "@/types/member";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

type MembersWithUnlockedCount = Array<
  Member & {
    unlockedCount: number;
  }
>;

export default function Page(): ReactElement {
  const { fetchMembers } = useTeam();
  const { init, fetch } = useUnlockedAchievements(useTeam);
  const swrMembersWithUnlockedCount = useSWR(
    "membersWithUnlockedCount",
    fetchMembersWithUnlockedCount,
  );

  async function fetchMembersWithUnlockedCount(): Promise<{
    membersWithUnlockedCount: MembersWithUnlockedCount;
    unlockedAchievements: UnlockedAchievement[];
  }> {
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

    return {
      membersWithUnlockedCount,
      unlockedAchievements,
    };
  }

  useEffect(() => {
    void init();
  }, []);
  const RankingCardStyle = styled.div`
    border-radius: 50px;
    top: 16vh;
    left: 6vw;
    height: 40rem;
    width: 62vw;
    position: absolute;
    overflow: scroll;
    z-index: 1;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
  `;

  const RankingCardBox = styled.div`
    box-shadow:
      inset 8px 8px 32px #afafaf,
      inset -12px -12px 32px #ffffff;

    border-radius: 50px;
    top: 16vh;
    left: 6vw;
    height: 40rem;
    width: 62vw;
    position: absolute;
    z-index: 0;
  `;

  const LogRecentUnlockedStyle = styled.div`
    position: absolute;
    overflow: scroll;
    left: 73%;
    width: 26vw;
    height: 100vh;
    background-color: #dadfe2;
  `;

  return match(swrMembersWithUnlockedCount)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { membersWithUnlockedCount, unlockedAchievements } }) => (
        <div>
          {/* <TitleStyle size="7" weight="bold">
            実績解除ランキング
          </TitleStyle> */}
          <RankingCardStyle>
            <Box mt="2rem" />
            {membersWithUnlockedCount.map((m, idx) => (
              <RankingCard
                key={m.email}
                idx={idx}
                member={m}
                point={m.unlockedCount}
              />
            ))}
          </RankingCardStyle>
          <RankingCardBox />

          <LogRecentUnlockedStyle>
            <Box mt="10rem" />
            <Text as="div" size="2" weight="bold">
              最近の実績解除
            </Text>
            <Box mt="1rem" />
            {unlockedAchievements.map((u) => (
              <LogRecentUnlocked
                key={u.achievementID}
                unlockedAchievement={u}
              />
            ))}
          </LogRecentUnlockedStyle>
        </div>
      ),
    )
    .otherwise(({ error }) => {
      throw error;
    });
}

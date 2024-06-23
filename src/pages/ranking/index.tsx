import { Text } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";
import { type ArrayElem } from "@/types/utils";

type Member = ArrayElem<
  Awaited<ReturnType<ReturnType<typeof useTeam>["fetchMembers"]>>
>;

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
    position: relative;
    top: 4rem;
    overflow: scroll;
    height: 43rem;
    left: 14rem;
    width: fit-content;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
  `;

  const TitleStyle = styled(Text)`
    position: relative;
    left: 10rem;
    top: 2rem;
    font-size: 2rem;
  `;

  const LogTitleStyle = styled(Text)`
    font-size: 2rem;
    position: relative;
    top: -45.5rem;
    left: 71rem;
    padding: 0.3rem;
    overflow: scroll;
    font-weight: bold;
    background-color: #f1f5f9;
  `;
  const LogRecentUnlockedStyle = styled.div`
    position: relative;
    top: -45.5rem;
    left: 71rem;
    overflow: scroll;
    width: fit-content;
    height: calc(100vh - 4.8rem);
    width: 40rem;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
    background-color: #f1f5f9;
  `;

  return match(swrMembersWithUnlockedCount)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { membersWithUnlockedCount, unlockedAchievements } }) => (
        <div>
          <TitleStyle size="7" weight="bold">
            実績解除ランキング
          </TitleStyle>
          <RankingCardStyle>
            {membersWithUnlockedCount.map((m, idx) => (
              <RankingCard
                key={m.email}
                idx={idx}
                member={m}
                point={m.unlockedCount}
              />
            ))}
          </RankingCardStyle>

          <LogTitleStyle as="div" size="7">
            最近の実績解除
          </LogTitleStyle>
          <LogRecentUnlockedStyle>
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

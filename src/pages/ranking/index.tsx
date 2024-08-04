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
    box-shadow:
      inset 12px 12px 32px #afafaf,
      inset -12px -12px 32px #ffffff;

    border-radius: 50px;
    position: absolute;
    top: 16vh;
    overflow: scroll;
    height: 40rem;
    left: 2vw;
    width: 68vw;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
  `;

  // const TitleStyle = styled(Text)`
  //   position: relative;
  //   left: 10rem;
  //   top: 2rem;
  //   font-size: 2rem;
  // `;

  const LogTitleStyle = styled(Text)`
    /* font-size: 2rem;
    position: relative;
    top: -45.5rem;
    left: 71rem;
    padding: 0.3rem;
    overflow: scroll;
    font-weight: bold;
    background-color: #f1f5f9; */
  `;
  const LogRecentUnlockedStyle = styled.div`
    position: absolute;
    overflow: scroll;
    left: 72%;
    width: 26vw;
    height: 100vh;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
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
            {membersWithUnlockedCount.map((m, idx) => (
              <RankingCard
                key={m.email}
                idx={idx}
                member={m}
                point={m.unlockedCount}
              />
            ))}
          </RankingCardStyle>

          <LogRecentUnlockedStyle>
            <LogTitleStyle as="div" size="7">
              最近の実績解除
            </LogTitleStyle>
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

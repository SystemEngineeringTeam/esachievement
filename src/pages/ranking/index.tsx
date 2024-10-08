import { Text, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { getUnlockedAchievementsFromMember } from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";

const RankingListStyle = styled.div`
  border-radius: 50px;
  top: 16vh;
  left: 6vw;
  height: 40rem;
  width: 62vw;
  position: absolute;
  overflow: scroll;
  z-index: 1;
`;

const RankingCardBox = styled.div`
  box-shadow:
    inset 8px 8px 32px #b5bec9,
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
  background-color: #e7e7e7;
`;

export default function Page(): ReactElement {
  const { fetchMembersAll } = useTeam();
  const { fetch: fetchAchievements } = useAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);
  const swrAMU = useSWRImmutable("amu", async () => ({
    achievements: await fetchAchievements(),
    members: await fetchMembersAll(),
    unlockedAchievements: await fetchUnlockedAchievements(),
  }));

  return match(swrAMU)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { members, unlockedAchievements, achievements } }) => (
        <div>
          <RankingListStyle>
            <Box mt="2rem" />
            {members.map((m, idx) => {
              if (m === undefined) return null;
              const rankedMembers = members
                .map((l) => ({
                  ...l,
                  point: getUnlockedAchievementsFromMember(
                    l,
                    unlockedAchievements,
                  ).length,
                }))
                .sort((a, b) => b.point - a.point);

              const test = rankedMembers.map((n, index) => (
                <RankingCard
                  key={n.email}
                  index={index}
                  member={n}
                  point={n.point}
                />
              ));

              return test[idx];
            })}
          </RankingListStyle>
          <RankingCardBox />

          <LogRecentUnlockedStyle>
            <Box mt="10rem" />
            <Text as="div" size="2" weight="bold">
              最近の実績解除
            </Text>
            <Box mt="1rem" />
            {unlockedAchievements.reverse().map((u) => {
              const unlockedMember = members.find(
                (m) => m.email === u.memberEmail,
              );
              const unlockedAchievement = achievements.find(
                (a) => a.id === u.achievementID,
              );

              if (
                unlockedAchievement === undefined ||
                unlockedMember === undefined
              )
                return null;

              return (
                <LogRecentUnlocked
                  key={u.achievementID}
                  date={u.createdAt}
                  unlockedAchievement={unlockedAchievement}
                  unlockedMember={unlockedMember}
                />
              );
            })}
          </LogRecentUnlockedStyle>
        </div>
      ),
    )
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

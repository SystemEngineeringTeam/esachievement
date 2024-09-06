import { Box, Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { AchievementCard } from "@/components/achievements/Card";
import { Info } from "@/components/member/Info";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import {
  fetchMembersAndUnlockedAchievementsAndAchievements,
  getUnlockedAchievementsFromMember,
} from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 80vh;
  overflow: scroll;
`;

export default function Page(): ReactElement {
  const { id } = useParams();
  const { fetchMembers } = useTeam();
  const { fetch: fetchAchievements } = useAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);
  const swrMembersAndUnlockedAchievementsAndAchievements = useSWRImmutable(
    "membersAndUnlockedAchievementsAndAchievements",
    async () =>
      await fetchMembersAndUnlockedAchievementsAndAchievements(
        fetchMembers,
        fetchAchievements,
        fetchUnlockedAchievements,
      ),
  );

  return match(swrMembersAndUnlockedAchievementsAndAchievements)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { members, unlockedAchievements, achievements } }) => (
        <div>
          {members.map((m) => {
            if (m.email === id) {
              const point = unlockedAchievements.filter(
                (u) => u.memberEmail === m.email,
              ).length;
              const rateOfUnlocked =
                Math.round((point / achievements.length) * 10) / 10;

              const thisMemberUnlockedAchievements = unlockedAchievements
                .filter((u) => u.memberEmail === m.email)
                .map((u) => achievements.find((a) => a.id === u.achievementID));

              const rankedMembers = members
                .map((l) => ({
                  ...l,
                  point: getUnlockedAchievementsFromMember(
                    l,
                    unlockedAchievements,
                  ).length,
                }))
                .sort((a, b) => b.point - a.point);

              const ranking =
                rankedMembers.findIndex((member) => member.email === m.email) +
                1;

              return (
                <Flex key={m.email} gap="9">
                  <Info
                    name={m.name}
                    point={point}
                    ranking={ranking}
                    rateOfUnlocked={rateOfUnlocked}
                  />
                  <div>
                    <Box mt="20vh" />
                    <BoxStyle>
                      {thisMemberUnlockedAchievements.map((achievement) => {
                        if (achievement === undefined) return null;
                        return (
                          <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                          />
                        );
                      })}
                    </BoxStyle>
                  </div>
                </Flex>
              );
            }
            return null;
          })}
        </div>
      ),
    )
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

import { Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { Info } from "@/components/achievements/Info";
import { MemberCard } from "@/components/member/Card";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
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
  const swrAMU = useSWRImmutable("amu", async () => ({
    achievements: await fetchAchievements(),
    members: await fetchMembers(),
    unlockedAchievements: await fetchUnlockedAchievements(),
  }));

  return match(swrAMU)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(
      S.Success,
      ({ data: { members, achievements, unlockedAchievements } }) => (
        <>
          {achievements.map((a) => {
            if (a.id === Number(id)) {
              const rateOfUnlocked = unlockedAchievements.filter(
                (ua) => ua.achievementID === a.id,
              ).length;

              const thisAchievementUnlockedMembers = members.filter((m) =>
                unlockedAchievements.some(
                  (ua) =>
                    ua.achievementID === a.id && ua.memberEmail === m.email,
                ),
              );
              return (
                <Flex key={a.id} gap="9">
                  <Info
                    key={a.id}
                    icon={a.icon}
                    name={a.name}
                    rateOfUnlocked={rateOfUnlocked}
                    tags={a.tags}
                  />
                  <div>
                    <Box mt="20vh" />
                    <BoxStyle>
                      <Text size="8" weight="bold">
                        最近解除したメンバー
                      </Text>
                      <Box mt="1rem" />
                      {thisAchievementUnlockedMembers.map((m) => (
                        <MemberCard key={m.email} member={m} />
                      ))}
                    </BoxStyle>
                  </div>
                </Flex>
              );
            }
            return null;
          })}
        </>
      ),
    )
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

import { Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { MemberCard } from "@/components/member/Card";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { getUnlockedAchievementsFromMember } from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 80vh;
  overflow: scroll;
`;

export default function Page(): ReactElement {
  const { fetchMembersAll } = useTeam();
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);
  const swrMU = useSWRImmutable("mu", async () => ({
    members: await fetchMembersAll(),
    unlockedAchievements: await fetchUnlockedAchievements(),
  }));

  return match(swrMU)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data: { members, unlockedAchievements } }) => (
      <>
        <Box mt="20vh" />
        <BoxStyle width="70%">
          {members.map((m) => {
            const point = getUnlockedAchievementsFromMember(
              m,
              unlockedAchievements,
            ).length;
            return <MemberCard key={m.email} member={m} point={point} />;
          })}
        </BoxStyle>
      </>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

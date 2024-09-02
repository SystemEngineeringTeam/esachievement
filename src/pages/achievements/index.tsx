import { Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { AchievementCard } from "@/components/achievements/Card";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { handleSWRError } from "@/lib/utils/swr";
import { type Achievement } from "@/types/post-data/achievements";

const BoxStyle = styled(Box)`
  margin: 0 auto;
  height: 100%;
  overflow: scroll;
`;

export default function Page(): ReactElement {
  const { fetch } = useAchievements(useTeam);
  const swrAchievements = useSWRImmutable("achievements", fetch);

  return match(swrAchievements)
    .with(S.Loading, () => <div>Loading...</div>)
    .with(S.Success, ({ data }) => (
      <BoxStyle width="70%">
        <Box mt="20vh" />
        {data.map((achievement) => {
          const typedAchievement = achievement as unknown as Achievement;
          return (
            <AchievementCard
              key={achievement.id}
              achievement={typedAchievement}
            />
          );
        })}
      </BoxStyle>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

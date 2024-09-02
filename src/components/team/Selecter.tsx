import { Button, Flex } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useMember } from "@/hooks/member";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { handleSWRError } from "@/lib/utils/swr";

const FlexStyled = styled(Flex)`
  gap: 15rem;
`;

const ButtonStyle = styled(Button)`
  transform: scale(2);
  padding: 0;
  height: 100px;
  width: 100px;
`;

export function TeamSelector(): ReactElement {
  const navigate = useNavigate();
  const { fetchJoinedTeams, markTeamNameAsSelected } = useMember();
  const swrJoinedTeams = useSWRImmutable("joinedTeams", fetchJoinedTeams);

  const initializeFunc = (): void => {
    const { init: initAchievements } = useAchievements(useTeam);
    const { init: initUnlockedAchievements } = useUnlockedAchievements(useTeam);

    useEffect(() => {
      void initAchievements();
      void initUnlockedAchievements();
    }, []);

    navigate("/ranking");
  };

  return match(swrJoinedTeams)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <FlexStyled>
        {data.map((team) => (
          <ButtonStyle
            key={team.name}
            onClick={() => {
              markTeamNameAsSelected(team.name);
              initializeFunc();
            }}
            size="4"
          >
            <img alt={team.name} src={team.icon} />
          </ButtonStyle>
        ))}
      </FlexStyled>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

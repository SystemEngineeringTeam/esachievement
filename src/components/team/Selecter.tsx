import { Button, Flex } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useMember } from "@/hooks/member";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";

export function TeamSelector(): ReactElement {
  const navigate = useNavigate();
  const { fetchJoinedTeams, markTeamNameAsSelected } = useMember();
  const swrJoinedTeams = useSWR("joinedTeams", fetchJoinedTeams);

  const FlexStyled = styled(Flex)`
    gap: 15rem;
  `;

  const ButtonStyle = styled(Button)`
    transform: scale(2);
    padding: 0;
    height: 100px;
    width: 100px;
  `;

  const initializeFunc =  (): void => {
    const { init: initAchievements } = useAchievements(useTeam);
    const { init: initUnlockedAchievements } = useUnlockedAchievements(useTeam);

    useEffect(() => {
      void initAchievements();
      void initUnlockedAchievements();
    }, []);
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
              navigate("/ranking");
            }}
            size="4"
          >
            <img alt={team.name} src={team.icon} />
          </ButtonStyle>
        ))}
      </FlexStyled>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

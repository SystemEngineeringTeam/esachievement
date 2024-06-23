import { useStore } from "@nanostores/react";
import { Card, Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { match } from "ts-pattern";
import { Center } from "@/components/Center";
import { useMember } from "@/hooks/member";
import { S } from "@/lib/consts";
import { requestAccessTokenData } from "@/lib/services/esa";
import { $accessTokenData } from "@/lib/stores/auth";
import { useNavigate } from "@/router";
import { type AccessTokenData } from "@/types/auth";

function TeamSelector(): ReactElement {
  const { fetchJoinedTeams, markTeamNameAsSelected } = useMember();
  const swrJoinedTeams = useSWR("joinedTeams", fetchJoinedTeams);

  const FlexStyled = styled(Flex)`
    gap: 1rem;
  `;

  return match(swrJoinedTeams)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <FlexStyled>
        {data.map((team) => (
          <Card
            key={team.name}
            onClick={() => {
              markTeamNameAsSelected(team.name);
            }}
          >
            <img alt={team.name} src={team.icon} />
          </Card>
        ))}
      </FlexStyled>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

export default function Page(): ReactElement {
  const swrTokenAndTeams = useSWR("tokenAndTeams", fetchTokenAndTeams);
  const accessTokenData = useStore($accessTokenData);
  const navigate = useNavigate();

  async function fetchTokenAndTeams(): Promise<AccessTokenData> {
    if (accessTokenData != null) {
      // eslint-disable-next-line no-console
      console.warn("Access token has already been set");
      navigate("/");
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code == null) throw new Error("code is not found");

    const tokenData = await requestAccessTokenData(code);
    $accessTokenData.set(tokenData);

    return tokenData;
  }

  return (
    <Center>
      {match(swrTokenAndTeams)
        .with(S.Loading, () => <p>Loading...</p>)
        .with(S.Success, () => <TeamSelector />)
        .otherwise(({ error }) => {
          throw error;
        })}
    </Center>
  );
}

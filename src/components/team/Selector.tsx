import { Button, Flex } from "@radix-ui/themes";
import { useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useMember } from "@/hooks/member";
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

const DivCenter = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
`;

const DivStyled = styled.div`
  position: absolute;
  top: calc(50% + 100px);
  margin-top: 20px;
`;

export function TeamSelector(): ReactElement {
  const navigate = useNavigate();
  const { fetchJoinedTeams, markTeamNameAsSelected } = useMember();
  const swrJoinedTeams = useSWRImmutable("joinedTeams", fetchJoinedTeams);
  const [teamName, setTeamName] = useState("");

  return match(swrJoinedTeams)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <DivCenter>
        <FlexStyled>
          {data.map((team) => (
            <ButtonStyle
              key={team.name}
              onClick={() => {
                markTeamNameAsSelected(team.name);
                setTeamName(team.name);
              }}
              size="4"
            >
              <img alt={team.name} src={team.icon} />
            </ButtonStyle>
          ))}
        </FlexStyled>
        <DivStyled>
          {teamName !== "" && (
            <Button
              onClick={() => {
                navigate("/ranking");
              }}
              size="4"
            >
              {teamName}に参加する
            </Button>
          )}
        </DivStyled>
      </DivCenter>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

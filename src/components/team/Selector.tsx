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

const ButtonStyled = styled(Button)`
  font-weight: 600;
  font-family: sans-serif;
  font-size: 1rem;

  background-color: #e7e7e7;
  color: #00cdc2;
  border: 1px solid #00cdc2;

  width: fit-content;
  height: fit-content;

  padding: 1.2vh 1.3vw 1.2vh 1.8vw;
  margin-top: 4vh;
  margin-left: 0.3vw;

  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;

  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;

  transform-origin: 50% 50%;
  transition: 300ms;

  ::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 120%;
    background-color: #00cdc2;

    top: 0;
    left: 0;
    z-index: -1;
    transform-origin: 100% 50%;
    transform: scaleX(0%);
    transition: transform 300ms;
  }

  &:hover {
    box-shadow: none;
    transform: scale(1.06);
  }

  &:hover ::after {
    transform-origin: 0% 50%;
    transform: scaleX(100%);
    transform: none;
  }
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
            <ButtonStyled
              onClick={() => {
                navigate("/ranking");
              }}
              size="4"
            >
              {teamName}に参加する
            </ButtonStyled>
          )}
        </DivStyled>
      </DivCenter>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

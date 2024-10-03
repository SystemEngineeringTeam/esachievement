import { useStore } from "@nanostores/react";
import { Flex } from "@radix-ui/themes";
import { type ReactNode, useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match, P } from "ts-pattern";
import { ButtonStyled } from "@/components/Button";
import { ErrorScreen } from "@/components/ErrorScreen";
import { Expanded, ExpandedCenter } from "@/components/Expanded";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useMember } from "@/hooks/member";
import { useTeam } from "@/hooks/teams";
import { APP_NAME, S } from "@/lib/consts";
import { requestAccessTokenData } from "@/lib/services/esa";
import { $accessTokenData } from "@/lib/stores/auth";
import { handleSWRError } from "@/lib/utils/swr";
import { type AccessTokenData } from "@/types/auth";
import { type ArrayElem } from "@/types/utils";

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

const TeamIcon = styled.img`
  border-radius: 20px;
  cursor: pointer;
  width: 130px;
  height: 130px;

  &:hover,
  &[aria-selected="true"] {
    box-shadow: 0 0 10px #00cdc2;
  }
`;

const TeamInfo = styled(Flex)`
  direction: column;
  align-items: center;

  > p {
    min-height: 1lh;
  }

  p:first-child {
    font-size: 1.2rem;
    font-weight: bold;
  }
  p:last-child {
    color: gray;
  }
`;

type Team = ArrayElem<
  Awaited<ReturnType<ReturnType<typeof useMember>["fetchJoinedTeams"]>>
>;

type InitStatus =
  | {
      type: "READY" | "LOADING" | "SUCCESS";
    }
  | {
      type: "ERROR";
      error: Error;
    };

function TeamSelectorLoading({
  setInitStatus,
}: {
  setInitStatus: (status: InitStatus) => void;
}): ReactNode {
  const navigate = useNavigate();
  const { init: initAchievements } = useAchievements(useTeam);
  const { init: initUnlockedAchievements } = useUnlockedAchievements(useTeam);

  async function initDB(): Promise<void> {
    await initAchievements();
    await initUnlockedAchievements();

    navigate("/ranking");
  }

  useEffect(() => {
    void initDB()
      .then(() => {
        setInitStatus({ type: "SUCCESS" });
      })
      .catch((error) => {
        setInitStatus({ type: "ERROR", error });
      });
  });

  return `${APP_NAME} を初期化中...`;
}

function TeamSelector(): ReactElement {
  const { fetchJoinedTeams, markTeamNameAsSelected } = useMember();

  const [hoveredTeam, setHoveredTeamName] = useState<Team>();
  const [selectedTeam, setSelectedTeamName] = useState<Team>();
  const [initStatus, setInitStatus] = useState<InitStatus>({
    type: "READY",
  });

  const swrJoinedTeams = useSWRImmutable("joinedTeams", fetchJoinedTeams);
  const activeTeam = selectedTeam ?? hoveredTeam;

  return match(swrJoinedTeams)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <ExpandedCenter gap={10}>
        <Heading>チームを選択</Heading>
        <Flex gap="5">
          {data.map((team) => (
            <TeamIcon
              key={team.name}
              alt={`チーム ${team.name} のアイコン画像`}
              aria-selected={selectedTeam === team}
              onClick={() => {
                const alreadySelected = selectedTeam === team;
                setSelectedTeamName(alreadySelected ? undefined : team);
              }}
              onMouseEnter={() => {
                setHoveredTeamName(team);
              }}
              onMouseLeave={() => {
                setHoveredTeamName(undefined);
              }}
              src={team.icon}
            />
          ))}
        </Flex>
        <TeamInfo direction="column">
          <p>{activeTeam?.name}</p>
          <p>{activeTeam?.description}</p>
        </TeamInfo>
        <Flex direction="column">
          <ButtonStyled
            disabled={selectedTeam == null || initStatus.type !== "READY"}
            onClick={() => {
              setInitStatus({ type: "LOADING" });
            }}
            size="4"
          >
            {match({
              selectedTeam,
              initStatus,
            })
              .with({ initStatus: { type: "LOADING" } }, () => {
                if (selectedTeam == null) {
                  throw new Error("selectedTeam is null");
                }
                markTeamNameAsSelected(selectedTeam.name);

                return <TeamSelectorLoading setInitStatus={setInitStatus} />;
              })
              .with(
                { initStatus: { type: "SUCCESS" } },
                () => `${APP_NAME} を初期化しました！`,
              )
              .with(
                { initStatus: { type: "ERROR" } },
                ({ initStatus: { error } }) => <ErrorScreen error={error} />,
              )
              .with(
                { selectedTeam: P.nullish },
                () => "チームを選択してください…",
              )
              .with(
                { selectedTeam: P.nonNullable },
                () => `${activeTeam?.name} で参加`,
              )
              .exhaustive()}
          </ButtonStyled>
        </Flex>
      </ExpandedCenter>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

export default function Page(): ReactElement {
  const swrTokenAndTeams = useSWRImmutable("tokenAndTeams", fetchTokenAndTeams);
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
    <Expanded>
      {match(swrTokenAndTeams)
        .with(S.Loading, () => <p>Loading...</p>)
        .with(S.Success, () => <TeamSelector />)
        .otherwise(({ data, error }) => (
          <ErrorScreen error={handleSWRError(data, error)} />
        ))}
    </Expanded>
  );
}

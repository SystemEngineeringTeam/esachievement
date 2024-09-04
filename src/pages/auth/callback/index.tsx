import { useStore } from "@nanostores/react";
import { type ReactElement } from "react";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { Center } from "@/components/Center";
import { ErrorScreen } from "@/components/ErrorScreen";
import { TeamSelector } from "@/components/team/Selector";
import { S } from "@/lib/consts";
import { requestAccessTokenData } from "@/lib/services/esa";
import { $accessTokenData } from "@/lib/stores/auth";
import { handleSWRError } from "@/lib/utils/swr";
import { useNavigate } from "@/router";
import { type AccessTokenData } from "@/types/auth";

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
    <Center>
      {match(swrTokenAndTeams)
        .with(S.Loading, () => <p>Loading...</p>)
        .with(S.Success, () => <TeamSelector />)
        .otherwise(({ data, error }) => (
          <ErrorScreen error={handleSWRError(data, error)} />
        ))}
    </Center>
  );
}

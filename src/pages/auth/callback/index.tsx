import { useStore } from "@nanostores/react";
import { type ReactElement } from "react";
import useSWR from "swr";
import { match } from "ts-pattern";
import { Center } from "@/components/Center";
import { S } from "@/lib/consts";
import { requestAccessTokenData } from "@/lib/services/esa";
import { $accessTokenData } from "@/lib/stores/auth";
import { type AccessTokenData } from "@/types/auth";

export default function Page(): ReactElement {
  const swrAccessTokenData = useSWR("/auth/token", fetchAccessToken);
  const accessTokenData = useStore($accessTokenData);

  async function fetchAccessToken(): Promise<AccessTokenData> {
    if (accessTokenData != null) {
      // eslint-disable-next-line no-console
      console.warn("Access token has already been set");
      return accessTokenData;
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
      {match(swrAccessTokenData)
        .with(S.Loading, () => <p>Loading...</p>)
        .with(S.Success, ({ data }) => (
          <p>
            Success! Your access token is <code>{data.access_token}</code>
          </p>
        ))
        .otherwise(({ error }) => {
          throw error;
        })}
    </Center>
  );
}

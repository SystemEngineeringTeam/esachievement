import createClient from "openapi-fetch";
import { type paths } from "./esa.gen";
import { getEnv } from "@/lib/consts";
import { $accessTokenData } from "@/lib/stores/auth";
import { type AccessTokenData } from "@/types/auth";

export function getAuthorizePageUrl(): string {
  const query = new URLSearchParams({
    client_id: getEnv("VITE_ESA_APP_CLIENT_ID"),
    redirect_uri: getEnv("VITE_ESA_APP_REDIRECT_URI"),
    response_type: "code",
    scope: "read write",
  });

  return `https://api.esa.io/oauth/authorize?${query.toString()}`;
}

export async function requestAccessTokenData(
  code: string,
): Promise<AccessTokenData> {
  const res = await fetch("/auth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  if (!res.ok) {
    throw new Error("Failed to request access token");
  }

  return await res.json();
}

export const esaClient = createClient<paths>({
  baseUrl: "https://api.esa.io/v1",
});

esaClient.use({
  onRequest: async (req) => {
    const token = $accessTokenData.get();
    if (token == null) throw new Error("Access token has not been set");

    req.headers.set("Authorization", `Bearer ${token.access_token}`);
    return req;
  },
});

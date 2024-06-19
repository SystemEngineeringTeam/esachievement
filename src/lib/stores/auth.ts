import { persistentMap } from "@nanostores/persistent";
import { getLocalStorageKey } from "@/lib/consts";
import { type StringifiedAccessTokenData } from "@/types/auth";

export function stringifyAccessTokenData(
  data: StringifiedAccessTokenData,
): StringifiedAccessTokenData {
  return {
    ...data,
    created_at: String(data.created_at),
  };
}

export const $accessTokenData = persistentMap<StringifiedAccessTokenData>(
  getLocalStorageKey("accessTokenData", true),
  undefined,
);

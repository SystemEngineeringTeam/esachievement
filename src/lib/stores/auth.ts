import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";
import { getLocalStorageKey } from "@/lib/consts";
import { type AccessTokenData } from "@/types/auth";
import { type Nullable } from "@/types/utils";

export const $accessTokenData = persistentAtom<Nullable<AccessTokenData>>(
  getLocalStorageKey("accessTokenData"),
  undefined,
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

export const $isAuthenticated = computed(
  $accessTokenData,
  (data) => data != null,
);

import { persistentAtom } from "@nanostores/persistent";
import { getLocalStorageKey } from "@/lib/consts";
import { type Config } from "@/types/config";

export const $config = persistentAtom<Config>(
  getLocalStorageKey("config"),
  {
    baseCategory: "event/2024/技育CAMPハッカソン/Vol.7/esachievement",
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

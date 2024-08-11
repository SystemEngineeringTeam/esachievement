import { persistentAtom } from "@nanostores/persistent";
import { getLocalStorageKey } from "@/lib/consts";
import { type DevMode } from "@/types/devMode";

export const $devMode = persistentAtom<DevMode>(
  getLocalStorageKey("devMode"),
  {
    isDevMode: "dev",
    members: [],
    unlockedAchievements: [],
  },
  {
    encode: JSON.stringify,
    decode: JSON.parse,
  },
);

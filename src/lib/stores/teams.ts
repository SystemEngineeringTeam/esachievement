/* eslint-disable no-console */

import { persistentAtom } from "@nanostores/persistent";
import { atom } from "nanostores";
import { getLocalStorageKey } from "@/lib/consts";

export const $selectedTeamName = persistentAtom<string | undefined>(
  getLocalStorageKey("selectedTeamName"),
  undefined,
);

export const $shouldIgnoreResCache = atom<boolean>(false);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function enableIgnoreResCacheTemporarily() {
  console.warn("Ignore response cache temporarily");
  $shouldIgnoreResCache.set(true);

  return {
    [Symbol.dispose]: () => {
      console.warn("Stop ignoring response cache");
      $shouldIgnoreResCache.set(false);
    },
  };
}

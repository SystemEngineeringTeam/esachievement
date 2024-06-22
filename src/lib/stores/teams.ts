import { persistentAtom } from "@nanostores/persistent";
import { getLocalStorageKey } from "@/lib/consts";

export const $selectedTeamName = persistentAtom<string | undefined>(
  getLocalStorageKey("selectedTeamName"),
  undefined,
);

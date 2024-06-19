import { type Env } from "@/types/env";

export async function waitMs(ms: number): Promise<void> {
  await new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function getEnv(key: keyof Env): string {
  const value = import.meta.env[key];
  if (value == null) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const APP_NAME = "esachievement";
export const LOCAL_STORAGE_VERSION = "1";
export function getLocalStorageKey(key: string, trailingColon = false): string {
  return `${APP_NAME}.v${LOCAL_STORAGE_VERSION}.${key}${trailingColon ? ":" : ""}`;
}

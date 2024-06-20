export type Env = {
  ESA_APP_CLIENT_ID: string;
  ESA_APP_CLIENT_SECRET: string;
  ESA_APP_REDIRECT_URI: string;
};

export function getEnv<T extends keyof Env>(env: Partial<Env>, key: T): Env[T] {
  const value = env[key];
  if (value == null) {
    throw new Error(`Environment variable ${key} is not set`);
  }

  return value;
}

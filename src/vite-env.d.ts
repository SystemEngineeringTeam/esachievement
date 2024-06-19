/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ESA_APP_CLIENT_ID: string;
  readonly VITE_ESA_APP_CLIENT_SECRET: string;
  readonly VITE_ESA_APP_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

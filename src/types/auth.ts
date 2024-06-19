import { type Override } from "./utils";

export type AccessTokenData = {
  access_token: string;
  token_type: string;
  scope: string;
  created_at: number;
};

export type StringifiedAccessTokenData = Override<
  AccessTokenData,
  {
    created_at: string;
  }
>;

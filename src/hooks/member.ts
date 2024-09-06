/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { useStore } from "@nanostores/react";
import { match } from "ts-pattern";
import { A } from "@/lib/consts";
import { getEsaClient } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { $selectedTeamName } from "@/lib/stores/teams";
import { type InferResponseType } from "@/types/openapi";

export function useMember() {
  const hasAuthenticated = useStore($hasAuthenticated);

  if (!hasAuthenticated) {
    throw new Error("It is required to be authenticated to use this hook.");
  }

  const fetchJoinedTeams = async (): Promise<
    InferResponseType<"/teams", "get">["teams"]
  > => {
    const result = await getEsaClient().GET("/teams");
    return await match(result)
      .with(A.Success, ({ data }) => data.teams)
      .otherwise(async ({ response }) => {
        throw new Error(
          `Failed to get joined teams: ${response.status} ${await response.text()}`,
        );
      });
  };

  const markTeamNameAsSelected = (teamName: string) => {
    $selectedTeamName.set(teamName);
  };

  const fetchCurrentMember = async (): Promise<
    InferResponseType<"/user", "get">
  > => {
    const result = await getEsaClient().GET("/user");
    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(async ({ response }) => {
        throw new Error(
          `Failed to get current member: ${response.status} ${await response.text()}`,
        );
      });
  };

  return {
    fetchJoinedTeams,
    markTeamNameAsSelected,
    fetchCurrentMember,
  };
}

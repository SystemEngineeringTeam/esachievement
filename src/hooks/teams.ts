import { useStore } from "@nanostores/react";
import { match } from "ts-pattern";
import { A } from "@/lib/consts";
import { getEsaClient } from "@/lib/services/esa";
import { $selectedTeamName } from "@/lib/stores/teams";
import {
  type InferRequestBodyType,
  type InferResponseType,
} from "@/types/openapi";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useTeam() {
  const selectedTeamName = useStore($selectedTeamName);

  if (selectedTeamName == null) {
    throw new Error("It is required to select a team to use this hook.");
  }

  const paramsWithTeamName = {
    params: {
      path: {
        team_name: selectedTeamName,
      },
    },
  } as const;

  async function handleError({
    response,
  }: {
    response: Response;
  }): Promise<never> {
    throw new Error(`Failed to fetch API: ${response.status}`);
  }

  const fetchAbout = async (): Promise<
    InferResponseType<"/teams/{team_name}", "get">
  > =>
    await match(
      await getEsaClient().GET("/teams/{team_name}", paramsWithTeamName),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  const fetchStats = async (): Promise<
    InferResponseType<"/teams/{team_name}/stats", "get">
  > =>
    await match(
      await getEsaClient().GET("/teams/{team_name}/stats", paramsWithTeamName),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  const fetchMembers = async (): Promise<
    InferResponseType<"/teams/{team_name}/members", "get">["members"]
  > =>
    await match(
      await getEsaClient().GET(
        "/teams/{team_name}/members",
        paramsWithTeamName,
      ),
    )
      .with(A.Success, ({ data }) => data.members)
      .otherwise(handleError);

  const createNewPost = async (
    postBody: InferRequestBodyType<"/teams/{team_name}/posts", "post">["post"],
  ): Promise<InferResponseType<"/teams/{team_name}/posts", "post", 201>> =>
    await match(
      await getEsaClient().POST("/teams/{team_name}/posts", {
        ...paramsWithTeamName,
        body: {
          post: postBody,
        },
      }),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  const fetchPostsByCategory = async (
    category: string,
  ): Promise<InferResponseType<"/teams/{team_name}/posts", "get">["posts"]> =>
    await match(
      await getEsaClient().GET("/teams/{team_name}/posts", {
        params: {
          ...paramsWithTeamName.params,
          query: {
            q: `on:${category}`,
          },
        },
      }),
    )
      .with(A.Success, ({ data }) => data.posts)
      .otherwise(handleError);

  const fetchPostByPostId = async (
    postNumber: number,
  ): Promise<
    InferResponseType<"/teams/{team_name}/posts/{post_number}", "get">
  > =>
    await match(
      await getEsaClient().GET("/teams/{team_name}/posts/{post_number}", {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
      }),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  const updatePost = async (
    postNumber: number,
    body: InferRequestBodyType<
      "/teams/{team_name}/posts/{post_number}",
      "patch"
    >,
  ): Promise<
    InferResponseType<"/teams/{team_name}/posts/{post_number}", "patch">
  > =>
    await match(
      await getEsaClient().PATCH("/teams/{team_name}/posts/{post_number}", {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
        body,
      }),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  const deletePost = async (postNumber: number): Promise<void> => {
    await match(
      await getEsaClient().DELETE("/teams/{team_name}/posts/{post_number}", {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
      }),
    )
      .with(A.Success, () => undefined)
      .otherwise(handleError);
  };

  const fetchEmojis = async (): Promise<
    InferResponseType<"/teams/{team_name}/emojis", "get">
  > =>
    await match(
      await getEsaClient().GET("/teams/{team_name}/emojis", paramsWithTeamName),
    )
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);

  return {
    selectedTeamName,
    fetchStats,
    fetchAbout,
    fetchMembers,
    fetchPostByPostId,
    fetchPostsByCategory,
    fetchEmojis,

    __createNewPost: createNewPost,
    __updatePost: updatePost,
    __deletePost: deletePost,
  };
}

import { useStore } from "@nanostores/react";
import { match } from "ts-pattern";
import { A } from "@/lib/consts";
import { esaClient } from "@/lib/services/esa";
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
    throw new Error(
      `Failed to fetch API: ${response.status} ${await response.text()}`,
    );
  }

  const fetchAbout = async (): Promise<
    InferResponseType<"/teams/{team_name}", "get">
  > => {
    const result = await esaClient.GET(
      "/teams/{team_name}",
      paramsWithTeamName,
    );

    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);
  };

  const fetchStats = async (): Promise<
    InferResponseType<"/teams/{team_name}/stats", "get">
  > => {
    const result = await esaClient.GET(
      "/teams/{team_name}/stats",
      paramsWithTeamName,
    );
    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);
  };

  const fetchMembers = async (): Promise<
    InferResponseType<"/teams/{team_name}/members", "get">["members"]
  > => {
    const result = await esaClient.GET(
      "/teams/{team_name}/members",
      paramsWithTeamName,
    );
    return await match(result)
      .with(A.Success, ({ data }) => data.members)
      .otherwise(handleError);
  };

  const createNewPost = async (
    postBody: InferRequestBodyType<"/teams/{team_name}/posts", "post">["post"],
  ): Promise<InferResponseType<"/teams/{team_name}/posts", "post", 201>> => {
    const result = await esaClient.POST("/teams/{team_name}/posts", {
      ...paramsWithTeamName,
      body: {
        post: postBody,
      },
    });
    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);
  };

  const fetchPostsByCategory = async (
    category: string,
  ): Promise<InferResponseType<"/teams/{team_name}/posts", "get">["posts"]> => {
    const result = await esaClient.GET("/teams/{team_name}/posts", {
      params: {
        ...paramsWithTeamName.params,
        query: {
          q: `category:${category}`,
        },
      },
    });

    return await match(result)
      .with(A.Success, ({ data }) => data.posts)
      .otherwise(handleError);
  };

  const fetchPostByPostId = async (
    postNumber: number,
  ): Promise<
    InferResponseType<"/teams/{team_name}/posts/{post_number}", "get">
  > => {
    const result = await esaClient.GET(
      "/teams/{team_name}/posts/{post_number}",
      {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
      },
    );
    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);
  };

  const updatePost = async (
    postNumber: number,
    body: InferRequestBodyType<
      "/teams/{team_name}/posts/{post_number}",
      "patch"
    >,
  ): Promise<
    InferResponseType<"/teams/{team_name}/posts/{post_number}", "patch">
  > => {
    const result = await esaClient.PATCH(
      "/teams/{team_name}/posts/{post_number}",
      {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
        body,
      },
    );

    return await match(result)
      .with(A.Success, ({ data }) => data)
      .otherwise(handleError);
  };

  const deletePost = async (postNumber: number): Promise<void> => {
    const result = await esaClient.DELETE(
      "/teams/{team_name}/posts/{post_number}",
      {
        params: {
          path: {
            ...paramsWithTeamName.params.path,
            post_number: postNumber,
          },
        },
      },
    );

    await match(result)
      .with(A.Success, () => undefined)
      .otherwise(handleError);
  };

  return {
    selectedTeamName,
    fetchStats,
    fetchAbout,
    fetchMembers,
    fetchPostByPostId,

    __createNewPost: createNewPost,
    __fetchPostsByCategory: fetchPostsByCategory,
    __updatePost: updatePost,
    __deletePost: deletePost,
  };
}

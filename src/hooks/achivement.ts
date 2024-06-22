/* eslint-disable @typescript-eslint/naming-convention */
import { useStore } from "@nanostores/react";
import { type useTeam as _useTeam } from "@/hooks/teams";
import { $config } from "@/lib/stores/config";
import { $currentAchievements } from "@/lib/stores/posts";
import {
  type AchievementsPost,
  yAchievementsPost,
  yUnlockedAchievementsPost,
  type UnlockedAchievementsPost,
} from "@/types/achievement";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useAchievement(useTeams: typeof _useTeam) {
  const { baseCategory } = useStore($config);
  const {
    fetchPostByPostId,
    __createNewPost,
    __updatePost,
    __deletePost,
    __fetchPostsByCategory,
  } = useTeams();

  const postName = "achievement";

  const init = async (): Promise<void> => {
    const posts = await __fetchPostsByCategory(`${baseCategory}/${postName}`);

    if (posts.length === 0) {
      await create();
    }
    console.log(posts);

    const { achievements } = await yAchievementsPost.validate(posts[0].body_md);
    $currentAchievements.set(achievements);
  };

  const fetch = async (): Promise<AchievementsPost> => {
    const postsId = await searchPostId();
    const post = await fetchPostByPostId(postsId);
    return await yAchievementsPost.validate(post.body_md);
  };

  const create = async (): Promise<
    Awaited<ReturnType<typeof __createNewPost>>
  > =>
    await __createNewPost({
      category: postName,
      name: postName,
      body_md: JSON.stringify({ achievements: [] }),
    });

  const searchPostId = async (): Promise<number> => {
    const posts = await __fetchPostsByCategory(`${baseCategory}/${postName}`);
    return posts[0].number;
  };

  const update = async (
    achievementsPost: AchievementsPost,
  ): Promise<Awaited<ReturnType<typeof __updatePost>>> => {
    const postId = await searchPostId();
    return await __updatePost(postId, {
      post: {
        body_md: JSON.stringify(achievementsPost),
      },
    });
  };

  const del = async (): Promise<Awaited<ReturnType<typeof __deletePost>>> => {
    const postId = await searchPostId();
    await __deletePost(postId);
  };

  return {
    init,
    fetch,
    create,
    update,
    del,
  };
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useUnlockedAchievement(useTeams: typeof _useTeam) {
  const { baseCategory } = useStore($config);
  const {
    fetchPostByPostId,
    __createNewPost,
    __updatePost,
    __deletePost,
    __fetchPostsByCategory,
  } = useTeams();

  const postName = "unlockedAchievement";

  const init = async (): Promise<void> => {
    const posts = await __fetchPostsByCategory(`${baseCategory}/${postName}`);

    if (posts.length === 0) {
      await create();
    }
    console.log(posts);
  };

  const fetch = async (): Promise<UnlockedAchievementsPost> => {
    const postsId = await searchPostId();
    const post = await fetchPostByPostId(postsId);
    return await yUnlockedAchievementsPost.validate(post.body_md);
  };

  const create = async (): Promise<
    Awaited<ReturnType<typeof __createNewPost>>
  > =>
    await __createNewPost({
      category: postName,
      name: postName,
      body_md: JSON.stringify({ achievements: [] }),
    });

  const searchPostId = async (): Promise<number> => {
    const posts = await __fetchPostsByCategory(`${baseCategory}/${postName}`);
    return posts[0].number;
  };

  const update = async (
    achievementsPost: AchievementsPost,
  ): Promise<Awaited<ReturnType<typeof __updatePost>>> => {
    const postId = await searchPostId();
    return await __updatePost(postId, {
      post: {
        body_md: JSON.stringify(achievementsPost),
      },
    });
  };

  const del = async (): Promise<Awaited<ReturnType<typeof __deletePost>>> => {
    const postId = await searchPostId();
    await __deletePost(postId);
  };

  return {
    init,
    fetch,
    create,
    update,
    del,
  };
}

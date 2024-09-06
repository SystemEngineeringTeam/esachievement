/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { useStore } from "@nanostores/react";
import { type WritableAtom } from "nanostores";
import { type AnySchema } from "yup";
import { type useTeam as _useTeam } from "@/hooks/teams";
import { DB_VERSION, waitMs } from "@/lib/consts";
import { $config } from "@/lib/stores/config";
import { enableIgnoreResCacheTemporarily } from "@/lib/stores/teams";
import { yPostData, type PostData } from "@/types/post-data/_struct";
import { type Nullable } from "@/types/utils";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useEsaDB<T>(
  useTeams: typeof _useTeam,
  config: {
    postName: string;
    schema: AnySchema<T>;
    atom: WritableAtom<Nullable<T>>;
    initData: T;
  },
) {
  const { baseCategory } = useStore($config);
  const {
    fetchPostByPostId,
    fetchPostsByCategory,
    __createNewPost,
    __updatePost,
    __deletePost,
  } = useTeams();

  const category = `${baseCategory}/${config.postName}`;

  const init = async (): Promise<void> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    using _ = enableIgnoreResCacheTemporarily();
    const postId = await searchPostId().catch(() => undefined);

    if (postId == null) {
      await create();
      console.log("created!");
      await waitMs(1000);
    }
    const data = await fetch();
    config.atom.set(data);
    console.log("init!");
  };

  const fetch = async (): Promise<T> => {
    const postsId = await searchPostId();
    const { body_md } = await fetchPostByPostId(postsId);
    const { data } = await yPostData.validate(JSON.parse(body_md));

    return await config.schema.validate(data);
  };

  const create = async (): Promise<
    Awaited<ReturnType<typeof __createNewPost>>
  > => {
    const postId = await searchPostId().catch(() => undefined);
    if (postId != null) {
      throw new Error(`Post already exists!: #${postId}`);
    }

    const postData = {
      _name: "esachievement",
      _version: DB_VERSION,
      data: config.initData,
    } as const satisfies PostData<T>;

    return await __createNewPost({
      category,
      name: config.postName,
      body_md: JSON.stringify(postData),
    }).then((r) => {
      console.log(`Post created: ${category}/${config.postName}`);
      return r;
    });
  };

  const searchPostId = async (): Promise<number> => {
    const post = (await fetchPostsByCategory(category)).at(0);

    if (post == null) {
      throw new Error("Post not found!");
    }

    return post.number;
  };

  const update = async (
    newPost: T,
  ): Promise<Awaited<ReturnType<typeof __updatePost>>> => {
    const postId = await searchPostId();

    const postData = {
      _name: "esachievement",
      _version: DB_VERSION,
      data: newPost,
    } as const satisfies PostData<T>;

    return await __updatePost(postId, {
      post: {
        body_md: JSON.stringify(postData),
      },
    }).then((r) => {
      console.log(`Post updated: #${postId}`);
      return r;
    });
  };

  const del = async (): Promise<Awaited<ReturnType<typeof __deletePost>>> => {
    const postId = await searchPostId();
    await __deletePost(postId);
    console.log(`Post deleted: #${postId}`);
  };

  return {
    init,
    fetch,
    create,
    update,
    del,
  };
}

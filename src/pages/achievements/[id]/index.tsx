import { type ReactElement } from "react";
import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { useParams } from "@/router";
import { type Achievement } from "@/types/post-data/achievements";

export default function Page(): ReactElement {
  const { id } = useParams("/achievements/:id");
  const { fetch } = useAchievements(useTeam);
  const swrAchievement = useSWR("achievement", fetchAchievement);

  async function fetchAchievement(): Promise<Achievement> {
    const achievements = await fetch();

    if (achievements == null) throw new Error("No unlockedAchievements found.");

    const achievement = achievements.find((a) => a.id === Number(id));

    if (achievement == null) throw new Error("No achievement found.");

    return achievement;
  }

  return match(swrAchievement)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <div>
        <h1>name: {data.name}</h1>
        <p>id: {data.id}</p>
        <p>description: {data.description}</p>
        <p>icon: {data.icon}</p>
        <p>createdAt: {String(data.createdAt)}</p>
        <p>updatedAt: {String(data.updatedAt)}</p>
        <p>tags: {data.tags.map((tag) => tag.name).join(", ")}</p>
      </div>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

import { type ReactElement } from "react";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { useParams } from "@/router";
import { type Achievement } from "@/types/post-data/achievements";

export default function Page(): ReactElement {
  const { id } = useParams("/achievements/:id");
  const { fetch } = useAchievements(useTeam);
  const swrAchievement = useSWRImmutable("achievement", fetchAchievement);

  async function fetchAchievement(): Promise<Achievement[]> {
    const achievements = await fetch();

    if (achievements == null) throw new Error("No unlockedAchievements found.");

    return achievements;
  }

  return match(swrAchievement)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <div>
        {data.map((d) => {
          if (d.id === Number(id)) {
            return (
              <div key={d.id}>
                <h1>name: {d.name}</h1>
                <p>id: {d.id}</p>
                <p>description: {d.description}</p>
                <p>icon: {d.icon}</p>
                <p>createdAt: {String(d.createdAt)}</p>
                <p>updatedAt: {String(d.updatedAt)}</p>
                <p>tags: {d.tags.map((tag) => tag.name).join(", ")}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

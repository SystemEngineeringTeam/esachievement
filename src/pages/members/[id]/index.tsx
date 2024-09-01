import { type ReactElement } from "react";
import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { useParams } from "@/router";
import { type Member } from "@/types/member";

export default function Page(): ReactElement {
  const { id } = useParams("/members/:id");
  const { fetchMembers } = useTeam();
  const swrAchievement = useSWR("achievement", fetchAchievement);

  async function fetchAchievement(): Promise<Member> {
    const achievements = await fetchMembers();

    if (achievements == null) throw new Error("No unlockedAchievements found.");

    const achievement = achievements.find((a) => a.email === id);

    if (achievement == null) throw new Error("No achievement found.");

    return achievement;
  }

  return match(swrAchievement)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <div>
        <h1>name: {data.name}</h1>
        <p>screen_name: {data.screen_name}</p>
        <p>email: {data.email}</p>
        <p>myself: {data.myself}</p>
        <p>createdAt: {String(data.joined_at)}</p>
        <p>posts_count: {data.posts_count}</p>
        <p>last_accessed_at: {data.last_accessed_at}</p>
        <p>role: {data.role}</p>
        <p>icon: {data.icon}</p>
      </div>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

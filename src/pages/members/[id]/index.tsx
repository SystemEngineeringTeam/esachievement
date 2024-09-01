import { type ReactElement } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { useParams } from "@/router";
import { type Member } from "@/types/member";

export default function Page(): ReactElement {
  const { id } = useParams("/members/:id");
  const { fetchMembers } = useTeam();
  const swrMembers = useSWRImmutable("members", fetchMember);

  async function fetchMember(): Promise<Member[]> {
    const members = await fetchMembers();

    if (members == null) throw new Error("No unlockedAchievements found.");

    return members;
  }

  return match(swrMembers)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <div>
        {data.map((d) => {
          if (d.email === id) {
            return (
              <div key={d.email}>
                <h1>name: {d.name}</h1>
                <p>screen_name: {d.screen_name}</p>
                <p>email: {d.email}</p>
                <p>myself: {d.myself}</p>
                <p>createdAt: {String(d.joined_at)}</p>
                <p>posts_count: {d.posts_count}</p>
                <p>last_accessed_at: {d.last_accessed_at}</p>
                <p>role: {d.role}</p>
                <p>icon: {d.icon}</p>
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

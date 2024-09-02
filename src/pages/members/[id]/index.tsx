import { type ReactElement } from "react";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { handleSWRError } from "@/lib/utils/swr";
import { useParams } from "@/router";

export default function Page(): ReactElement {
  const { id } = useParams("/members/:id");
  const { fetchMembers } = useTeam();
  const swrMembers = useSWRImmutable("members", fetchMembers);

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
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

import { Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { Info } from "@/components/member/Info";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import {
  fetchMembersAndUnlockedAchievements,
  getUnlockedAchievementsFromMember,
} from "@/lib/utils/fetchers";
import { handleSWRError } from "@/lib/utils/swr";
import { useParams } from "@/router";

export default function Page(): ReactElement {
  const { id } = useParams("/members/:id");
  const { fetchMembers } = useTeam();
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);
  const swrMembersAndUnlockedAchievements = useSWRImmutable(
    "membersAndUnlockedAchievements",
    async () =>
      await fetchMembersAndUnlockedAchievements(
        fetchMembers,
        fetchUnlockedAchievements,
      ),
  );

  return match(swrMembersAndUnlockedAchievements)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data: { members, unlockedAchievements } }) => (
      <div>
        {members.map((m) => {
          if (m.email === id) {
            return (
              <div key={m.email}>
                <Flex>
                  <Info
                    key={m.email}
                    member={m}
                    point={
                      getUnlockedAchievementsFromMember(m, unlockedAchievements)
                        .length
                    }
                    rank={1}
                  />
                  <h1>name: {m.name}</h1>
                  <p>role: {m.role}</p>
                </Flex>
                <p>screen_name: {m.screen_name}</p>
                <p>email: {m.email}</p>
                <p>myself: {m.myself}</p>
                <p>createdAt: {String(m.joined_at)}</p>
                <p>posts_count: {m.posts_count}</p>
                <p>last_accessed_at: {m.last_accessed_at}</p>
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

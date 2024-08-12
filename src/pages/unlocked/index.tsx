import { Box, Table } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { UnlockableCard } from "@/components/achievements/UnlockableCard";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  const { init, fetch } = useAchievements(useTeam);
  const swrFetchAchievements = useSWRImmutable("fetchAchievements", fetch);

  useEffect(() => {
    void init();
  }, []);

  return match(swrFetchAchievements)
    .with(S.Loading, () => <p>Loading...</p>)
    .with(S.Success, ({ data }) => (
      <BoxStyle width="70%">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>名前</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>説明</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>タグ</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data?.map((achievement) => (
              <UnlockableCard key={achievement.id} achievement={achievement} />
            ))}
          </Table.Body>
        </Table.Root>
      </BoxStyle>
    ))
    .otherwise(({ error }) => {
      throw error;
    });
}

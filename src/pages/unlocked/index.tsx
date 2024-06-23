import { Box, Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import Achievements from "@/assets/achievements.json";
import { AchievementCard } from "@/components/achievements/Card";
import { UnlockableCard } from "@/components/achievements/UnlockableCard";
import { type Achievement } from "@/types/post-data/achievements";

const BoxStyle = styled(Box)`
  margin: 0 auto;
`;

export default function Page(): ReactElement {
  return (
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
          {Achievements.achievements.map((achievement) => (
            <UnlockableCard key={achievement.id} achievement={achievement} />
          ))}
        </Table.Body>
      </Table.Root>
    </BoxStyle>
  );
}

<BoxStyle width="70%">
  <Table.Root>
    <Table.Body>
      {Achievements.achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          achievement={achievement as unknown as Achievement}
        />
      ))}
    </Table.Body>
  </Table.Root>
</BoxStyle>;

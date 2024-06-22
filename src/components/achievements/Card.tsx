import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { useNavigate } from "@/router";
import { type Achievement } from "@/types/post-data/achievements";

export function AchievementCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  const navigate = useNavigate();
  const TableRow = styled(Table.Row)`
    transition: background-color 100ms;
    cursor: pointer;
    &:hover {
      background-color: #e2e8f0;
    }
  `;

  return (
    <TableRow
      onClick={() => {
        navigate("/achievements/:id", {
          params: {
            id: achievement.id.toString(),
          },
        });
      }}
    >
      <Table.RowHeaderCell>
        <Flex gap="2">
          <Avatar fallback="A" radius="full" size="6" src={achievement.icon} />
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>
      </Table.Cell>
      <Table.Cell>{achievement.description}</Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          #{achievement.tags[0].name}
        </Text>
      </Table.Cell>
    </TableRow>
  );
}


import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { type Achievement, } from "@/types/achievement";

export function AchievementCard({achievement}: {achievement: Achievement}): ReactElement {
  return (
    <Table.Row>
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
      <Table.Cell>
        {achievement.description}
      </Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          #{achievement.tags[0].name}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

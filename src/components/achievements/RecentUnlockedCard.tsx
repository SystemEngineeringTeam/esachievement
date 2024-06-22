import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import Achievements from "@/assets/achievements.json";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

export function RecentUnlockedCard({
  achievement,
}: {
  achievement: UnlockedAchievement;
}): ReactElement {
  const matchedUnlockedAchievement = Achievements.achievements.find(
    (a) => a.id.toString() === achievement.memberEmail,
  );

  return (
    <Table.Row>
      <Table.RowHeaderCell>
        <Flex gap="2">
          <Avatar
            fallback="A"
            radius="full"
            size="6"
            src={matchedUnlockedAchievement?.icon}
          />
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {matchedUnlockedAchievement?.name}
        </Text>
      </Table.Cell>
      <Table.Cell>{matchedUnlockedAchievement?.description}</Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          #{matchedUnlockedAchievement?.tags[0].name}
        </Text>
      </Table.Cell>
    </Table.Row>
  );
}

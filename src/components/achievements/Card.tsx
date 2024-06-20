
import { Avatar, Box, Card, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { type Achievement, } from "@/types/achievement";

export function AchievementCard({achievement}: {achievement: Achievement}): ReactElement {
  return (
    <Card>
      <Flex align="center" gap="3">
        <Avatar
          fallback="T"
          radius="full"
          size="3"
          src={achievement.icon}
        />
        <Box>
          <Text as="div" size="2" weight="bold">
            {achievement.name}
          </Text>
          <Text as="div" color="gray" size="2">
            {achievement.description}
          </Text>
          <Text as="div" color="gray" size="2">
            #{achievement.tags[0].name}
        </Text>
        </Box>
      </Flex>
      
    </Card>
  );
}

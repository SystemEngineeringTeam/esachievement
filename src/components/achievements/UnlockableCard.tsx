import { Text, Checkbox, Flex, Avatar } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { type Achievement } from "@/types/post-data/achievements";

const CustomCheckbox = styled(Checkbox)`
  transform: scale(2);
  display: flex;
  align-content: center;
  line-height: 10px;
`;

const CardStyle = styled(Flex)`
  transition: background-color 100ms;
  color: #374151;
  border-radius: 16px;
  height: fit-content;
  cursor: pointer;
`;

export function UnlockableCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  return (
    <CardStyle>
      <CustomCheckbox size="3" />

      <Avatar fallback="A" radius="full" size="6" src={achievement.icon} />

      <Flex direction="column">
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>

        <Text>{achievement.description}</Text>
      </Flex>

      <Text>{achievement.tags[0].name}</Text>
    </CardStyle>
  );
}

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

const AvatarStyle = styled(Avatar)`
  box-shadow:
    8px 8px 16px #b5bec9,
    -8px -8px 16px #ffffff;
  box-sizing: content-box;
  border: 6px solid #e7e7e7;
`;

const Description = styled(Text)`
  word-break: break-all;
  width: 30vw;
`;

export function UnlockableCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  return (
    <CardStyle>
      <CustomCheckbox size="3" />

      <AvatarStyle
        fallback="A"
        ml="7vw"
        mr="3vw"
        radius="full"
        size="6"
        src={achievement.icon}
      />

      <Flex direction="column" mb="3.8vh" mt="3.8vh">
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>

        <Description>{achievement.description}</Description>
      </Flex>

      <Text>{achievement.tags[0].name}</Text>
    </CardStyle>
  );
}

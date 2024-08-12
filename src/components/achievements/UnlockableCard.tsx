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

const Tags = styled(Text)`
  font-weight: bold;
  font-size: 1.4em;
  color: #374151;

  background-color: #e7e7e7;

  padding: 0.1em 1em 0.3em;
  margin-right: 1vw;

  text-align: center;
  border-radius: 50px;
  box-shadow:
    8px 8px 16px #d4d9e1,
    -8px -8px 16px #ffffff,
    inset 4px 4px 16px #e6e9ec,
    inset -4px -4px 16px #ffffff;
`;

export function UnlockableCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  return (
    <CardStyle align="center">
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

        <Description color="gray" weight="bold">
          {achievement.description}
        </Description>
      </Flex>

      <Tags as="div">#{achievement.tags[0].name}</Tags>
      <Tags as="div">#{achievement.tags[0].name}</Tags>
    </CardStyle>
  );
}

import { Text, Flex, Avatar, Checkbox } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { type Achievement } from "@/types/post-data/achievements";

const CardStyle = styled(Flex)`
  transition: background-color 100ms;
  color: #374151;
  border-radius: 16px;
  height: fit-content;
  cursor: pointer;
`;

const CheckboxStyle = styled(Checkbox)`
  box-shadow:
    4px 4px 16px #b5bec9,
    -4px -4px 16px #ffffff;
  box-sizing: content-box;
  border: 4px solid #e7e7e7;
  border-radius: 6px;
  &:hover {
    box-shadow: none;
    transition: 100ms;
  }
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
  isUnlocked,
  isDisabled = false,
  setIsUnlocked,
}: {
  achievement: Achievement;
  isUnlocked: boolean;
  isDisabled: boolean;
  setIsUnlocked: (isUnlocked: boolean) => void;
}): ReactElement {
  return (
    <CardStyle align="center">
      <CheckboxStyle
        checked={isUnlocked}
        disabled={isDisabled}
        ml="5vw"
        onCheckedChange={(e) => {
          if (e === "indeterminate") return;
          setIsUnlocked(e);
        }}
        size="3"
      />

      <AvatarStyle
        fallback="A"
        ml="4vw"
        mr="3vw"
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

      <Tags as="div">#{achievement.tags}</Tags>
      <Tags as="div">#{achievement.tags}</Tags>
    </CardStyle>
  );
}

import { Avatar, Flex, Text } from "@radix-ui/themes";
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

  const CardStyle = styled(Flex)`
    transition: background-color 100ms;
    color: #374151;
    border-radius: 16px;
    height: fit-content;
    cursor: pointer;
    &:hover {
      box-shadow:
        inset 8px 8px 16px #b5bec9,
        inset -8px -8px 16px #ffffff;
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

  const Tags = styled(Text)``;

  return (
    <CardStyle
      align="center"
      onClick={() => {
        navigate("/achievements/:id", {
          params: {
            id: achievement.id.toString(),
          },
        });
      }}
    >
      <AvatarStyle
        fallback="A"
        ml="6vw"
        mr="5vw"
        radius="full"
        size="6"
        src={achievement.icon}
      />

      <Flex direction="column" mb="3.8vh" mr="3vw" mt="3.8vh">
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>

        <Description color="gray" weight="bold">
          {achievement.description}
        </Description>
      </Flex>

      <Tags as="div" size="6" weight="bold">
        #{achievement.tags[0].name}
      </Tags>
    </CardStyle>
  );
}

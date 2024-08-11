import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import SampleAchievements from "@/assets/achievements.json";
import SampleMembers from "@/assets/members.json";
import { Link } from "@/router";
import { type Member } from "@/types/member";
import { type Achievement } from "@/types/post-data/achievements";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

const BoxStyle = styled(Box)`
  border-color: #cbd5e1;
  border-radius: 16px;
  padding: 1rem 0;
  width: 22vw;
  &:hover {
    box-shadow:
      inset 6px 6px 32px #b5bec9,
      inset -10px -10px 32px #ffffff;
    transition: 100ms;
  }
`;

export function LogRecentUnlocked({
  unlockedAchievement,
}: {
  unlockedAchievement: UnlockedAchievement;
}): ReactElement {
  const { memberEmail, achievementID, createdAt } = unlockedAchievement;

  const DateStyle = styled(Text)`
    padding-left: 10rem;
  `;

  const member = SampleMembers.members.find(
    (m) => m.email === memberEmail,
  ) as unknown as Member;

  const achievement = SampleAchievements.achievements.find(
    (a) => a.id === achievementID,
  ) as unknown as Achievement;

  return (
    <Link params={{ id: achievement.id.toString() }} to="/achievements/:id">
      <BoxStyle>
        <Flex align="center" gap="3" justify="center">
          <Avatar fallback="T" radius="full" size="4" src={achievement.icon} />
          <Box>
            <Text as="div" size="3" weight="bold">
              {member.name}
            </Text>
            <Text as="div" color="gray" size="2">
              {achievement.name}
            </Text>
            <DateStyle color="gray" size="1">
              {createdAt.toString().slice(0, 10)}
            </DateStyle>
          </Box>
        </Flex>
      </BoxStyle>
    </Link>
  );
}

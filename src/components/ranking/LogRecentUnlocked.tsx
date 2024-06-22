import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import SampleAchievements from "@/assets/achievements.json";
import SampleMembers from "@/assets/members.json";
import { Link } from "@/router";
import { type Achievement } from "@/types/achievement";
import { type Member } from "@/types/member";

const BoxStyle = styled(Box)`
  border-bottom: 1px solid;
  border-color: #cbd5e1;
  padding: 1.2rem 0;
  width: 20rem;
`;

export function LogRecentUnlocked({
  achievementID,
  memberEmail,
}: {
  achievementID: number;
  memberEmail: string;
}): ReactElement {
  // @ts-expect-error
  const member: Member = SampleMembers.members.find(
    (m) => m.email === memberEmail,
  );

  // @ts-expect-error
  const achievement: Achievement = SampleAchievements.achievements.find(
    (a) => a.id === achievementID,
  );
  return (
    <Link params={{ id: achievement.id.toString() }} to="/achievements/:id">
      <BoxStyle>
        <Flex align="center" gap="3" justify="center">
          <Avatar fallback="T" radius="full" size="4" src={achievement.icon} />
          <Box>
            <Text as="div" size="3" weight="bold">
              {member.name}
            </Text>
            <Text as="div" color="gray" size="3">
              {achievement.name}
            </Text>
          </Box>
        </Flex>
      </BoxStyle>
    </Link>
  );
}

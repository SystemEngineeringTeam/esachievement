import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router";
import { type Member } from "@/types/member";
import { type Achievement } from "@/types/post-data/achievements";

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
  unlockedMember,
  date,
}: {
  unlockedAchievement: Achievement | null;
  unlockedMember: Member | null;
  date: Date;
}): ReactElement {
  if (unlockedAchievement === null || unlockedMember === null)
    throw new Error("unlockedAchievement or unlockedMember is null");

  const DateStyle = styled(Text)`
    padding-left: 10rem;
  `;

  return (
    <Link
      params={{ id: unlockedAchievement.id.toString() }}
      to="/achievements/:id"
    >
      <BoxStyle>
        <Flex align="center" gap="3" justify="center">
          <Avatar
            fallback="T"
            radius="full"
            size="4"
            src={unlockedAchievement.icon}
          />
          <Box>
            <Text as="div" size="3" weight="bold">
              {unlockedAchievement.name}
            </Text>
            <Text as="div" color="gray" size="2">
              {unlockedMember.name}
            </Text>
            <DateStyle color="gray" size="1">
              {date.toString().slice(0, 10)}
            </DateStyle>
          </Box>
        </Flex>
      </BoxStyle>
    </Link>
  );
}

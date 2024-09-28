import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router";
import { type Member } from "@/types/member";

const BoxStyle = styled(Box)`
  border-radius: 24px;
  border-color: #cbd5e1;
  box-shadow:
    12px 12px 32px #b5bec9,
    -12px -12px 32px #ffffff;

  padding: 1.2rem 0;
  margin: 0 auto;
  margin-bottom: 1.4rem;
  width: 40rem;
  background-color: #e7e7e7;
  &:hover {
    box-shadow: none;
    transition: 100ms;
  }
`;

export function RankingCard({
  member,
  point,
  index,
}: {
  member: Member;
  point: number;
  index: number;
}): ReactElement {
  const { name, email, icon } = member;

  if (email == null) throw new Error("email is null");

  return (
    <BoxStyle>
      <Link onClick={() => {}} params={{ id: email }} to="/members/:id">
        <Flex align="center" gap="6" ml="6rem">
          <Text mr="2rem" size="8" weight="bold">
            {index + 1}
          </Text>
          <Avatar fallback="T" radius="full" size="7" src={icon} />
          <Flex align="center" direction="column">
            <Text as="div" size="6" weight="bold">
              {name}
            </Text>
            <Text as="div" color="gray" size="5">
              {point}pt
            </Text>
          </Flex>
        </Flex>
      </Link>
    </BoxStyle>
  );
}

import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router";
import { type Member } from "@/types/member";

export function RankingCard({
  member,
  point,
  idx,
}: {
  member: Member;
  point: number;
  idx: number;
}): ReactElement {
  const { name, email, icon } = member;

  if (email == null) throw new Error("email is null");

  const BoxStyle = styled(Box)`
    border-radius: 24px;
    border-color: #cbd5e1;
    box-shadow:
      12px 12px 32px #afafaf,
      -12px -12px 32px #ffffff;

    padding: 1.2rem 0;
    margin: 0 auto;
    margin-bottom: 2rem;
    width: 50rem;
  `;

  return (
    <Link params={{ id: email }} to="/members/:id">
      <BoxStyle>
        <Flex align="center" gap="6" ml="10rem" mr="10rem">
          <Text mr="3rem" size="8" weight="bold">
            {idx + 1}
          </Text>
          <Avatar fallback="T" radius="full" size="8" src={icon} />
          <Flex align="center" direction="column">
            <Text as="div" size="7" weight="bold">
              {name}
            </Text>
            <Text as="div" color="gray" size="7">
              {point}pt
            </Text>
          </Flex>
        </Flex>
      </BoxStyle>
    </Link>
  );
}

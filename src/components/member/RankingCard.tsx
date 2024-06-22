import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router";

export function RankingCard({
  memberEmail,
  memberName,
  memberIcon,
  index,
  point,
}: {
  memberEmail: string;
  memberName: string;
  memberIcon: string;
  index: number;
  point: number;
}): ReactElement {

  const BoxStyle = styled(Box)`
    border-bottom: 1px solid;
    border-color: #cbd5e1;
    padding: 1.2rem 0;
    width: 50rem;
  `;

  return (
    <Link params={{ id: memberEmail }} to="/members/:id">
      <BoxStyle>
        <Flex align="center" gap="6" ml="10rem" mr="10rem">
          <Text mr="3rem" size="8" weight="bold">
            {index + 1}
          </Text>
          <Avatar fallback="T" radius="full" size="8" src={memberIcon} />
          <Flex align="center" direction="column">
            <Text as="div" size="7" weight="bold">
              {memberName}
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

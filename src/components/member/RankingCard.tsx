import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import SampleMembers from "@/assets/members.json";
import { type Member } from "@/types/member";

export function RankingCard({
  memberEmail,
  index,
  point,
}: {
  memberEmail: string;
  index: number;
  point: number;
}): ReactElement {
  const matchMember: Member = SampleMembers.members.find(
    (member) => member.email === memberEmail,
  );

  const BoxStyle = styled(Box)`
    border-bottom: 1px solid;
    border-color: #cbd5e1;
    padding: 1.2rem 0;
    width: 50rem;
  `;

  return (
    <BoxStyle>
      <Flex align="center" gap="6" ml="10rem" mr="10rem">
        <Text mr="3rem" size="8" weight="bold">
          {index + 1}
        </Text>
        <Avatar
          fallback="T"
          radius="full"
          size="8"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        />
        <Flex align="center" direction="column">
          <Text as="div" size="7" weight="bold">
            {matchMember.name}
          </Text>
          <Text as="div" color="gray" size="7">
            {point}pt
          </Text>
        </Flex>
      </Flex>
    </BoxStyle>
  );
}

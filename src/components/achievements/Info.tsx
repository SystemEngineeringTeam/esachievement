import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";

const InfoBox = styled(Flex)`
  color: #242d3c;
  position: relative;
  left: 0;
  background-color: #e7e7e7;
  border-radius: 0 30px 30px 0;
  height: 100vh;
  width: fit-content;
  padding: 9rem 4rem 6rem 4rem;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
`;

const PercentageUnlocked = styled(Box)`
  color: #00cdc2;
  font-weight: bold;
  font-size: 5rem;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
  padding: 0.8rem 2.4rem;
  border-radius: 20px;
`;

const TagStyle = styled(Box)`
  color: #242d3c;
  font-weight: bold;
  font-size: 1.2rem;
  width: fit-content;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
  padding: 0.2rem 1rem;
  border-radius: 100rem;
`;

const TagGroup = styled(Flex)`
  width: 14rem;
  flex-wrap: wrap;
`;

export function Info({
  name,
  tags,
  icon,
  rateOfUnlocked,
}: {
  name: string;
  icon: string;
  tags: Array<string | undefined>;
  rateOfUnlocked: number;
}): ReactElement {
  return (
    <InfoBox direction="column">
      <Flex align="center" direction="column">
        <Avatar fallback="T" size="9" src={icon} />

        <Text mt="1rem" size="8" weight="bold">
          {name}
        </Text>
      </Flex>

      <Flex direction="column" mt="2rem">
        <Text weight="bold">タグ</Text>
        <TagGroup>
          <TagStyle mr="0.6rem" mt="1rem">
            #{tags[0]}
          </TagStyle>
          <TagStyle mt="1rem">#{tags[1]}</TagStyle>
        </TagGroup>
      </Flex>

      <Flex direction="column" mt="2rem">
        <Text weight="bold">全体の実績解除率</Text>
        <PercentageUnlocked mt="1rem">{rateOfUnlocked}%</PercentageUnlocked>
      </Flex>
    </InfoBox>
  );
}

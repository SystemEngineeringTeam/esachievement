import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";

const InfoBox = styled(Flex)`
  color: #242d3c;
  position: relative;
  left: 0;
  background-color: #e7e7e7;
  /* border-radius: 0 30px 30px 0; */
  height: 100vh;
  width: fit-content;
  padding: 9rem 4rem 6rem 3rem;
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

const RankingStyle = styled(Flex)`
  color: #242d3c;
  font-weight: bold;
  align-items: center;
  font-size: 2.6rem;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
  padding: 0.4rem 2.4rem;
  border-radius: 20px;
`;

export function Info({
  name,
  ranking,
  point,
  rateOfUnlocked,
}: {
  name: string;
  ranking: number;
  point: number;
  rateOfUnlocked: number;
}): ReactElement {
  return (
    <InfoBox direction="column">
      <Flex align="center" direction="column">
        <Avatar
          fallback="T"
          size="9"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        />

        <Text mt="1rem" size="8" weight="bold">
          {name}
        </Text>
      </Flex>

      <Flex direction="column" mt="2rem" width="100%">
        <Text ml="20px" weight="bold">
          順位
        </Text>
        <RankingStyle mt="1rem">
          <Text>{ranking}位</Text>
          <Text color="gray" ml="1rem" size="6">
            {point}pt
          </Text>
        </RankingStyle>
      </Flex>

      <Flex direction="column" mt="2rem">
        <Text ml="20px" weight="bold">
          実績解除率
        </Text>
        <PercentageUnlocked mt="1rem">{rateOfUnlocked}%</PercentageUnlocked>
      </Flex>
    </InfoBox>
  );
}

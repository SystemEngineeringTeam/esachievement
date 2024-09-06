import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const a = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

const UnlockedBox = styled(Flex)`
  width: 100%;
  height: 100%;
  margin: 7rem 6rem 0rem 6rem;
`;

const UnlockedCardStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #242d3c;
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  padding: 0rem 0.8rem;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
`;

const UnlockedCardList = styled(Flex)`
  padding: 1rem 2rem;
  border-radius: 10px;
  transition: 100ms;
  margin: 0 1rem;
  &:hover {
    box-shadow:
      inset 6px 6px 32px #b5bec9,
      inset -10px -10px 32px #ffffff;
  }
`;

const UnlockedTitle = styled(Box)`
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
`;

export function UnlockedCard(): ReactElement {
  return (
    <UnlockedBox direction="column">
      <UnlockedTitle mb="2rem" ml="20px">
        メンバーが解除した実績
      </UnlockedTitle>
      <UnlockedCardStyle to="/member">
        <Box height="1rem" width="1rem" />
        {a.map((b) => (
          <UnlockedCardList key={b.id} align="center">
            <Avatar
              fallback="T"
              mr="2rem"
              size="5"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            />
            <Text mr="3rem" size="7" weight="bold">
              恋愛失敗
            </Text>
            <Box mr="3rem" width="20rem">
              dafjasdklflkasdjflkjasdflkjlaskjflaskdj
            </Box>
            <Text>#love</Text>
          </UnlockedCardList>
        ))}
        <Box height="1rem" width="1rem" />
      </UnlockedCardStyle>
    </UnlockedBox>
  );
}

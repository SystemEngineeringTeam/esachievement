import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import FirstFlag from "@/assets/FirstFlag.svg";
import Members from "@/assets/members.json";

const FlexContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
`;

const StyledText = styled(Text)`
  font-size: 81px;
  font-weight: bold;
  white-space: nowrap;
  position: relative;
  top: 0px;
  left: 0px;
`;

const Point = styled.div`
  color: gray;
  font-size: 30px;
  font-weight: bold;
  position: relative;
  top: 90px;
  left: 0px;
`;

const StyledAvatar = styled(Avatar)`
  width: 300px;
  height: 380px;
  padding-top: 5rem;
`;

// const Styledclass = styled.div`
//   font-size: 30px;
//   font-weight: bold;
//   color: gray;
//   padding: 8px;
// `;

const Flag = styled.div`
  position: relative;
  top: 90px;
  right: 0px;
`;

const Padding = styled.div`
  padding-left: 80px;
`;

const One = styled.div`
  font-size: 80px;
  position: relative;
  top: -80px;
  left: 25px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function Info({
  id,
  point,
  rank,
  percent,
}: {
  id: string;
  point: number;
  rank: number;
  percent: number;
}): ReactElement {
  const matchedMember = Members.members.find((a) => a.email === id);

  return (
    <Box>
      <Padding>
        <FlexContainer>
          <Center>
            <Point>{point}pt</Point>
            <Flag>
              <img alt="flag" src={FirstFlag} width="100" />
            </Flag>
            <One>{rank}</One>
          </Center>

          <StyledAvatar fallback="T" radius="full" src={matchedMember?.icon} />
        </FlexContainer>

        <div>
          <StyledText>{matchedMember?.name}</StyledText>
        </div>
      </Padding>
      <Box width="100%">
        <Flex direction="column" gap="1">
          <Text align="center" size="5">
            実績解除率
          </Text>
          <Text align="center" size="9">
            {percent}%
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

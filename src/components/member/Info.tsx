import { Avatar, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import FirstFlag from "@/assets/FirstFlag.svg";
import { type Member } from "@/types/member";

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
  point,
  rank,
  member,
}: {
  point: number;
  rank: number;
  member: Member;
}): ReactElement {
  return (
    <Padding>
      <FlexContainer>
        <Center>
          <Point>{point}pt</Point>
          <Flag>
            <img alt="flag" src={FirstFlag} width="100" />
          </Flag>
          <One>{rank}</One>
        </Center>

        <StyledAvatar fallback="T" radius="full" src={member.icon} />
      </FlexContainer>

      <div>
        <StyledText>{member.name}</StyledText>
      </div>
    </Padding>
  );
}

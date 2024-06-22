import { Icon } from "@iconify/react";
import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import FirstFlag from "@/assets/FirstFlag.svg";

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

const StyledIcon = styled(Icon)`
  width: 300px;
  height: 400px;
  padding-top: 5rem;
`;

const Styledclass = styled.div`
  font-size: 30px;
  font-weight: bold;
  color: gray;
  padding: 8px;
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

export function PercentageView(): ReactElement {
  return (
    <Padding>
      <FlexContainer>
        <Center>
          <Point>100pt</Point>
          <Flag>
            <img alt="flag" src={FirstFlag} width="100" />
          </Flag>
          <One>1</One>
        </Center>

        <StyledIcon icon="material-symbols:account-circle-full" />
      </FlexContainer>

      <div>
        <StyledText>Ryoma osaki</StyledText>
      </div>

      <div>
        <Styledclass> 学部 kk 学年 b1</Styledclass>
      </div>
    </Padding>
  );
}

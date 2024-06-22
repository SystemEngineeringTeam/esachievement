import { Icon } from "@iconify/react";
import { Flex, Text, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import GroupSVG from "@/assets/firstsvg/Group 30.svg";
import UnionSVG from "@/assets/firstsvg/Union.svg";

const StyledBox = styled(Box)`
  margin-left: 50px;
`;

const StyledFlex = styled(Flex)`
  padding: 16px;
`;

const Margin = styled.div`
  margin-bottom: 50px;
`;

const BackgroundImage = styled.div`
  position: relative;
  top: -110px;
  padding: 8px;
`;

const Front = styled.div`
  position: absolute;
  top: 23px;
  left: 120px;
`;

const King = styled.div`
  position: absolute;
  top: 107px;
  left: 263px;
`;

export function FirstPenguin(): ReactElement {
  return (
    <StyledBox maxWidth="35rem">
      <StyledFlex align="center" direction="column">
        <Margin>
          <Text size="9" weight="bold">
            最初の解除者
          </Text>
        </Margin>

        <Margin>
          <Icon
            height={300}
            icon="material-symbols:account-circle-full"
            width={200}
          />
        </Margin>

        <King>
          <img alt="Union" height="110" src={UnionSVG} width="133" />
        </King>

        <BackgroundImage>
          <Front>
            <Text size="9" weight="bold">
              大崎 稜馬
            </Text>
          </Front>

          <img alt="Group" height="128" src={GroupSVG} width="500" />
        </BackgroundImage>
      </StyledFlex>
    </StyledBox>
  );
}

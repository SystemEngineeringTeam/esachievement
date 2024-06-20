import { Flex, Text, Avatar, Box} from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import GroupSVG from "@/assets/firstsvg/Group 30.svg";
import UnionSVG from "@/assets/firstsvg/Union.svg";

const StyledFlex = styled(Flex)`
  padding:8px;
`;

const Margin = styled.div`
  margin-bottom: 50px
  `;

const BackgroundImage = styled.div`
position: relative;
top:-50px;
`;

const Front = styled.div`
position: absolute;
top:5px;
left:60px;
`;

const King = styled.div`
position: absolute;
top:53px;
left: 120px;
`;


export function FirstPenguin(): ReactElement {
  const achievementTest = {
    id: 1,
    name: "first blood",
    description: "Get the first kill in a match.",
    icon: "https://placehold.jp/150x150.png",
    tag: ["kill"],
  };

  return (
  
    <Box maxWidth="20rem">

      <StyledFlex direction="column" align="center">
       <Margin>
        <Text weight="bold" size="7" >
          最初の解除者
        </Text>
       </Margin>

        <Margin>
          <Avatar
          size="8"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          radius="full"
          fallback="T"
        />
        </Margin>

        <King>
            <img src={UnionSVG} alt="Union" width="80" height="64" />
        </King>

        <BackgroundImage>
          <Front>
            <Text weight="bold" size="7">
              {achievementTest.name}
            </Text>
          </Front>

          <img src={GroupSVG} alt="Group" width="250" height="64" />
        </BackgroundImage>
      </StyledFlex> 
    </Box>
  );
}



import { Flex, Text, Box} from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";

const StyledFlex = styled(Flex)`
  padding:8px;
`;

const Percent = styled.div`
  font-size:100px;
`;

export default function Page(): ReactElement {
  let number = 14
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

        <Text weight="bold" size="7" >
          全体の実績解除率
        </Text>

        <Percent>
        {number}%
        </Percent>


      </StyledFlex>
      
     

     
    </Box>
  );
}



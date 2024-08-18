import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";

export default function App(): ReactElement {
  const Catchcopy = styled(Text)`
    color: #374151;

    letter-spacing: -0.1rem;
    font-weight: 800;
    font-size: 3.4rem;
  `;

  const SubCatchcopy = styled(Text)`
    width: 39vw;

    line-height: 3.6vh;
    font-weight: bold;
    font-size: 0.8rem;
    font-family: sans-serif;
  `;

  return (
    <Flex direction="column" ml="12vw" mt="24vh">
      <Catchcopy mb="-1vh">Esachievement</Catchcopy>
      <Catchcopy mb="1vh" ml="-0.5vw">
        ゲームの実績を現実に
      </Catchcopy>
      <SubCatchcopy color="gray" ml="0.5vw" mt="8vh">
        Esachievementは、ゲームの「実績解除」と情報共有サービス「esa」を組み合わせたWebアプリです。このアプリは
        チーム活動をより楽しく効率的にすることを目的として開発され、サークルや研究室での情報共有を促進しながら達成感を得ることができる仕組みになっています。
      </SubCatchcopy>
    </Flex>
  );
}

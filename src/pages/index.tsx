import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router.ts";

export default function App(): ReactElement {
  const Catchcopy = styled(Text)`
    color: #374151;
    /* text-shadow:
      6px 6px 8px #c5ccd4,
      -6px -6px 8px #f8f8f8; */

    letter-spacing: -0.1rem;
    font-weight: 900;
    font-size: 3.7rem;
    font-family: sans-serif;
  `;

  const SubCatchcopy = styled(Text)`
    color: #374151;
    letter-spacing: -0.1rem;
    font-weight: 600;
    font-size: 3.5rem;
    font-family: sans-serif;
  `;

  const Detail = styled(Text)`
    width: 30vw;

    color: #6b7180;

    line-height: 3vh;
    font-weight: bold;
    font-size: 0.8rem;
    font-family: sans-serif;
  `;

  const Button1 = styled(Link)`
    margin-top: 6vh;
    margin-left: 0.2vw;
    font-weight: bold;

    width: fit-content;
    height: fit-content;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e7e7e7;
    font-family: sans-serif;
    color: #374151;

    box-shadow:
      6px 6px 16px #b5bec9,
      -6px -6px 16px #ffffff;
    &:hover {
      background-color: #ebebeb;
      box-shadow:
        6px 6px 20px #b5bec9,
        -3px -3px 20px #ffffff;
      transform: scale(1.06);
      transition: 300ms;
    }
    .m {
      padding: 1.2vh 2.6vw;
    }
  `;

  return (
    <Flex direction="column" ml="10.4vw" mt="24vh">
      <Catchcopy mb="-1vh">Esachievement</Catchcopy>
      <SubCatchcopy mb="1vh" ml="-0.1vw">
        ゲームの実績を現実に
      </SubCatchcopy>
      <Detail ml="0.5vw" mt="4vh">
        Esachievementは、ゲームの「実績解除」と情報共有サービス「esa」を組み合わせたWebアプリです。このアプリは
        チーム活動をより楽しく効率的にすることを目的として開発され、サークルや研究室での情報共有を促進しながら達成感を得ることができる仕組みになっています。
      </Detail>
      <Button1 to="/create">
        <div className="m">使ってみる</div>
      </Button1>
    </Flex>
  );
}

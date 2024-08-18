import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import Circle from "@/assets/Circle.svg";
import Cross from "@/assets/Cross.svg";
import Rock from "@/assets/Rock.svg";
import { Link } from "@/router.ts";

export default function App(): ReactElement {
  const Catchcopy = styled(Text)`
    color: #374151;
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
    span {
      color: #449df7;
    }
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
    padding: 1.2vh 1.8vw;
    margin-top: 6vh;
    margin-left: 0.1vw;
    font-weight: bold;

    width: fit-content;
    height: fit-content;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #44ede5;
    font-family: sans-serif;
    color: #525c6e;

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
  `;

  const RockStyle = styled.img`
    width: 30vw;
    filter: drop-shadow(12px 12px 16px #a5b0bd)
      drop-shadow(-12px -12px 16px #ffffff) drop-shadow(-6px -6px 4px #f5f5f5);
    margin-top: 16vh;
    margin-left: 12vw;
  `;

  const CrossStyle = styled.img`
    width: 25vw;
    position: absolute;
    top: 64vh;
    left: 26vw;
  `;

  const CircleStyle = styled.img`
    width: 30vw;
    position: absolute;
    top: -22vh;
    left: 34vw;
  `;

  return (
    <Flex>
      <Flex direction="column" ml="10.4vw" mt="24vh">
        <Catchcopy mb="-2.2vh">Esachievement</Catchcopy>
        <SubCatchcopy ml="-0.1vw">
          ゲームの実績を<span>現実</span>に
        </SubCatchcopy>
        <Detail ml="0.5vw" mt="4vh">
          Esachievementは、ゲームの「実績解除」と情報共有サービス「esa」を組み合わせたWebアプリです。このアプリは
          チーム活動をより楽しく効率的にすることを目的として開発され、サークルや研究室での情報共有を促進しながら達成感を得ることができる仕組みになっています。
        </Detail>
        <Button1 to="/create">
          <Text mr="10px">使ってみる</Text>
          <img
            alt="arrow-right"
            src="https://api.iconify.design/formkit:arrowright.svg?color=%23525c6e"
          />
        </Button1>
      </Flex>
      <RockStyle alt="Rock" src={Rock} />
      <CrossStyle alt="Cross" src={Cross} />
      <CircleStyle alt="Circle" src={Circle} />
    </Flex>
  );
}

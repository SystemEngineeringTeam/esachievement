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
    font-size: 3.9rem;
    font-family: sans-serif;
  `;

  const SubCatchcopy = styled(Text)`
    color: #374151;
    letter-spacing: -0.1rem;
    font-weight: 600;
    font-size: 3.6rem;
    font-family: sans-serif;
    span {
      text-shadow:
        6px 6px 16px #ccd6e2,
        -6px -6px 16px #ffffff;
      color: #429ffb;
    }
  `;

  const Detail = styled(Text)`
    width: 30vw;
    color: #6b7180;

    line-height: 1.8rem;
    font-weight: 600;
    font-size: 0.8rem;
    font-family: sans-serif;
  `;

  const Button1 = styled(Link)`
    font-weight: bold;
    font-family: sans-serif;
    font-size: 0.9rem;
    background-color: #ebebeb;

    color: #525c6e;
    width: fit-content;
    height: fit-content;

    padding: 1.2vh 1.8vw;
    margin-top: 5.6vh;
    margin-left: 0.2vw;

    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    box-shadow:
      6px 6px 16px #b5bec9,
      -6px -6px 16px #ffffff;
    &:hover {
      background-color: #34e8df;

      box-shadow:
        6px 6px 20px #b5bec9,
        -3px -3px 20px #ffffff;
      transform: scale(1.06);
      transition: 200ms;
    }
  `;

  const RockStyle = styled.img`
    width: 40vw;
    margin-top: 10vh;
    margin-left: 4vw;
  `;

  const CrossStyle = styled.img`
    width: 28vw;
    top: 64vh;
    left: 32vw;
    position: absolute;
    z-index: -1;
  `;

  const CircleStyle = styled.img`
    width: 30vw;
    top: -26vh;
    left: 42vw;
    position: absolute;
    z-index: -1;
  `;

  return (
    <Flex>
      <Flex direction="column" ml="11vw" mt="24vh">
        <Catchcopy mb="-1.6vh">Esachievement</Catchcopy>
        <SubCatchcopy ml="-0.1vw">
          ゲームの実績を<span>現実</span>に
        </SubCatchcopy>
        <Detail ml="0.5vw" mt="5vh">
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

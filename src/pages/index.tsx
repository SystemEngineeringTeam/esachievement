import { useStore } from "@nanostores/react";
import { Flex, Text, Button } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import Circle from "@/assets/Circle.svg";
import Cross from "@/assets/Cross.svg";
import Rock from "@/assets/Rock.svg";
import { getAuthorizePageUrl } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Link } from "@/router.ts";

export default function App(): ReactElement {
  const Catchcopy = styled(Text)`
    color: #242d3c;
    letter-spacing: -0.1rem;
    font-weight: 700;
    font-size: 4.8rem;
    line-height: 4.6rem;
    font-family: sans-serif;
    position: relative;
    z-index: 3;
    span {
      color: #00cdc2;
      margin-left: 0.1rem;
      text-shadow:
        6px 6px 16px #b5bec9,
        -6px -6px 16px #ffffff;
    }
  `;

  const SubCatchcopy = styled(Text)`
    color: #6c7482;
    /* letter-spacing: -0.1rem; */
    font-weight: 500;
    font-size: 0.8rem;
    font-family: sans-serif;
  `;

  const Detail = styled(Text)`
    width: 28vw;
    color: #737a89;

    line-height: 1.4rem;
    font-weight: 500;
    font-size: 0.8rem;
    font-family: sans-serif;
  `;

  const Button1 = styled(Link)`
    font-weight: 600;
    font-family: sans-serif;
    font-size: 1rem;

    background-color: #e7e7e7;
    color: #00cdc2;
    border: 1px solid #00cdc2;

    width: fit-content;
    height: fit-content;

    padding: 1.2vh 1.3vw 1.2vh 1.8vw;
    margin-top: 4vh;
    margin-left: 0.3vw;

    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;

    box-shadow:
      6px 6px 16px #b5bec9,
      -6px -6px 16px #ffffff;

    transform-origin: 50% 50%;
    transition: 300ms;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 120%;
      background-color: #00cdc2;

      top: 0;
      left: 0;
      z-index: -1;
      transform-origin: 100% 50%;
      transform: scaleX(0%);
      transition: transform 300ms;
    }

    &:hover {
      box-shadow: none;
      transform: scale(1.06);
      color: #ffffff;
    }

    &:hover ::after {
      transform-origin: 0% 50%;
      transform: scaleX(100%);
      transform: none;
    }
  `;

  const Button2 = styled(Button)`
    font-weight: 600;
    font-family: sans-serif;
    font-size: 1rem;

    background-color: #e7e7e7;
    color: #00cdc2;
    border: 1px solid #00cdc2;

    width: fit-content;
    height: fit-content;

    padding: 1.2vh 1.3vw 1.2vh 1.8vw;
    margin-top: 4vh;
    margin-left: 0.3vw;

    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    position: relative;
    z-index: 1;

    box-shadow:
      6px 6px 16px #b5bec9,
      -6px -6px 16px #ffffff;

    transform-origin: 50% 50%;
    transition: 300ms;

    ::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 120%;
      background-color: #00cdc2;

      top: 0;
      left: 0;
      z-index: -1;
      transform-origin: 100% 50%;
      transform: scaleX(0%);
      transition: transform 300ms;
    }

    &:hover {
      box-shadow: none;
      transform: scale(1.06);
      color: #ffffff;
    }

    &:hover ::after {
      transform-origin: 0% 50%;
      transform: scaleX(100%);
      transform: none;
    }
  `;

  const RockStyle = styled.img`
    position: absolute;
    width: 48rem;
    left: 46vw;
    top: 2vh;
  `;

  const CrossStyle = styled.img`
    width: 28vw;
    top: 68vh;
    left: 24vw;
    position: absolute;
    z-index: -1;
  `;

  const CircleStyle = styled.img`
    width: 30vw;
    top: -26vh;
    left: 34vw;
    position: absolute;
    z-index: -1;
  `;

  return (
    <Flex>
      <Flex direction="column" ml="12vw" mt="26vh">
        <Catchcopy mb="-2.6vh">
          Make Your
          <br />
          <span>Life a Game!!</span>
        </Catchcopy>
        <SubCatchcopy ml="0.5vw" mt="9vh">
          EsaChievement
        </SubCatchcopy>
        <Detail ml="0.5vw" mt="1vh">
          実績解除と情報共有サービスesaを組み合わせたWebアプリです。このアプリはチーム活動をより楽しく効率的にすることを目的として開発されサークルや研究室での情報共有を促進しながら達成感を得ることができる仕組みになっています。
        </Detail>

        {useStore($hasAuthenticated) ? (
          <Button1 to="/ranking">
            <Text mr="10px">使ってみる</Text>
          </Button1>
        ) : (
          <Button2 as="a" href={getAuthorizePageUrl()}>
            <Text mr="10px">使ってみる</Text>
          </Button2>
        )}
      </Flex>
      <RockStyle alt="Rock" src={Rock} />
      <CrossStyle alt="Cross" src={Cross} />
      <CircleStyle alt="Circle" src={Circle} />
    </Flex>
  );
}

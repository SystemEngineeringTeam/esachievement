import { Icon } from "@iconify/react";
import { Theme } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { Center } from "@/components/Center";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Redirects } from "@/components/Redirects";

import "the-new-css-reset/css/reset.css";
import "@radix-ui/themes/styles.css";
import "@fontsource-variable/noto-sans-jp";
import "@/styles/global.css";

const Error = styled(Center)`
  position: relative;
  gap: 10px;
  color: #ff3e3e;
  background-color: #ffedee;
  > p {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const Image = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
`;

export function Catch(): ReactElement {
  const error = useRouteError();

  return (
    <Error>
      <Icon height="3rem" icon="mdi:alert-circle" />
      <p>クライアントエラー発生！</p>
      <code>{String(error)}</code>
      <Image src="https://i.gyazo.com/ebdf27f6d7df60165b7711e5e44d4388.webp" />
    </Error>
  );
}

const Main = styled.main`
  font-family: "Noto Sans JP Variable";
  word-break: keep-all;
`;
const BodyStyle = styled.div``;
const ThemeStyle = styled(Theme)`
  background-color: #e7e7e7;
  overflow: hidden;
  ::-webkit-scrollbar {
    /* Edge Chorome Safari Operaなど */
    display: none;
  }
`;

export default function Layout(): ReactElement {
  return (
    <ThemeStyle>
      <Main>
        <Redirects>
          <Header />
          <BodyStyle>
            <Outlet />
          </BodyStyle>
          <Footer />
        </Redirects>
      </Main>
    </ThemeStyle>
  );
}

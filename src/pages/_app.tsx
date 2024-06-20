import { Icon } from "@iconify/react";
import { Theme } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { Header } from "@/components/Header";
import { Redirects } from "@/components/Redirects";

import "the-new-css-reset/css/reset.css";
import "@radix-ui/themes/styles.css";
import "@fontsource-variable/noto-sans-jp";
import "@/styles/global.css";

export function Catch(): ReactElement {
  const error = useRouteError();

  const Error = styled(Center)`
    gap: 10px;
    color: #ff3e3e;
    background-color: #ffedee;

    > p {
      font-size: 1.2rem;
      font-weight: bold;
    }
  `;

  return (
    <Error>
      <Icon height="3rem" icon="mdi:alert-circle" />
      <p>クライアントエラー発生！</p>
      <code>{String(error)}</code>
    </Error>
  );
}

export default function Layout(): ReactElement {
  const Main = styled.main`
    font-family: "Noto Sans JP Variable";
    word-break: keep-all;
  `;
  const BodyStyle = styled.div`
    height: calc(100vh - 4.8rem);
    overflow: hidden;
  `;
  return (
    <Theme>
      <Main>
        <Redirects>
          <Header />
          <BodyStyle>
            <Outlet />
          </BodyStyle>
        </Redirects>
      </Main>
    </Theme>
  );
}

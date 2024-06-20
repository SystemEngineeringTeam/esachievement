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

  return <p>{JSON.stringify(error)}</p>;
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

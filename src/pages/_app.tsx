import { Theme } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Outlet, useRouteError } from "react-router-dom";
import styled from "styled-components";
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

  return (
    <Theme>
      <Main>
        <Redirects>
          <Outlet />
        </Redirects>
      </Main>
    </Theme>
  );
}

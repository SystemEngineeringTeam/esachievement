import { Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router.ts";

const FooterStyle = styled(Flex)`
  position: fixed;
  color: #242d3c;
  bottom: 5%;
  right: 0;
  left: 0;
  margin: 0 auto;
  height: 6.2%;
  width: 95%;
  z-index: 10;
`;

const CreateStyle = styled(Link)`
  background-color: #00cdc2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  padding: 1rem;
  margin-left: auto;
  border-radius: 80px;
  box-shadow:
    12px 12px 16px #b5bec9,
    -12px -12px 16px #ffffff;
  overflow: hidden;
  transition: 160ms;

  &:hover {
    box-shadow: none;
    width: fit-content;
  }
`;

const PrusStyle = styled.img`
  width: 1.8rem;
  height: 1.8rem;
`;

export function Footer(): ReactElement {
  return (
    <FooterStyle>
      <CreateStyle to="/create">
        <PrusStyle
          alt="prus"
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='%23f7f7f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='32' d='M256 112v288m144-144H112'/%3E%3C/svg%3E"
        />
      </CreateStyle>
    </FooterStyle>
  );
}

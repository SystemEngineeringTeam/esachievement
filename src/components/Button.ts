import { Button } from "@radix-ui/themes";
import styled from "styled-components";

export const ButtonStyled = styled(Button)`
  font-weight: 600;
  font-family: sans-serif;
  font-size: 1rem;
  cursor: pointer;

  background-color: #e7e7e7;
  color: #00cdc2;
  border: 1px solid #00cdc2;

  width: fit-content;
  height: fit-content;

  padding: 10px 20px;

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

    &::after {
      transform-origin: 0% 50%;
      transform: scaleX(100%);
      transform: none;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
    transform: scale(1.06);
    box-shadow: none;
  }
`;

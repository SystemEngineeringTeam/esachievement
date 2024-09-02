import { Icon } from "@iconify/react";
import { type ReactElement, useEffect } from "react";
import styled from "styled-components";
import { Center } from "./Center";

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

export function ErrorScreen({
  title,
  error,
}: {
  title?: string;
  error: any;
}): ReactElement {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, []);

  return (
    <Error>
      <Icon height="3rem" icon="mdi:alert-circle" />
      <p>{title != null ? `${title}中に` : "不明な"}エラーが発生しました</p>
      <code>{String(error)}</code>
      <Image src="https://i.gyazo.com/ebdf27f6d7df60165b7711e5e44d4388.webp" />
    </Error>
  );
}

import styled from "styled-components";

export const Expanded = styled.div`
  height: 100%;
  width: 100%;
`;

export const ExpandedCenter = styled(Expanded)<{ gap?: number }>`
  display: grid;
  place-items: center;
  place-content: center;
  gap: ${({ gap }) => (gap != null ? `${gap * 4}px` : undefined)};
`;

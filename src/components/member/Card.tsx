import { Avatar, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { sendAnalytics } from "@/lib/utils/analytics";
import { useNavigate } from "@/router";
import { type Member } from "@/types/member";

const CardStyle = styled(Flex)`
  transition: background-color 100ms;
  color: #374151;
  border-radius: 16px;
  height: fit-content;
  cursor: pointer;
  &:hover {
    box-shadow:
      inset 8px 8px 16px #b5bec9,
      inset -8px -8px 16px #ffffff;
    transition: 100ms;
  }
`;

const AvatarStyle = styled(Avatar)`
  box-shadow:
    8px 8px 16px #b5bec9,
    -8px -8px 16px #ffffff;
  box-sizing: content-box;
  border: 6px solid #e7e7e7;
`;

const NameStyle = styled(Text)`
  font-weight: bold;
  font-size: 2rem;
  width: 30vw;
`;

const PointStyle = styled(Text)`
  font-weight: bold;
  font-size: 1.4em;
  color: #374151;

  margin-right: 1vw;
`;

export function MemberCard({
  member,
  point,
}: {
  member: Member;
  point?: number;
}): ReactElement {
  const navigate = useNavigate();
  const url = useLocation().pathname;

  return (
    <CardStyle
      align="center"
      onClick={() => {
        if (member.email == null) {
          throw new Error("Member email is undefined");
        }
        sendAnalytics("memberDetail", url);
        navigate("/members/:id", {
          params: {
            id: member.email,
          },
        });
      }}
      p="1rem"
    >
      <AvatarStyle
        fallback="A"
        ml="7vw"
        mr="3vw"
        radius="full"
        size="6"
        src={member.icon}
      />

      <NameStyle as="div">{member.name}</NameStyle>
      {point == null ? null : (
        <PointStyle as="div" size="6">
          {point}pt
        </PointStyle>
      )}
    </CardStyle>
  );
}

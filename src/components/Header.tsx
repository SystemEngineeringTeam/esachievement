import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  background-color: #f1f5f9;
  top: 0;
  width: 100%;
  height: 5rem;
  .esaAchievements {
    margin-left: 2rem;
  }
  .users {
    margin-left: 49rem;
  }
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle gap="6" align="center">
      <Link to="/" className="esaAchievements">
        <Text size="7" weight="bold">
          エサちぶめんと
        </Text>
      </Link>
      <Link to="/members" className="users">
        <Text size="5" weight="bold">
          users
        </Text>
      </Link>
      <Link to="/achievements">
        <Text size="5" weight="bold">
          achievements
        </Text>
      </Link>
      <Link to="/create">
        <Flex gap="3" align="center">
          <Text size="5" weight="bold">
            実績管理
          </Text>
          <Avatar
            fallback="T"
            radius="full"
            size="5"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          />
        </Flex>
      </Link>
    </HeaderStyle>
  );
}

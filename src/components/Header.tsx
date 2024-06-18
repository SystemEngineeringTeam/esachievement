import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  background-color: #f1f5f9;
  top: 0;
  width: 100%;
  height: 5rem;
  overflow: hidden;

  .esaAchievementsStyle {
    display: block;
    padding: 3rem 1rem;
  }
  .usersStyle {
    margin-left: 50rem;
    display: block;
    padding: 3rem 1rem;
  }
  .achievementsStyle {
    display: block;
    padding: 3rem 1rem;
  }
  .createStyle {
    display: block;
    padding: 3rem 1rem;
    padding-right: 4rem;
    color: #f8fafc;
    background-color: #1e293b;
  }
  :hover.hoverAnime {
    background-color: #e2e8f0;
  }
  :hover.createHoverAnime {
    background-color: #334155;
  }
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle align="center">
      <Link className="esaAchievementsStyle hoverAnime" to="/">
        <Text size="7" weight="bold">
          エサちぶめんと
        </Text>
      </Link>
      <Link className="usersStyle hoverAnime" to="/members">
        <Text size="5" weight="bold">
          users
        </Text>
      </Link>
      <Link className="achievementsStyle hoverAnime" to="/achievements">
        <Box>
          <Text size="5" weight="bold">
            achievements
          </Text>
        </Box>
      </Link>
      <Link className="createStyle createHoverAnime" to="/create">
        <Flex align="center" gap="3">
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

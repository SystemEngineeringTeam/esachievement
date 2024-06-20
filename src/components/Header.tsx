import { Icon } from "@iconify/react";
import { Avatar, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  background-color: #f1f5f9;
  top: 0;
  width: 100%;
  height: 4.8rem;
  overflow: hidden;

  .esaAchievementsStyle {
    margin-right: 39rem;
  }
  .createStyle {
    padding-right: 4rem;
    color: #f8fafc;
    background-color: #0f172a;
  }
  .headerDefaultStyle {
    display: block;
    padding: 3rem 1.4rem;
  }
  :hover.hoverAnime {
    background-color: #e2e8f0;
  }
  :hover.createHoverAnime {
    background-color: #1e293b;
  }
`;

export function Header(): ReactElement {
  const loginFlag = true;
  return (
    <HeaderStyle align="center">
      <Link
        className="esaAchievementsStyle hoverAnime headerDefaultStyle"
        to="/"
      >
        <Text size="7" weight="bold">
          えさちぶめんと
        </Text>
      </Link>
      <Link className="hoverAnime headerDefaultStyle" to="/members">
        <Text size="5" weight="bold">
          users
        </Text>
      </Link>
      <Link className="hoverAnime headerDefaultStyle" to="/ranking">
        <Text size="5" weight="bold">
          ranking
        </Text>
      </Link>
      <Link
        className="achievementsStyle hoverAnime headerDefaultStyle"
        to="/achievements"
      >
        <Text size="5" weight="bold">
          achievements
        </Text>
      </Link>
      {loginFlag ? (
        <Link
          className="createStyle createHoverAnime headerDefaultStyle"
          to="/create"
        >
          <Flex align="center" gap="5">
            <Text size="5" weight="bold">
              実績管理
            </Text>
            <Avatar
              fallback="T"
              radius="full"
              size="5"
              src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            />
          </Flex>
        </Link>
      ) : (
        <Link className="createStyle createHoverAnime" to="/create">
          <Flex align="center" gap="5">
            <Text size="5" weight="bold">
              ログイン
            </Text>
            <Icon height={60} icon="material-symbols:person" width={60} />
          </Flex>
        </Link>
      )}
    </HeaderStyle>
  );
}

import { useStore } from "@nanostores/react";
import { Avatar, Flex, Text, Link as LinkComponent } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { getAuthorizePageUrl } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  background-color: #f1f5f9;
  height: 4.8rem;

  .esaAchievementsStyle {
    margin-right: auto;
  }
  .createStyle {
    color: #f8fafc;
    background-color: #0f172a;
    align-items: center;
    justify-content: center;
    width: 13rem;
    display: flex;
  }
  :hover.createHoverAnime {
    background: #1e293b;
  }
  .loginStyle {
    width: 15rem;
    color: #f8fafc;
    align-items: center;
    display: flex;
    justify-content: center;
    width: 13rem;
    background-color: #0f172a;
  }
`;

const LinkContents = styled(Link)`
  height: 100%;
  display: flex;
  padding: 0 1rem;
  align-items: center;
  &:hover {
    background: #e2e8f0;
  }
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle>
      <LinkContents className="esaAchievementsStyle" to="/">
        <Text size="7" weight="bold">
          えさちぶめんと
        </Text>
      </LinkContents>
      <LinkContents to="/ranking">
        <Text as="div" size="5" weight="bold">
          ranking
        </Text>
      </LinkContents>
      <LinkContents to="/members">
        <Text size="5" weight="bold">
          members
        </Text>
      </LinkContents>
      <LinkContents to="/achievements">
        <Text size="5" weight="bold">
          achievements
        </Text>
      </LinkContents>
      {useStore($hasAuthenticated) ? (
        <Link
          className="createStyle createHoverAnime headerDefaultStyle"
          to="/unlocked"
        >
          <Flex align="center" gap="4">
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
        <LinkComponent
          className="createStyle createHoverAnime"
          href={getAuthorizePageUrl()}
        >
          <Flex align="center" gap="4">
            <Text size="5" weight="bold">
              ログイン
            </Text>
            <Avatar
              fallback="T"
              radius="full"
              size="5"
              src="https://api.iconify.design/ion:person-sharp.svg?color=%23ffffff"
            />
          </Flex>
        </LinkComponent>
      )}
    </HeaderStyle>
  );
  // https://api.iconify.design/ion:add.svg
}

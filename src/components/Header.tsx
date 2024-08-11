import { useStore } from "@nanostores/react";
import { Avatar, Flex, Text, Link as LinkComponent } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { getAuthorizePageUrl } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  position: fixed;
  color: #374151;
  top: 2%;
  right: 0;
  left: 0;
  margin: 0 auto;
  height: 9%;
  width: 96%;
  z-index: 1;
`;

const RightContents = styled(Flex)`
  margin-left: auto;
  border-radius: 80px;
`;

const CreateStyle = styled(Link)`
  color: #e7e7e7;
  background-color: #0f172a;
  box-shadow:
    12px 12px 32px #b5bec9,
    -12px -12px 32px #ffffff;

  width: 13rem;
  border-radius: 80px;

  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    box-shadow: none;
    transition: 100ms;
  }
`;

const LinkContents = styled(Link)`
  background: #e7e7e7;
  box-shadow:
    12px 12px 32px #b5bec9,
    -12px -12px 32px #ffffff;

  height: 100%;
  padding: 0 5rem 0 2rem;
  margin-right: -4rem;
  border-radius: 80px;

  align-items: center;
  display: flex;

  &:hover {
    box-shadow: none;
  }
`;

const EsaAchievementsStyle = styled(Link)`
  top: 0;
  bottom: 0;
  margin: auto 0;
  font-weight: 900;
  margin-left: 3vw;
`;

const Esa = styled(Text)`
  color: #1dd4cb;
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle>
      <EsaAchievementsStyle to="/">
        <Esa size="9">esa</Esa>
        <Text size="9">chievement</Text>
      </EsaAchievementsStyle>

      <RightContents>
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
          <CreateStyle
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
          </CreateStyle>
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
      </RightContents>
    </HeaderStyle>
  );
  // https://api.iconify.design/ion:add.svg
}

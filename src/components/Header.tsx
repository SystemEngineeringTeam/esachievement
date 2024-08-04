import { useStore } from "@nanostores/react";
import { Avatar, Flex, Text, Link as LinkComponent } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { getAuthorizePageUrl } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  position: absolute;
  top: 2%;
  right: 0;
  left: 0;
  margin: 0 auto;
  height: 9%;
  width: 94%;
  z-index: 1;
`;

const RightContents = styled(Flex)`
  margin-left: auto;
  border-radius: 80px;
`;

const CreateStyle = styled(Link)`
  color: #f8fafc;
  background-color: #0f172a;
  align-items: center;
  justify-content: center;
  width: 13rem;
  border-radius: 80px;
  display: flex;
  &:hover {
    background: #1e293b;
  }
`;

const LinkContents = styled(Link)`
  background: #dadfe2;
  height: 100%;
  padding: 0 5rem 0 2rem;
  align-items: center;
  justify-items: center;
  display: flex;
  margin-right: -4rem;
  box-shadow:
    16px 16px 32px #afafaf,
    -16px -16px 32px #ffffff;

  border-radius: 80px;
  &:hover {
    background: #dadfe2;
  }
`;

const EsaAchievementsStyle = styled(Link)``;

export function Header(): ReactElement {
  return (
    <HeaderStyle>
      <EsaAchievementsStyle to="/">
        <Text size="7" weight="bold">
          esachievement
        </Text>
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

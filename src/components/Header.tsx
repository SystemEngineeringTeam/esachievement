import { useStore } from "@nanostores/react";
import {
  Avatar,
  Flex,
  Text,
  Link as LinkComponent,
  Box,
} from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import Icon from "@/assets/EsaChibuIcon.svg";
import { getAuthorizePageUrl } from "@/lib/services/esa";
import { $hasAuthenticated } from "@/lib/stores/auth";
import { Link } from "@/router.ts";

const HeaderStyle = styled(Flex)`
  position: fixed;
  color: #242d3c;
  top: 3%;
  right: 0;
  left: 0;
  margin: 0 auto;
  height: 6.2%;
  width: 95%;
  z-index: 10;
`;

const RightContents = styled(Flex)`
  margin-left: auto;
  border-radius: 80px;
`;

const CreateStyle = styled(Link)`
  color: #f7f7f7;
  background-color: #00cdc2;
  box-shadow:
    12px 12px 16px #b5bec9,
    -12px -12px 16px #ffffff;

  width: 10rem;
  border-radius: 80px;

  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    box-shadow: none;
    transition: 160ms;
  }
`;

const LinkContents = styled(Link)`
  background: #e7e7e7;
  box-shadow:
    12px 12px 32px #b5bec9,
    -12px -12px 32px #ffffff;

  height: 100%;
  padding: 0 5rem 0 1.6rem;
  margin-right: -3.4rem;
  border-radius: 80px;
  color: #242d3c;

  align-items: center;
  display: flex;

  &:hover {
    color: #6d737d;
    box-shadow: none;
    transition: 160ms;
  }
`;

const EsaAchievementsStyle = styled(Link)`
  top: 0;
  bottom: 0;
  margin: auto 0;
  font-weight: 900;
  letter-spacing: -0.1rem;
  font-size: 1.8rem;
  display: flex;
  align-content: center;
  align-items: center;
`;

const Esa = styled(Text)`
  color: #00cdc2;
  font-size: 2rem;
`;

const IconStyle = styled.img`
  width: 2.3rem;
  margin-right: 0.5vw;
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle>
      <EsaAchievementsStyle to="/">
        <IconStyle alt="Icon" src={Icon} />
        <Box>
          <Esa>Esa</Esa>
          <Text>chievement</Text>
        </Box>
      </EsaAchievementsStyle>

      <RightContents>
        <LinkContents to="/ranking">
          <Text as="div" size="2" weight="bold">
            ranking
          </Text>
        </LinkContents>

        <LinkContents to="/members">
          <Text size="2" weight="bold">
            members
          </Text>
        </LinkContents>

        <LinkContents to="/achievements">
          <Text size="2" weight="bold">
            achievements
          </Text>
        </LinkContents>

        {useStore($hasAuthenticated) ? (
          <CreateStyle
            className="createStyle createHoverAnime headerDefaultStyle"
            to="/unlocked"
          >
            <Flex align="center" gap="4">
              <Text size="2" weight="bold">
                実績管理
              </Text>
              <Avatar
                fallback="T"
                radius="full"
                size="3"
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
              <Text size="2" weight="bold">
                ログイン
              </Text>
              <Avatar
                fallback="T"
                radius="full"
                size="3"
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

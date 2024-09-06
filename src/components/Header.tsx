import { Icon } from "@iconify/react";
import { useStore } from "@nanostores/react";
import { Flex, Text, Link as LinkComponent, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import LogoIcon from "@/assets/EsaChibuIcon.svg";
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

const UnlockedStyle = styled(Link)`
  color: #f7f7f7;
  background-color: #00cdc2;
  box-shadow:
    12px 12px 16px #b5bec9,
    -12px -12px 16px #ffffff;

  width: 10rem;
  border-radius: 80px;
  padding: 1rem;

  align-items: center;
  justify-content: center;
  display: flex;
  &:hover {
    box-shadow: none;
    transition: 160ms;
  }
`;

const LoginStyle = styled(Box)`
  color: #f7f7f7;
  background-color: #00cdc2;
  box-shadow:
    12px 12px 16px #b5bec9,
    -12px -12px 16px #ffffff;

  width: 10rem;
  height: 100%;
  border-radius: 80px;
  padding: 1rem;

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

const TeamStyle = styled(Link)`
  display: flex;
  height: 100%;
  width: fit-content;
  background-color: #00cdc2;
  border-radius: 100rem;
  align-items: center;
  justify-content: center;
  color: #f7f7f7;
  margin-left: 0.8rem;
  box-shadow:
    12px 12px 16px #b5bec9,
    -12px -12px 16px #ffffff;
  &:hover {
    box-shadow: none;
    transition: 160ms;
  }
`;

export function Header(): ReactElement {
  return (
    <HeaderStyle>
      <EsaAchievementsStyle to="/">
        <IconStyle alt="Icon" src={LogoIcon} />
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
          <UnlockedStyle
            className="createStyle createHoverAnime headerDefaultStyle"
            to="/unlocked"
          >
            <Flex align="center" gap="4" style={{ color: "white" }}>
              <Text size="2" weight="bold">
                実績管理
              </Text>
              <Icon height="2em" icon="mdi:lock-open-outline" />
            </Flex>
          </UnlockedStyle>
        ) : (
          <LinkComponent
            className="createStyle createHoverAnime"
            href={getAuthorizePageUrl()}
          >
            <LoginStyle>
              <Flex align="center" gap="4">
                <Text size="3" weight="bold">
                  ログイン
                </Text>
                <Icon height="2em" icon="mdi:account" />
              </Flex>
            </LoginStyle>
          </LinkComponent>
        )}
        <TeamStyle to="/">
          <Icon height="2em" icon="mdi:account-group" width="4em" />
        </TeamStyle>
      </RightContents>
    </HeaderStyle>
  );
}

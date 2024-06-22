import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import members from "@/assets/members.json";
import UnlockedAchievements from "@/assets/unlockedAchievements.json";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import { esaClient } from "@/lib/services/esa";
import { type Member } from "@/types/member";

type MembersWithUnlockedCount = Array<
  Member & {
    unlockedCount: number;
  }
>;

export default function Page(): ReactElement {
  const RankingCardStyle = styled.div`
    position: relative;
    top: 4rem;
    overflow: scroll;
    height: 43rem;
    left: 14rem;
    width: fit-content;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
  `;

  const TitleStyle = styled(Text)`
    position: relative;
    left: 10rem;
    top: 2rem;
    font-size: 2rem;
  `;

  const LogTitleStyle = styled(Text)`
    font-size: 2rem;
    position: relative;
    top: -45.5rem;
    left: 71rem;
    padding: 0.3rem;
    overflow: scroll;
    font-weight: bold;
    background-color: #f1f5f9;
  `;
  const LogRecentUnlockedStyle = styled.div`
    position: relative;
    top: -45.5rem;
    left: 71rem;
    overflow: scroll;
    width: fit-content;
    height: calc(100vh - 4.8rem);
    width: 40rem;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
    background-color: #f1f5f9;
  `;

  const SideBar = styled.div`
    background-color: #f1f5f9;
  `;

  void esaClient.GET("/teams/{team_name}", {
    params: {
      path: {
        team_name: "sysken",
      },
    },
  });

  const memberList: MembersWithUnlockedCount = members.members.map((m) => {
    const unlockedArchievements =
      UnlockedAchievements.unlockedAchievements.filter(
        (u) => u.memberEmail === m.email,
      );
    return {
      ...m,
      unlockedCount: unlockedArchievements.length,
    };
  });

  memberList.sort((a, b) => b.unlockedCount - a.unlockedCount);

  return (
    <div>
      <TitleStyle size="7" weight="bold">
        実績解除ランキング
      </TitleStyle>
      <RankingCardStyle>
        {memberList.map((member, index) => (
          <RankingCard
            key={member.email}
            index={index}
            memberEmail={member.email}
            memberIcon={member.icon}
            memberName={member.name}
            point={member.unlockedCount}
          />
        ))}
      </RankingCardStyle>

      <SideBar>
        <LogTitleStyle as="div" size="7">
          最近の実績解除
        </LogTitleStyle>
        <LogRecentUnlockedStyle>
          {UnlockedAchievements.unlockedAchievements.map(
            (unlockedAchievements) => (
              <LogRecentUnlocked
                key={unlockedAchievements.achievementID}
                achievementID={unlockedAchievements.achievementID}
                memberEmail={unlockedAchievements.memberEmail}
              />
            ),
          )}
        </LogRecentUnlockedStyle>
      </SideBar>
    </div>
  );
}

import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import SampleUnlockedAchievements from "@/assets/unlockedAchievements.json";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";

export default function Page(): ReactElement {
  // 仮のデータ(unlockedAchievements)からfilterでpointを取得する
  const members = [
    {
      memberEmail: "xxxxxx",
      point: 100,
    },
    {
      memberEmail: "yyyyyy",
      point: 200,
    },
    {
      memberEmail: "yyyyyy",
      point: 200,
    },
    {
      memberEmail: "yyyyyy",
      point: 200,
    },
    {
      memberEmail: "yyyyyy",
      point: 200,
    },
    {
      memberEmail: "yyyyyy",
      point: 200,
    },
  ];

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
    overflow: scroll;
    width: fit-content;
    height: calc(100vh - 4.8rem);
    width: 40rem;
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

  return (
    <div>
      <TitleStyle size="7" weight="bold">
        実績解除ランキング
      </TitleStyle>
      <RankingCardStyle>
        {members.map((member, index) => {
          return (
            <RankingCard
              key={member.memberEmail}
              index={index}
              memberEmail={member.memberEmail}
              point={member.point}
            />
          );
        })}
      </RankingCardStyle>

      <SideBar>
        <LogTitleStyle size="7" weight="bold">
          テスト　　　　　　　　
        </LogTitleStyle>
        <LogRecentUnlockedStyle>
          {SampleUnlockedAchievements.unlockedAchievements.map(
            (unlockedAchievements) => {
              return (
                <LogRecentUnlocked
                  achievementID={unlockedAchievements.achievementID}
                  memberEmail={unlockedAchievements.memberEmail}
                />
              );
            },
          )}
        </LogRecentUnlockedStyle>
      </SideBar>
    </div>
  );
}

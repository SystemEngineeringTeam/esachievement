import { type ReactElement } from "react";
import SampleUnlockedAchievements from "@/assets/unlockedAchievements.json";
import { RankingCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import styled from "styled-components";
import { Text } from "@radix-ui/themes";

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
    height: 40rem;
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

  const LogRecentUnlockedStyle = styled.div`
    position: relative;
    top: -38rem;
    left: 71rem;
    overflow: scroll;
    height: 20rem;
    width: auto;
    width: fit-content;
    :hover {
      background-color: #e2e8f0;
      transition: 100ms;
    }
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
    </div>
  );
}

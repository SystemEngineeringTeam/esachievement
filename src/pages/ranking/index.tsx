import { type ReactElement } from "react";
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
  ];

  return (
    <div>
      {members.map((member, index) => {
        return (
          <RankingCard
            key={index}
            index={index}
            memberEmail={member.memberEmail}
            point={member.point}
          />
        );
      })}

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
    </div>
  );
}

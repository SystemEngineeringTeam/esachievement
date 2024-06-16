import { MemberCard } from "@/components/member/RankingCard";
import { LogRecentUnlocked } from "@/components/ranking/LogRecentUnlocked";
import { ReactElement } from "react";

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

  const achievements = [
    {
      achievementID: 1,
      memberEmail: "xxxxxx",
    },
    {
      achievementID: 2,
      memberEmail: "yyyyyy",
    },
  ];

  return (
    <div>
      {members.map((member, index) => {
        return (
          <MemberCard
            key={index}
            memberEmail={member.memberEmail}
            index={index}
            point={member.point}
          />
        );
      })}

      {achievements.map((achievement) => {
        return (
          <LogRecentUnlocked
            achievementID={achievement.achievementID}
            memberEmail={achievement.memberEmail}
          />
        );
      })}
    </div>
  );
}

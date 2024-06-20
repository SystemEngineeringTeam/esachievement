import { type ReactElement } from "react";
import { MemberCard } from "@/components/member/RankingCard";
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
      {members.map((member, index) => (
          <MemberCard
            key={index}
            index={index}
            memberEmail={member.memberEmail}
            point={member.point}
          />
        ))}

      {achievements.map((achievement,index) => (
          <LogRecentUnlocked
             key={index}
            achievementID={achievement.achievementID}
            memberEmail={achievement.memberEmail}
          />
        ))}
    </div>
  );
}

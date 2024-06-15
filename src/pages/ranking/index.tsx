import { MemberCard } from "@/components/member/RankingCard";
import { ReactElement } from "react";
// import unlockedAchievements from "@/assets/unlockedAchievements.json";

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
          <MemberCard
            key={index}
            memberEmail={member.memberEmail}
            index={index}
            point={member.point}
          />
        );
      })}
    </div>
  );
}


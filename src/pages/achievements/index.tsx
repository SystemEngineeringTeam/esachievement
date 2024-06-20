import { type ReactElement } from "react";
import Achievements from "@/assets/achievements.json";
import { AchievementCard } from "@/components/achievements/Card";
import { FirstPenguin } from "@/components/achievements/FirstPenguin";

export default function Page(): ReactElement {
  return (
    <>
      <FirstPenguin />
      {Achievements.achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id} 
          achievement={achievement}
        />
      ))}
    </>
  );
}

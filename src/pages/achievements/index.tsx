import { type ReactElement } from "react";
import data from "@/assets/achievements.json";
import { AchievementCard } from "@/components/achievements/Card";
import { FirstPenguin } from "@/components/achievements/FirstPenguin";

export default function Page(): ReactElement {
  return (
    <>
      <FirstPenguin />
      {data.achievements.map((achievement) => (
        <AchievementCard
          key={achievement.id}
          data={achievement}
          showRelativeDate={false}
        />
      ))}
    </>
  );
}

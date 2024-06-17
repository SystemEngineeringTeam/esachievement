import { type ReactElement } from "react";
import { FirstPenguin } from "@/components/achievements/FirstPenguin";
import { AchievementCard } from "@/components/achievements/Card";
import data from "@/assets/achievements.json";

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

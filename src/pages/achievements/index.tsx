import { type ReactElement } from "react";
import { AchievementCard } from "@/components/achievements/Card";
import data from "@/assets/achievements.json";
import { Achievement } from "@/types/achievement";

export default function Page(): ReactElement {
  return (
    <>
      {data.achievements.map((achievement) => (
        <AchievementCard
          data={achievement}
          showRelativeDate={true}
        />
      ))}
    </>
  );
}

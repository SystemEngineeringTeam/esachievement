import { type InferType, number, object, string, date, array } from "yup";

export const yUnlockedAchievement = object().shape({
  achievementID: number().required(), // achievementのidを参照
  memberEmail: string().email().required(), // memberのemailを参照
  createdAt: date().required(),
});
export const yUnlockedAchievementsPostData = array().of(yUnlockedAchievement);

export type UnlockedAchievement = InferType<typeof yUnlockedAchievement>;
export type UnlockedAchievementsPostData = InferType<
  typeof yUnlockedAchievementsPostData
>;

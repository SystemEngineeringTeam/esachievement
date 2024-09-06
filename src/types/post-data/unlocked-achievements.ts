import { type InferType } from "yup";
import yup from "@/lib/yup-locate";

export const yUnlockedAchievement = yup.object().shape({
  achievementID: yup.number().required(), // achievementのidを参照
  memberEmail: yup.string().email().required(), // memberのemailを参照
  createdAt: yup.date().required(),
});
export const yUnlockedAchievementsPostData = yup
  .array()
  .of(yUnlockedAchievement)
  .required();

export type UnlockedAchievement = InferType<typeof yUnlockedAchievement>;
export type UnlockedAchievementsPostData = InferType<
  typeof yUnlockedAchievementsPostData
>;

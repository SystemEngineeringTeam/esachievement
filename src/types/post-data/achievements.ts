import { type InferType, number, object, string, date, array } from "yup";

export const yAchievement = object().shape({
  id: number().required(),
  name: string().required(),
  description: string().required(),
  icon: string().required(),
  tags: array()
    .of(
      object().shape({
        id: number().required(),
        name: string().required(),
        color: string().required(),
      }),
    )
    .required(),
  createdAt: date().required(),
  updatedAt: date().required(),
});
export type Achievement = InferType<typeof yAchievement>;
export type AchievementTag = Achievement["tags"];

export const yAchievementsPostData = array().of(yAchievement);
export type AchievementsPostData = InferType<typeof yAchievementsPostData>;

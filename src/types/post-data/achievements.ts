import { type InferType, array } from "yup";
import yup from "@/lib/yup-locate";

export const yAchievement = yup.object().shape({
  id: yup.number().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  icon: yup.string().required(),
  tags: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        name: yup.string().required(),
        color: yup.string().required(),
      }),
    )
    .required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
});
export type Achievement = InferType<typeof yAchievement>;
export type AchievementTag = Achievement["tags"];

export const yAchievementsPostData = array().of(yAchievement);
export type AchievementsPostData = InferType<typeof yAchievementsPostData>;

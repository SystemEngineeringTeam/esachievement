import { type InferType, number, object, string, date, array } from "yup";

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export const yAchievement = object().shape({
  id: number().required(),
  name: string().required(),
  description: string().required(),
  icon: string().required(),
  tags: object()
    .shape({
      id: number().required(),
      name: string().required(),
      color: string().required(),
    })
    .required(),
  createdAt: date().required(),
  updatedAt: date().required(),
});
export const yAchievementsPost = object().shape({
  achievements: array().of(yAchievement).required(),
});

export type Achievement = InferType<typeof yAchievement>;
export type AchievementsPost = InferType<typeof yAchievementsPost>;

export const yUnlockedAchievement = object().shape({
  achievementID: number().required(), // achievementのidを参照
  memberEmail: string().email().required(), // memberのemailを参照
  createdAt: date().required(),
});
export const yUnlockedAchievementsPost = object().shape({
  unlockedAchievements: array().of(yUnlockedAchievement).required(),
});

export type UnlockedAchievement = InferType<typeof yUnlockedAchievement>;
export type UnlockedAchievementsPost = InferType<
  typeof yUnlockedAchievementsPost
>;

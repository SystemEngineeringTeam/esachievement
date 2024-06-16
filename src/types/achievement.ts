export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type Achievement = {
  id: number;
  name: string;
  description: string;
  icon: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
};

export type UnlockedAchievement = {
  achievementID: number; // ←achievementのidを参照
  memberEmail: string; // ←memberのemailを参照
  createdAt: string;
};

export type UnlockedAchievements = {
  unlockedAchievements: UnlockedAchievement[];
};

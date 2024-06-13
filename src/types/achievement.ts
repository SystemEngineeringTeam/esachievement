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
  created_at: string;
  updated_at: string;
};

export type UnlockedAchievement = {
  achievement_id: number; // ←achievementのidを参照
  member_id: string; // ←memberのemailを参照
  created_at: string;
};

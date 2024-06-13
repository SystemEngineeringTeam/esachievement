export type Member = {
  myself: boolean;
  name: string; // 漢字 名義
  screen_name: string; // k2xxxx_name
  icon: string; // URL
  role: "owner" |"member";
  posts_count: number;
  joined_at: string; // JST
  last_posted_at: string; // JST
  email: string;
};

export type Members = {
  members: Members[];
  prev_page: number | null;
  next_page: number;
  total_count: number;
  page: number;
  per_page: number;
  max_per_page: number;
};

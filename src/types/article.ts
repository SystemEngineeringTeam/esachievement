import { type Member } from "./member";

export type Article = {
  number: number; // 一意な番号
  name: string;
  full_name: string; // 良くわかんない
  wip: boolean;
  body_md: string;
  body_html: string;
  created_at: string; // JST
  message: string;
  kind: "stock" | "flow";
  comments_count: number;
  tasks_count: number;
  done_tasks_count: number;
  url: string;
  updated_at: string; // JST
  tags: string[];
  category: string;
  revision_number: number;
  created_by: Member;
  updated_by: Member;
  stargazers_count: number;
  watchers_count: number;
  star: boolean;
  watch: boolean;
  sharing_url: string;
};

import { type ArrayElem } from "./utils";
import { type useTeam } from "@/hooks/teams";

export type Member = ArrayElem<
  Awaited<ReturnType<ReturnType<typeof useTeam>["fetchMembers"]>>
>;

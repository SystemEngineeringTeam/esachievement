import { type ArrayElem } from "./utils";
import { type useMember } from "@/hooks/member";
import { type useTeam } from "@/hooks/teams";

export type Member = ArrayElem<
  Awaited<ReturnType<ReturnType<typeof useTeam>["fetchMembers"]>>
>;

export type CurrentMember = Awaited<
  ReturnType<ReturnType<typeof useMember>["fetchCurrentMember"]>
>;

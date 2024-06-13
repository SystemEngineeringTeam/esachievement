import { type ReactElement } from "react";
import { MemberCard } from "@/components/member/Card";
import SampleMember from "@/assets/members.json";
import { Member } from "@/types/member";

export function Page(): ReactElement {
  const teto = SampleMember.members.at(-1) as Member;

  return <MemberCard member={teto}></MemberCard>;
}

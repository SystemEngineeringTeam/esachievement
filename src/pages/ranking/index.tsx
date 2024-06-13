import { MemberCard } from "@/components/member/RankingCard";
import { ReactElement } from "react";
import SampleMember from "@/assets/members.json";
import members from "@/assets/members.json";
import { Member } from "@/types/member";

export default function Page(): ReactElement {
  const teto = SampleMember.members.at(-1) as Member;

  if (teto == null) throw new Error("Teto not found!");

  return <MemberCard member={teto}></MemberCard>;
}

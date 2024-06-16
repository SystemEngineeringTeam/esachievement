import { type ReactElement } from "react";
import { MemberCard } from "@/components/member/Card";
import SampleMember from "@/assets/members.json";
import { Member } from "@/types/member";

export default function Page(): ReactElement {
  return (
    <>
      {SampleMember.members.map((e: any) => {
        const member = e as Member;
        <MemberCard member={member}></MemberCard>;
      })}
    </>
  );
}

import { type ReactElement } from "react";
import SampleMember from "@/assets/members.json";
import { MemberCard } from "@/components/member/Card";
import { type Member } from "@/types/member";

export default function Page(): ReactElement {
  return (
    <>
      {SampleMember.members.map((e: any) => {
        const member = e as Member;
        <MemberCard member={member} />;
      })}
    </>
  );
}

import { Member } from "@/types/member";
import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function MemberCard({ member }: { member: Member }): ReactElement {
  return (
    <>
      <Text>Hello This page is memberCard</Text>
      <Text>{member.name}</Text>
      <Text>{member.email}</Text>
    </>
  );
}

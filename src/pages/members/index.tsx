import { type ReactElement } from "react";
import { List } from "@/components/List";
import { MemberCard } from "@/components/member/Card";

export function Page(): ReactElement {
  const membersTestData = [
    {
      id: 1,
      name: "John Doe",
      email: "xxx@gmail.com",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "test@gmail.com",
    },
  ];
  return (
    <List data={membersTestData}>
      <MemberCard data={undefined} />
    </List>
  );
}

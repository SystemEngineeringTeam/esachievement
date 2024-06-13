import { type ReactElement } from "react";
import { List } from "@/components/List";
import { MemberCard } from "@/components/member/Card";

export function Page(): ReactElement {
  const achievementsTestData = [
    {
      id: 1,
      name: "John Doe",
      description: "",
    },
    {
      id: 2,
      name: "Jane Doe",
      description: "",
    },
  ];
  return (
    <List data={achievementsTestData}>
      <MemberCard data={undefined} />
    </List>
  );
}

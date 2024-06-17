import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { type Member } from "@/types/member";

export function MemberCard({ member,point }: { member: Member,point:number }): ReactElement {
  return (
      <Table.Row>
        <Table.RowHeaderCell>
        <Flex gap="2">
          <Avatar
            fallback="A"
            radius="full"
            size="6"
            src={member.icon}
          />
        </Flex>
        </Table.RowHeaderCell>
        <Table.Cell>
          <Text as="div" size="8" weight="bold" >
          {member.name}
          </Text>
        </Table.Cell>
        <Table.Cell>{point}</Table.Cell>
      </Table.Row>
  );
}

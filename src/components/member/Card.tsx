import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { useNavigate } from "@/router";
import { type Member } from "@/types/member";

export function MemberCard({
  member,
  point,
}: {
  member: Member;
  point: number;
}): ReactElement {
  const navigate = useNavigate();
  const TableRow = styled(Table.Row)`
    transition: background-color 100ms;
    cursor: pointer;
    &:hover {
      background-color: #e2e8f0;
    }
  `;

  return (
    <TableRow
      onClick={() => {
        if (member.email == null) {
          throw new Error("Member email is undefined");
        }
        navigate("/members/:id", {
          params: {
            id: member.email,
          },
        });
      }}
    >
      <Table.RowHeaderCell>
        <Flex gap="2">
          <Avatar fallback="A" radius="full" size="6" src={member.icon} />
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {member.name}
        </Text>
      </Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          {point}pt
        </Text>
      </Table.Cell>
    </TableRow>
  );
}

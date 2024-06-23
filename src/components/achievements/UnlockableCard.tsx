import { Table, Text, Checkbox, Flex, Avatar } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { type Achievement } from "@/types/achievement";

const CustomCheckbox = styled(Checkbox)`
  transform: scale(2);
  display: flex;
  align-content: center;
  line-height: 10px;
`;

const CustomTableCell = styled(Table.Cell)`
  display: flex;
  align-items: center;
  padding-top: 60px;
  padding-bottom: 60px;
`;

export function UnlockableCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  return (
    <Table.Row>
      <CustomTableCell>
        <CustomCheckbox size="3" />
      </CustomTableCell>
      <Table.RowHeaderCell>
        <Flex gap="2">
          <Avatar fallback="A" radius="full" size="6" src={achievement.icon} />
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>
      </Table.Cell>
      <Table.Cell>{achievement.description}</Table.Cell>
      <Table.Cell>{achievement.tags[0].name}</Table.Cell>
    </Table.Row>
  );
}

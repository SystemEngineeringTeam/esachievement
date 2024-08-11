import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";
import { useNavigate } from "@/router";
import { type Achievement } from "@/types/post-data/achievements";

export function AchievementCard({
  achievement,
}: {
  achievement: Achievement;
}): ReactElement {
  const navigate = useNavigate();
  const TableRow = styled(Table.Row)`
    transition: background-color 100ms;
    color: #374151;
    cursor: pointer;
    &:hover {
      background-color: #e2e8f0;
    }
  `;

  const AvatarStyle = styled(Avatar)`
    box-shadow:
      8px 8px 16px #b5bec9,
      -8px -8px 16px #ffffff;
    box-sizing: content-box;
    border: 6px solid #e7e7e7;
  `;

  return (
    <TableRow
      onClick={() => {
        navigate("/achievements/:id", {
          params: {
            id: achievement.id.toString(),
          },
        });
      }}
    >
      <Table.RowHeaderCell>
        <Flex gap="2">
          <AvatarStyle
            fallback="A"
            ml="3"
            radius="full"
            size="6"
            src={achievement.icon}
          />
        </Flex>
      </Table.RowHeaderCell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {achievement.name}
        </Text>
      </Table.Cell>
      <Table.Cell>{achievement.description}</Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          #{achievement.tags[0].name}
        </Text>
      </Table.Cell>
    </TableRow>
  );
}

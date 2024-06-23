import { Avatar, Flex, Table, Text } from "@radix-ui/themes";
import { useEffect, useState, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Achievements from "@/assets/achievements.json";
import { type UnlockedAchievement } from "@/types/post-data/unlocked-achievements";

export function RecentUnlockedCard({
  unlockedAchievement,
}: {
  unlockedAchievement: UnlockedAchievement;
}): ReactElement {
  const navigate = useNavigate();

  const TableRow = styled(Table.Row)`
    transition: background-color 100ms;
    cursor: pointer;
    &:hover {
      background-color: #e2e8f0;
    }
  `;

  const [dayDiff, setDayDiff] = useState(0);
  const rtf1 = new Intl.RelativeTimeFormat("jp-lg", { style: "short" });

  const matchedAchievement = Achievements.achievements.find(
    (a) => a.id === unlockedAchievement.achievementID,
  );
  if (matchedAchievement == null) {
    throw new Error("matchedAchievement not found!");
  }

  useEffect(() => {
    const now = new Date();
    const formatedCreatedAt = new Date(matchedAchievement.createdAt);
    setDayDiff(
      Math.round(
        (formatedCreatedAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000),
      ),
    );
  });

  return (
    <TableRow
      onClick={() => {
        navigate("/achievements/:id", {
          params: {
            id: matchedAchievement.id.toString(),
          },
        });
      }}
    >
      <Table.RowHeaderCell>
        <Text color="gray" size="5">
          {rtf1.format(dayDiff, "day")}
        </Text>
        {/* <Text>{passedDate}</Text> */}
      </Table.RowHeaderCell>
      <Table.Cell>
        <Flex gap="2">
          <Avatar
            fallback="A"
            radius="full"
            size="6"
            src={matchedAchievement?.icon}
          />
        </Flex>
      </Table.Cell>
      <Table.Cell>
        <Text as="div" size="8" weight="bold">
          {matchedAchievement?.name}
        </Text>
      </Table.Cell>
      <Table.Cell>{matchedAchievement?.description}</Table.Cell>
      <Table.Cell>
        <Text as="div" size="6">
          #{matchedAchievement?.tags[0].name}
        </Text>
      </Table.Cell>
    </TableRow>
  );
}

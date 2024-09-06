import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

// const TableRow = styled(Table.Row)`
//   transition: background-color 100ms;
//   cursor: pointer;
//   &:hover {
//     background-color: #e2e8f0;
//   }
// `;

// export function RecentUnlockedCard({
//   unlockedAchievement,
// }: {
//   unlockedAchievement: UnlockedAchievement;
// }): ReactElement {
//   // const navigate = useNavigate();

//   const [dayDiff, setDayDiff] = useState(0);
//   const rtf1 = new Intl.RelativeTimeFormat("jp-lg", { style: "short" });

//   const matchedAchievement = Achievements.achievements.find(
//     (a) => a.id === unlockedAchievement.achievementID,
//   );
//   if (matchedAchievement == null) {
//     throw new Error("matchedAchievement not found!");
//   }

//   useEffect(() => {
//     const now = new Date();
//     const formatedCreatedAt = new Date(matchedAchievement.createdAt);
//     setDayDiff(
//       Math.round(
//         (formatedCreatedAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000),
//       ),
//     );
//   });

//   return (
//     <TableRow
//     // onClick={() => {
//     //   navigate("/achievements/:id", {
//     //     params: {
//     //       id: matchedAchievement.id.toString(),
//     //     },
//     //   });
//     // }}
//     >
//       <Table.RowHeaderCell>
//         <Text color="gray" size="5">
//           {rtf1.format(dayDiff, "day")}
//         </Text>
//         {/* <Text>{passedDate}</Text> */}
//       </Table.RowHeaderCell>
//       <Table.Cell>
//         <Flex gap="2">
//           <Avatar fallback="A" size="6" src={matchedAchievement?.icon} />
//         </Flex>
//       </Table.Cell>
//       <Table.Cell>
//         <Text as="div" size="8" weight="bold">
//           {matchedAchievement?.name}
//         </Text>
//       </Table.Cell>
//       <Table.Cell>{matchedAchievement?.description}</Table.Cell>
//       <Table.Cell>
//         <Text as="div" size="6">
//           #{matchedAchievement?.tags[0].name}
//         </Text>
//       </Table.Cell>
//     </TableRow>
//   );
// }

const a = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
];

const UnlockedBox = styled(Flex)`
  width: 100%;
  height: 100%;
  margin: 7rem 6rem 0rem 6rem;
`;

const UnlockedCardStyle = styled(Link)`
  display: flex;
  flex-direction: column;
  color: #242d3c;
  width: 100%;
  height: fit-content;
  border-radius: 20px;
  padding: 0rem 0.8rem;
  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;
`;

const UnlockedCardList = styled(Flex)`
  padding: 1rem 2rem;
  border-radius: 10px;
  transition: 100ms;
  margin: 0 1rem;
  &:hover {
    box-shadow:
      inset 6px 6px 32px #b5bec9,
      inset -10px -10px 32px #ffffff;
  }
`;

const UnlockedTitle = styled(Box)`
  width: 100%;
  font-weight: bold;
  font-size: 1.2rem;
`;

export function RecentUnlockedCard(): ReactElement {
  return (
    <UnlockedBox direction="column">
      <UnlockedTitle mb="2rem" ml="20px">
        最近解除した人
      </UnlockedTitle>
      <UnlockedCardStyle to="/member">
        <Box height="1rem" width="1rem" />
        {a.map((b) => (
          <UnlockedCardList key={b.id} align="center">
            <Avatar
              fallback="T"
              mr="2rem"
              size="5"
              src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            />
            <Text mr="8rem" size="7" weight="bold">
              メンバー名
            </Text>
            <Text mr="2rem">20位</Text>
            <Text>1000pt</Text>
          </UnlockedCardList>
        ))}
        <Box height="1rem" width="1rem" />
      </UnlockedCardStyle>
    </UnlockedBox>
  );
}

import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import SampleMembers from "@/assets/members.json";
import { type Member } from "@/types/member";

export function MemberCard({
  memberEmail,
  index,
  point,
}: {
  memberEmail: string;
  index: number;
  point: number;
}): ReactElement {
  // const userPoint = unlockedAchievements.unlockedAchievements.filter(
  //   (achievements) => {
  //     return achievements.userEmail == "xxxxx";
  //   },
  // );
  const member: Member = SampleMembers.members.find(
    (member) => member.email === memberEmail,
  )!;

  return (
    <Box maxWidth="50rem">
        <Flex align="center" gap="6" ml="14rem">
          <Text mr="3rem" size="8">
            {index + 1}
          </Text>
          <Avatar
            fallback="T"
            radius="full"
            size="8"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          />
          <Flex align="center" direction="column">
            <Text as="div" size="7" weight="bold">
              {member.name}
            </Text>
            <Text as="div" color="gray" size="7">
              {point}pt
            </Text>
          </Flex>
        </Flex>
        <Separator my="3" size="4" />
      </Box>
  );
}

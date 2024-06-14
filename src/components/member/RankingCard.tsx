import { Member } from "@/types/member";
import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import unlockedAchievements from "@/assets/unlockedAchievements.json";

export function MemberCard({ member }: { member: Member }): ReactElement {
  const userPoint = unlockedAchievements.unlockedAchievements.filter(
    (achievements) => {
      return achievements.userEmail == "xxxxxx";
    },
  );

  return (
    <>
      <Box maxWidth="240px">
        <Flex gap="3" align="center">
          <Avatar
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {member.name}
            </Text>
            <Text as="div" size="2" color="gray">
              {userPoint.length}pt
            </Text>
          </Box>
        </Flex>
      </Box>
    </>
  );
}

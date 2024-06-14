import { Member } from "@/types/member";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import unlockedAchievements from "@/assets/unlockedAchievements.json";

export function MemberCard({ member }: { member: Member }): ReactElement {
  const userPoint = unlockedAchievements.unlockedAchievements.filter(
    (achievements) => {
      return achievements.userEmail == "xxxxx";
    },
  );

  return (
    <>
      <Box maxWidth="50rem">
        <Flex gap="6" align="center" ml="14rem">
          <Text size="8" mr="3rem">
            1
          </Text>
          <Avatar
            size="8"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
            radius="full"
            fallback="T"
          />
          <Flex direction="column" align="center">
            <Text as="div" size="7" weight="bold">
              {member.name}
            </Text>
            <Text as="div" size="7" color="gray">
              {userPoint.length}pt
            </Text>
          </Flex>
        </Flex>
        <Separator my="3" size="4" />
      </Box>
    </>
  );
}

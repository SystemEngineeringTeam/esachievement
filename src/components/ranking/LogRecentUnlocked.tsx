import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { Member } from "@/types/member";
import { Achievement } from "@/types/achievement";
import SampleAchievements from "@/assets/achievements.json";
import SampleMembers from "@/assets/members.json";

export function LogRecentUnlocked({
  achievementID,
  memberEmail,
}: {
  achievementID: number;
  memberEmail: string;
}) {
  //@ts-ignore
  const member: Member = SampleMembers.members.find(
    (member) => member.email === memberEmail,
  )[0];

  const achievement: Achievement = SampleAchievements.achievements.find(
    (Achievement) => Achievement.id === achievementID,
  )!;

  return (
    <>
      <Box maxWidth="240px">
        <Flex gap="3" align="center" justify="center">
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
              {achievement.name}
            </Text>
          </Box>
        </Flex>
        <Separator my="3" size="4" />
      </Box>
    </>
  );
}

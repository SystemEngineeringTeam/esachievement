import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import SampleAchievements from "@/assets/achievements.json";
import SampleMembers from "@/assets/members.json";
import { type Achievement } from "@/types/achievement";
import { type Member } from "@/types/member";

export function LogRecentUnlocked({
  achievementID,
  memberEmail,
}: {
  achievementID: number;
  memberEmail: string;
}) {
  // @ts-expect-error
  const member: Member = SampleMembers.members.find(
    (member) => member.email === memberEmail,
  )[0];

  const achievement: Achievement = SampleAchievements.achievements.find(
    (Achievement) => Achievement.id === achievementID,
  )!;

  return (
    <Box maxWidth="240px">
        <Flex align="center" gap="3" justify="center">
          <Avatar
            fallback="T"
            radius="full"
            size="3"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          />
          <Box>
            <Text as="div" size="2" weight="bold">
              {member.name}
            </Text>
            <Text as="div" color="gray" size="2">
              {achievement.name}
            </Text>
          </Box>
        </Flex>
        <Separator my="3" size="4" />
      </Box>
  );
}

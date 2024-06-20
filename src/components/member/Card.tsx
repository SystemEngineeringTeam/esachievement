import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { type Member } from "@/types/member";

export function MemberCard({ member }: { member: Member }): ReactElement {
  // 仮の情報を表示
  // icon,name,screen_name,post_count,role
  return (
    <>
      <Flex align="center" gap="4" height="80px">
        <Avatar fallback="T" radius="full" size="5" src={member.icon} />
        <Box width="300px">
          <Text as="div" size="7" weight="bold">
            {member.name}
          </Text>
        </Box>
        <Box width="60px">
          <Text align="center" as="div" color="gray" size="5">
            {member.screen_name}
          </Text>
        </Box>
        <Box width="60px">
          <Text align="center" as="div" color="gray" size="5">
            {member.posts_count}
          </Text>
        </Box>
        <Box width="60px">
          <Text align="center" as="div" color="gray" size="5">
            {member.role}
          </Text>
        </Box>
      </Flex>
      <Separator my="1" size="4" />
    </>
  );
}

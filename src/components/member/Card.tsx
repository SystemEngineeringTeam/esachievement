import { Member } from "@/types/member";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function MemberCard({ member,point }: { member: Member,point:number }): ReactElement {
  //仮の情報を表示
  //icon,name,screen_name,post_count,role



  return (
    <>
      <Flex gap="4" align="center" height="80px">
          <Avatar
            size="5"
            src = {member.icon}
            radius="full"
            fallback="T"
          />
          <Box width="300px" >
            <Text as="div" size="7" weight="bold">
              {member.name}
            </Text>
          </Box>
          <Box width="60px">
            <Text as="div" size="5" color="gray" align="center">
              {member.screen_name}
            </Text>
          </Box>
          <Box width="60px">
            <Text as="div" size="5" color="gray" align="center">
              {member.posts_count}
            </Text>
          </Box>
          <Box width="60px">
            <Text as="div" size="5" color="gray" align="center">
              {member.role}
            </Text>
          </Box>
      </Flex>
      {point}
      <Separator my="1" size="4" />
    </>
  );
}

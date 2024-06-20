import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";

export default function Page(): ReactElement {
  const achievementTest = {
    id: 1,
    name: "first blood",
    description: "Get the first kill in a match.",
    icon: "https://placehold.jp/150x150.png",
    tag: ["kill"],
  };

  return (
    <Box maxWidth="8rem">
      <Flex align="center" direction="column">
        <Avatar
          fallback="T"
          radius="full"
          size="7"
          src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
        />

        <Text size="6" weight="bold">
          恋愛失敗
        </Text>
      </Flex>

      {achievementTest.tag.map((tag, index) => (
        <Text key={index} color="gray">
          タグ {tag}
        </Text>
      ))}
    </Box>
  );
}

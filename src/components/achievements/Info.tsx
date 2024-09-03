import { Flex, Text, Avatar, Box } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function Info({ percent }: { percent: number }): ReactElement {
  const achievementTest = {
    id: 1,
    name: "first blood",
    description: "Get the first kill in a match.",
    icon: "https://placehold.jp/150x150.png",
    tag: ["kill"],
  };

  return (
    <Box>
      <Box maxWidth="8rem">
        <Flex align="center" direction="column">
          <Avatar
            fallback="T"
            size="7"
            src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
          />

          <Text size="6" weight="bold">
            恋愛失敗
          </Text>
        </Flex>

        {achievementTest.tag.map((tag, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Text key={index} color="gray">
            タグ {tag}
          </Text>
        ))}
      </Box>
      <Box width="100%">
        <Flex direction="column" gap="1">
          <Text align="center" size="5">
            全体の実績解除率
          </Text>
          <Text align="center" size="9">
            {percent}%
          </Text>
        </Flex>
      </Box>
    </Box>
  );
}

import { Box, Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function PercentageView({ percent }: { percent: number }): ReactElement {
  return (
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
  );
}

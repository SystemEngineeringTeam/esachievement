import { Box, Flex, Text } from "@radix-ui/themes";
import { ReactElement } from "react";

export function PercentageView({ percent }: { percent: number }): ReactElement {
  return (
    <Box width="100%">
      <Flex direction="column" gap="1">
        <Text size="5" align="center">
          実績解除率
        </Text>
        <Text size="9" align="center">
          {percent}%
        </Text>
      </Flex>
    </Box>
  );
}

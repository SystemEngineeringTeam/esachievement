import { Flex, Button, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export default function Page(): ReactElement {
  const params = new URLSearchParams(window.location.search);
  console.log(params);
  return (
    <Flex direction="column" gap="2">
      <Text>こちらCallbackになります</Text>

    </Flex>
  );
}

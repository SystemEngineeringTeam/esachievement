import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export default function Page(): ReactElement {
  const url = new URLSearchParams(window.location.search);
  const code = url.get("code");
  console.log(code);
  return (
    <Flex direction="column" gap="2">
      <Text>こちらCallbackになります</Text>
      <Text>code: {code}</Text>
    </Flex>
  );
}

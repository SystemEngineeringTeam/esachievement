import { Flex, Button, Text } from "@radix-ui/themes";
import { type ReactElement, useState } from "react";

export default function App(): ReactElement {

  return (
    <Flex direction="column" gap="2">
      <Text>こちらログイン画面になります</Text>
      <a href="https://api.esa.io/">
      <Button
      >
        Login
      </Button>
        </a>
    </Flex>
  );
}

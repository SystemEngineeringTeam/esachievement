import { Flex, Button, Text } from "@radix-ui/themes";
import { type ReactElement, useState } from "react";

export default function App(): ReactElement {
  const [count, setCount] = useState(0);

  return (
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
      <Text>Count: {count}</Text>
      <Button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Increment
      </Button>
    </Flex>
  );
}

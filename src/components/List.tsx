import { Flex, Button, Text } from "@radix-ui/themes";
import { type ReactElement, type ReactNode, useState } from "react";

export function List({
  children,
  data,
}: {
  children: ReactNode;
  data: any;
}): ReactElement {
  const [count, setCount] = useState(0);

  return (
    <>
      <Flex direction="column" gap="2">
        <Text>Hello This page is members</Text>
        <Text>Count: {count}</Text>
        <Button
          onClick={() => {
            setCount((prev) => prev + 1);
          }}
        >
          Increment
        </Button>
      </Flex>
      {data.map((item: any) => (
        <Flex key={item.id} direction="column" gap="2">
          {children} {/* ここでchildrenに引数を与えたい */}
        </Flex>
      ))}
    </>
  );
}

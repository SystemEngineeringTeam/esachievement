import { Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export function memberCard({ data }: { data: any }): ReactElement {
  return (
    <>
      <Text>Hello This page is memberCard</Text>
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </>
  );
}

import { Flex, Button, Text } from "@radix-ui/themes";
import { type ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <Flex direction="column" gap="2">
      <Text>こちらログイン画面になります</Text>
      <a
        href={`https://api.esa.io/oauth/authorize?client_id=${import.meta.env.CLIENT_ID}&redirect_uri=${import.meta.env.REDIRECT_LOCAL_URI}&scope=read+write&response_type=code`}
      >
        <Button>Login</Button>
      </a>
    </Flex>
  );
}

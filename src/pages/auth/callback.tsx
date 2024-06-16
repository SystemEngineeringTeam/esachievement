import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement, useEffect } from "react";

export default function Page(): ReactElement {
  let code = "";
  useEffect(() => {
    const url = new URLSearchParams(window.location.search);
    code = url.get("code") ?? "";
    fetch(`https://api.esa.io/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_CLIENT_ID,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
        redirect_uri: import.meta.env.VITE_REDIRECT_URI,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <Flex direction="column" gap="2">
      <Text>こちらCallbackになります</Text>
    </Flex>
  );
}

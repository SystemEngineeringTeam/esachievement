import { Flex, Text } from "@radix-ui/themes";
import { type ReactElement, useEffect, useState } from "react";

export default function Page(): ReactElement {
  const [code, setCode] = useState("");
  const [resJson, setResJson] = useState("");

  const test = async (): Promise<void> => {
    const url = new URLSearchParams(window.location.search);
    setCode(url.get("code") ?? "");
    const data = await fetch(`https://api.esa.io/oauth/token`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: import.meta.env.VITE_LOCAL_CLIENT_ID,
        client_secret: import.meta.env.VITE_LOCAL_SECRET_CLIENT_ID,
        code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:8080/auth/callback",
      }),
    });
    const json = await data.json();
    setResJson(json);
  };

  useEffect(() => {
    void test();
  }, []);

  return (
    <Flex direction="column" gap="2">
      <Text>こちらCallbackになります</Text>
      <Text>code: {code}</Text>
      <Text>responseJson: {resJson}</Text>
    </Flex>
  );
}

import { Button, Link } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Center } from "@/components/Center";
import { getAuthorizePageUrl } from "@/lib/services/esa";

export default function Page(): ReactElement {
  return (
    <Center>
      <Link href={getAuthorizePageUrl()}>
        <Button>ログイン</Button>
      </Link>
    </Center>
  );
}

import { Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import Logo from "@/assets/esachievementLogo.svg";

export default function App(): ReactElement {
  return (
    <Flex justify="center" mt="12vh">
      <img alt="logo" src={Logo} />
    </Flex>
  );
}

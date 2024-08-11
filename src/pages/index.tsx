import { useStore } from "@nanostores/react";
import { Button, Flex } from "@radix-ui/themes";
import { useEffect, type ReactElement } from "react";
import Logo from "@/assets/esachievementLogo.svg";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";
import { $devMode } from "@/lib/stores/devMode";

export default function App(): ReactElement {
  const { fetchMembers } = useTeam();
  const { init, fetch } = useUnlockedAchievements(useTeam);
  const devMode = useStore($devMode);

  useEffect(() => {
    void init();
  }, []);

  const toggleDevProd = (): void => {
    if (devMode.isDevMode === "dev")
      $devMode.set({ ...devMode, isDevMode: "prod" });
    else $devMode.set({ ...devMode, isDevMode: "dev" });
  };

  const getAllData = async (): Promise<void> => {
    const members = await fetchMembers();
    const unlockedAchievements = (await fetch()) ?? [];
    $devMode.set({
      ...devMode,
      members,
      unlockedAchievements,
    });
  };

  return (
    <>
      <Flex direction="column">
        <Button onClick={toggleDevProd}>
          {devMode.isDevMode === "dev" ? "Switch to Prod" : "Switch to Dev"}
        </Button>
        <Button onClick={() => getAllData}>全データ取得</Button>
      </Flex>
      <Flex justify="center" mt="12vh">
        <img alt="logo" src={Logo} />
      </Flex>
    </>
  );
}

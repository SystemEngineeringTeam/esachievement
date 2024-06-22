/* eslint-disable no-console */
import { Button, Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useTeam } from "@/hooks/teams";

export default function Page(): ReactElement {
  // const { init, fetch, create, update, del } = useAchievements(useTeam);
  const { init, fetch, create, update, del } = useUnlockedAchievements(useTeam);

  return (
    <div style={{ padding: "0.3rem" }}>
      <Flex gap="5">
        <Button
          onClick={() => {
            void (async () => {
              await init();
              console.log("init!");
            })();
          }}
        >
          init
        </Button>
        <Button
          onClick={() => {
            void (async () => {
              const result = await fetch();
              console.log("fetch => ", result);
            })();
          }}
        >
          fetch
        </Button>
        <Button
          onClick={() => {
            void (async () => {
              const result = await create();
              console.log("created! => ", result);
            })();
          }}
        >
          create
        </Button>
        <Button
          onClick={() => {
            void (async () => {
              const result = await update([
                // {
                //   id: 1,
                //   name: "name",
                //   description: "description",
                //   createdAt: new Date(),
                //   updatedAt: new Date(),
                //   icon: "icon",
                //   tags: [
                //     {
                //       id: 1,
                //       name: "tag",
                //       color: "color",
                //     },
                //   ],
                // },
                {
                  achievementID: 1,
                  createdAt: new Date(),
                  memberEmail: "email",
                },
              ]);
              console.log("updated! => ", result);
            })();
          }}
        >
          update
        </Button>
        <Button
          onClick={() => {
            void (async () => {
              await del();
            })();
          }}
        >
          del
        </Button>
      </Flex>
    </div>
  );
}

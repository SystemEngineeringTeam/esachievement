import { Flex } from "@radix-ui/themes";
import { type ReactElement } from "react";
import { Info } from "@/components/achievements/Info";
import { RecentUnlockedCard } from "@/components/achievements/RecentUnlockedCard";

// export default function Page(): ReactElement {
//   const { id } = useParams("/achievements/:id");
//   const { fetch } = useAchievements(useTeam);
//   const swrAchievement = useSWRImmutable("achievements", fetch);

//   return match(swrAchievement)
//     .with(S.Loading, () => <p>Loading...</p>)
//     .with(S.Success, ({ data }) => (
//       <div>
//         {data.map((d) => {
//           if (d.id === Number(id)) {
//             return (
//               <div key={d.id}>
//                 <h1>name: {d.name}</h1>
//                 <p>id: {d.id}</p>
//                 <p>description: {d.description}</p>
//                 <p>icon: {d.icon}</p>
//                 <p>createdAt: {String(d.createdAt)}</p>
//                 <p>updatedAt: {String(d.updatedAt)}</p>
//                 <p>tags: {d.tags.join(", ")}</p>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     ))
//     .otherwise(({ data, error }) => (
//       <ErrorScreen error={handleSWRError(data, error)} />
//     ));
// }

export default function Page(): ReactElement {
  return (
    <Flex>
      <Info />
      <Flex overflow="scroll" width="100%">
        <RecentUnlockedCard />
      </Flex>
    </Flex>
  );
}

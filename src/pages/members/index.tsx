import { Table } from "@radix-ui/themes";
import { type ReactElement } from "react";
import SampleMember from "@/assets/members.json";
import SampleUnlockedAchievements from '@/assets/unlockedAchievements.json'
import { MemberCard } from "@/components/member/Card";
import { type Member } from "@/types/member";

export default function Page(): ReactElement {
  let point:number = 0;
  return (
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell> </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>名前</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ポイント</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          
        
        {SampleMember.members.map((e: any) => {
          const member: Member = e as Member;
          
          SampleUnlockedAchievements.unlockedAchievements.forEach((unlockedAchievement)=>{
            if(unlockedAchievement.memberEmail === member.email){
              point += 1;
            }
          })
          return <MemberCard key="index" member={member} point={point} />
        })}
        </Table.Body>
      </Table.Root>
  );
}

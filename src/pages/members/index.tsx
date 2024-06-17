import { type ReactElement } from "react";
import { MemberCard } from "@/components/member/Card";
import SampleMember from "@/assets/members.json";
import SampleUnlockedAchievements from '@/assets/unlockedAchievements.json'
import { Member } from "@/types/member";
//オブジェクト配列（ユーザ名とポイント）を作る。
export default function Page(): ReactElement {
  let point:number = 0;
  return (
    <>
      {SampleMember.members.map((e: any) => {
        const member: Member = e as Member;
        
        SampleUnlockedAchievements.unlockedAchievements.forEach((unlockedAchievement)=>{
          if(unlockedAchievement.userEmail === member.email){
            point += 1;
          }
        })
        return <MemberCard member={member} point={point}/>
      })}
    </>
  );
}

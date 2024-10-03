import { useStore } from "@nanostores/react";
import { atom } from "nanostores";
import { useEffect, useState, type ReactElement } from "react";
import styled from "styled-components";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ButtonStyled } from "@/components/Button";
import { ErrorScreen } from "@/components/ErrorScreen";
import { Expanded } from "@/components/Expanded";
import { UnlockableCard } from "@/components/achievements/UnlockableCard";
import { useAchievements } from "@/hooks/db/achievements";
import { useUnlockedAchievements } from "@/hooks/db/unlocked-achievements";
import { useMember } from "@/hooks/member";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { enableIgnoreResCacheTemporarily } from "@/lib/stores/teams";
import { handleSWRError } from "@/lib/utils/swr";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 140px;
  max-width: 1200px;
  margin-inline: auto;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 220px);
  overflow-y: auto;
`;

const $isUILocked = atom(false);
function arrayEquals<T>(a: T[], b: T[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

function SaveButton({
  currentMember,
  unlockedAchievementsBuff,
  onDone,
}: {
  currentMember: Awaited<
    ReturnType<ReturnType<typeof useMember>["fetchCurrentMember"]>
  >;
  unlockedAchievementsBuff: number[];
  onDone: () => void;
}): ReactElement {
  const { update } = useUnlockedAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);

  const swrUpdate = useSWR("updateU", async () => {
    $isUILocked.set(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    using _ = enableIgnoreResCacheTemporarily();
    const unlockedAchievements = await fetchUnlockedAchievements();

    const othersUnlockedAchievements = unlockedAchievements.filter(
      (u) => u.memberEmail !== currentMember.email,
    );

    const newMyUnlockedAchievements = unlockedAchievementsBuff.map((id) => ({
      memberEmail: currentMember.email,
      createdAt: new Date(),
      achievementID: id,
    }));

    // FIXME: データ更新の喪失の対策
    await update([...othersUnlockedAchievements, ...newMyUnlockedAchievements]);

    $isUILocked.set(false);
    onDone();
    return {};
  });

  return match(swrUpdate)
    .with(S.Loading, () => <ButtonStyled disabled>更新中...</ButtonStyled>)
    .with(S.Error, () => (
      <ButtonStyled
        onClick={() => {
          void swrUpdate.mutate();
        }}
      >
        更新する
      </ButtonStyled>
    ))
    .with(S.Success, () => <ButtonStyled disabled>更新完了！</ButtonStyled>)
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

export default function Page(): ReactElement {
  const { fetchCurrentMember } = useMember();
  const { fetch: fetchAchievements } = useAchievements(useTeam);
  const { fetch: fetchUnlockedAchievements } = useUnlockedAchievements(useTeam);

  const swrACU = useSWRImmutable("acu", async () => {
    const [achievements, currentMember, unlockedAchievements] =
      await Promise.all([
        fetchAchievements(),
        fetchCurrentMember(),
        fetchUnlockedAchievements(),
      ]);

    return {
      achievements,
      currentMember,
      myUnlockedAchievements: unlockedAchievements.filter(
        (u) => u.memberEmail === currentMember.email,
      ),
    };
  });

  const [unlockedAchievementsBuff, setUnlockedAchievementsBuff] = useState<
    number[]
  >([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const isUILocked = useStore($isUILocked);
  const isDirty = !arrayEquals(
    swrACU.data?.myUnlockedAchievements.map((u) => u.achievementID) ?? [],
    unlockedAchievementsBuff,
  );

  useEffect(() => {
    setUnlockedAchievementsBuff(
      swrACU.data?.myUnlockedAchievements.map((u) => u.achievementID) ?? [],
    );
  }, [swrACU.data]);

  return match(swrACU)
    .with(S.Loading, () => <Expanded>Loading...</Expanded>)
    .with(S.Success, ({ data: { achievements, currentMember }, mutate }) => (
      <Container>
        <CardContainer>
          {achievements.map((achievement) => {
            const isUnlocked = unlockedAchievementsBuff.some(
              (u) => u === achievement.id,
            );

            return (
              <UnlockableCard
                key={achievement.id}
                achievement={achievement}
                isDisabled={isUILocked}
                isUnlocked={isUnlocked}
                setIsUnlocked={(u) => {
                  setUnlockedAchievementsBuff((prev) => {
                    if (u) {
                      return [...prev, achievement.id];
                    }
                    return prev.filter((id) => id !== achievement.id);
                  });
                }}
              />
            );
          })}
        </CardContainer>

        {shouldUpdate ? (
          <SaveButton
            currentMember={currentMember}
            onDone={() => {
              setShouldUpdate(false);
              void mutate();
            }}
            unlockedAchievementsBuff={unlockedAchievementsBuff}
          />
        ) : (
          <ButtonStyled
            disabled={isUILocked || !isDirty}
            onClick={() => {
              setShouldUpdate(true);
            }}
          >
            更新
          </ButtonStyled>
        )}
      </Container>
    ))
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

/* eslint-disable react-refresh/only-export-components */

import { yupResolver } from "@hookform/resolvers/yup";
import { Icon } from "@iconify/react";
import {
  TextField,
  Flex,
  Box,
  Avatar,
  Text,
  IconButton,
  Popover,
} from "@radix-ui/themes";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { type CustomEmoji } from "emoji-picker-react/dist/config/customEmojiConfig";
import { useMemo, useState, type ReactElement } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import useSWRImmutable from "swr/immutable";
import { match } from "ts-pattern";
import { ErrorScreen } from "@/components/ErrorScreen";
import { useAchievements } from "@/hooks/db/achievements";
import { useTeam } from "@/hooks/teams";
import { S } from "@/lib/consts";
import { emojiUnified2url, SPECIAL_EMOJIS } from "@/lib/utils/emoji";
import { handleSWRError } from "@/lib/utils/swr";
import yup from "@/lib/yup-locate";
import { type Achievement, yAchievement } from "@/types/post-data/achievements";

const FormStyle = styled(Flex)`
  margin-top: 4rem;
  height: 90vh;
  color: #242d3c;
  justify-content: space-between;
`;

const AvatarContainer = styled.div`
  position: relative;
`;

const AvatarStyle = styled(Avatar)`
  box-shadow:
    8px 8px 16px #b5bec9,
    -8px -8px 16px #ffffff;
  box-sizing: content-box;
  border: 10px solid #e7e7e7;
`;

const SubmitButton = styled.input`
  font-weight: 600;
  font-family: sans-serif;
  font-size: 1rem;

  background-color: #e7e7e7;
  color: #00cdc2;
  border: 1px solid #00cdc2;

  width: fit-content;
  height: fit-content;

  padding: 1.2vh 1.8vw 1.2vh 1.8vw;
  margin-top: 4vh;
  margin-left: 0.3vw;

  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  z-index: 1;
  cursor: pointer;

  box-shadow:
    6px 6px 16px #b5bec9,
    -6px -6px 16px #ffffff;

  transform-origin: 50% 50%;
  transition: 300ms;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 120%;
    background-color: #00cdc2;

    top: 0;
    left: 0;
    z-index: -1;
    transform-origin: 100% 50%;
    transform: scaleX(0%);
    transition: transform 300ms;
  }

  &:hover {
    box-shadow: none;
    transform: scale(1.06);
    color: #ffffff;
    background-color: #00cdc2;
  }

  &:hover &::after {
    transform-origin: 0% 50%;
    transform: scaleX(100%);
    transform: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;
    color: #ffffff;
    background-color: #00cdc2;
    transform: scale(1.06);
    box-shadow: none;
  }
`;

const PlusButton = styled(IconButton)`
  cursor: pointer;
  position: absolute;
  top: 164px;
  left: 132px;
  background-color: #00cdc2;
  box-shadow: 6px 6px 16px #b5bec9;
  transform-origin: 50% 50%;
  transition: 200ms;
  &:hover {
    box-shadow: none;
    transform: scale(1.06);
  }
`;

const TextInput = styled(TextField.Root)<{ invalid: number }>`
  position: relative;
  background-color: #e7e7e7;
  margin-top: 0.6rem;
  box-shadow:
    3px 3px 8px inset #b5bec9,
    -6px -6px 16px inset #ffffff;
  input {
    margin-left: 0.4rem;
    color: #000;
  }
  border: 2px solid ${({ invalid }) => (invalid !== 0 ? "#e03b3b" : "unset")};
`;

const Red = styled.span`
  color: #e03b3b;
`;

const MessageContainer = styled(Flex)`
  justify-content: center;
  align-items: center;
  font-size: 0.8rem;
  gap: 10px;
`;

const ErrorMessageContainer = styled(MessageContainer)`
  color: #e03b3b;
`;

const SuccessMessageContainer = styled(MessageContainer)`
  color: #00cdc2;
`;

const ErrorMessage = styled(Text)`
  color: #e03b3b;
  font-size: 0.8rem;
`;

const yAchievementForm = yAchievement.concat(
  yup.object({
    id: yup.mixed().notRequired(),
    createdAt: yup.mixed().notRequired(),
    updatedAt: yup.mixed().notRequired(),
  }),
);

function Loaded({
  emojis,
}: {
  emojis: Awaited<
    ReturnType<ReturnType<typeof useTeam>["fetchEmojis"]>
  >["emojis"];
}): ReactElement {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState,
    setError,
    reset,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(yAchievementForm),
    defaultValues: {
      icon: emojiUnified2url("1f3c6"),
    },
  });
  const { errors, isSubmitting } = formState;
  const { fetch, update } = useAchievements(useTeam);

  const [isPopoverOpened, setPopoverOpened] = useState(false);
  const additionalEmojis = useMemo<CustomEmoji[]>(
    () =>
      emojis
        // メンバー絵文字を除外
        // ref: https://docs.esa.io/posts/230#%E3%83%A1%E3%83%B3%E3%83%90%E3%83%BC%E7%B5%B5%E6%96%87%E5%AD%97
        .filter(({ code }) => !code.startsWith("@"))
        .map(({ code, aliases, url }) => ({
          id: code,
          names: aliases,
          imgUrl: url,
        })),
    [emojis],
  );

  const onSubmit: SubmitHandler<
    yup.InferType<typeof yAchievementForm>
  > = async (data) => {
    try {
      const achievements = await fetch();
      if (achievements == null) {
        throw new Error(
          "`achievements` is null!  Maybe you forgot to call `init()`",
        );
      }

      const achievement: Achievement = {
        ...data,
        tags: data.tags.filter((tag) => tag !== ""),
        id: achievements.length + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await update([...achievements, achievement]);
      reset();
    } catch (e) {
      setError("root.submit", { message: String(e) });
      throw e;
    }
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit, (e) => {
        // eslint-disable-next-line no-console
        console.error("Form validation failed", e);
      })}
    >
      <FormStyle align="center" direction="column" justify="center">
        <AvatarContainer>
          <Popover.Root onOpenChange={setPopoverOpened} open={isPopoverOpened}>
            <Popover.Trigger>
              <PlusButton radius="full" size="4">
                <Icon icon="ion:add" width="30px" />
              </PlusButton>
            </Popover.Trigger>
            <Popover.Content>
              <EmojiPicker
                customEmojis={[...additionalEmojis, ...SPECIAL_EMOJIS]}
                emojiStyle={EmojiStyle.TWITTER}
                onEmojiClick={(emoji) => {
                  setValue(
                    "icon",
                    emoji.isCustom
                      ? emoji.imageUrl
                      : emojiUnified2url(emoji.unified),
                  );
                  setPopoverOpened(false);
                }}
              />
            </Popover.Content>
          </Popover.Root>
          <AvatarStyle
            fallback="A"
            mb="4vh"
            mt="4vh"
            size="9"
            src={getValues("icon")}
          />
        </AvatarContainer>
        <Flex align="center" direction="column" justify="between">
          <Box mb="4vh" width="500px">
            <Text ml="0.4rem" weight="medium">
              実績名 <Red>*</Red>
            </Text>
            <TextInput
              disabled={isSubmitting}
              invalid={Number(errors.name != null)}
              placeholder="カカポ"
              radius="full"
              size="3"
              type="text"
              {...register("name")}
            />
            <ErrorMessage>{errors.name?.message ?? ""}</ErrorMessage>
          </Box>
          <Flex justify="between" width="500px">
            <Box mb="4vh">
              <Text ml="0.4rem" weight="medium">
                実績につけるタグ
              </Text>
              <Flex align="stretch" gap="8" justify="between">
                <TextInput
                  disabled={isSubmitting}
                  invalid={Number(errors.tags != null)}
                  placeholder="#party parrot"
                  radius="full"
                  size="3"
                  type="text"
                  {...register("tags.0")}
                />
                <TextInput
                  disabled={isSubmitting}
                  invalid={Number(errors.tags != null)}
                  placeholder="#love2"
                  radius="full"
                  size="3"
                  type="text"
                  {...register("tags.1")}
                />
              </Flex>
              <ErrorMessage>{errors.tags?.message ?? ""}</ErrorMessage>
            </Box>
          </Flex>
          <Box mb="3vh" width="500px">
            <Text ml="0.4rem" weight="medium">
              実績の説明 <Red>*</Red>
            </Text>
            <TextInput
              disabled={isSubmitting}
              invalid={Number(errors.description != null)}
              radius="full"
              size="3"
              type="text"
              {...register("description")}
            />
            <ErrorMessage>{errors?.description?.message ?? ""}</ErrorMessage>
          </Box>
        </Flex>

        <Box mb="auto">
          <SubmitButton
            disabled={isSubmitting}
            type="submit"
            value="実績を追加する"
          />
        </Box>
        {match(formState)
          .with({ isDirty: false }, () => undefined)
          .with({ isSubmitting: true }, () => (
            <MessageContainer>
              <Icon height="1em" icon="svg-spinners:ring-resize" />
              <p>実績を追加中...</p>
            </MessageContainer>
          ))
          .with({ isSubmitSuccessful: true }, () => (
            <SuccessMessageContainer>
              <Icon height="1em" icon="mdi:check" />
              <p>実績は正常に追加されました</p>
            </SuccessMessageContainer>
          ))
          .when(
            () => errors.root?.submit != null,
            () => (
              <ErrorMessageContainer>
                <Icon height="1em" icon="mdi:alert" />
                <ErrorMessage>
                  追加中にエラーが発生しました:{" "}
                  {errors.root?.submit.message ?? ""}
                </ErrorMessage>
              </ErrorMessageContainer>
            ),
          )
          .otherwise(() => undefined)}
      </FormStyle>
    </form>
  );
}

export default function Page(): ReactElement {
  const { fetchEmojis } = useTeam();
  const swrEmojis = useSWRImmutable("emojis", fetchEmojis);

  return match(swrEmojis)
    .with(S.Loading, () => (
      <Flex gap="10px">
        <Icon height="1em" icon="svg-spinners:ring-resize" />
        <p>カスタム絵文字を取得中...</p>
      </Flex>
    ))
    .with(S.Success, ({ data: { emojis } }) => <Loaded emojis={emojis} />)
    .otherwise(({ data, error }) => (
      <ErrorScreen error={handleSWRError(data, error)} />
    ));
}

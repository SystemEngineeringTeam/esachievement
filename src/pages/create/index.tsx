/* eslint-disable react-refresh/only-export-components */

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
import { useState, type ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { type Achievement } from "@/types/post-data/achievements";

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

const Button1 = styled(Box)`
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
`;

const PlusButton = styled(IconButton)`
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

const ImputStyle = styled(TextField.Root)`
  position: relative;
  background-color: #e7e7e7;
  margin-top: 0.6rem;
  box-shadow:
    3px 3px 8px inset #b5bec9,
    -6px -6px 16px inset #ffffff;
  input {
    margin-left: 0.4rem;
    color: #737a89;
  }
`;

export default function create(): ReactElement {
  const [selectIcon, setSelectIcon] = useState(
    "https://api.iconify.design/twemoji:trophy.svg",
  );

  const { register, handleSubmit, setValue } = useForm<Achievement>({
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<Achievement> = (data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  };

  const iconUrl = [
    "https://api.iconify.design/twemoji:trophy.svg",
    "https://api.iconify.design/twemoji:meat-on-bone.svg",
    "https://api.iconify.design/twemoji:horse-racing-medium-skin-tone.svg",
    "https://api.iconify.design/twemoji:steaming-bowl.svg",
    "https://api.iconify.design/twemoji:shopping-cart.svg",
    "https://api.iconify.design/twemoji:page-facing-up.svg",
    "https://api.iconify.design/twemoji:laptop.svg",
    "https://api.iconify.design/twemoji:zombie.svg",
    "https://api.iconify.design/twemoji:face-with-symbols-on-mouth.svg",
    "https://api.iconify.design/twemoji:broken-heart.svg",
    "https://api.iconify.design/twemoji:fire.svg",
    "https://api.iconify.design/twemoji:beer-mug.svg",
    "https://api.iconify.design/twemoji:beetle.svg",
    "https://api.iconify.design/twemoji:bathtub.svg",
    "https://api.iconify.design/twemoji:broccoli.svg",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgUqLcDsoa_vMqHK_IPFR4GoMT9RYnH6gtzw9nqHl2AfJeQI7Bm6vd2LphkvWznofSU0yXGcFCWEmO1owcCDJKqaijH4sDyK6r7gwjHUoqD-lVYxHPO9m6khg559gSY2FVv9qia_dHQPxbQ/s800/school_tani_otosu_boy.png",
    "https://qr.paps.jp/8o3Og",
    "https://i.imgur.com/5TaVIlf.gif",
    "https://qr.paps.jp/fblo0",
    "https://i.gifer.com/9ZNS.gif",
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormStyle align="center" direction="column" justify="center">
        <AvatarContainer>
          <Popover.Root>
            <Popover.Trigger>
              <PlusButton radius="full" size="4">
                <Icon icon="ion:add" width="30px" />
              </PlusButton>
            </Popover.Trigger>
            <Popover.Content maxWidth="300px" size="1">
              <Text as="p" size="1" trim="both">
                {iconUrl.map((url, index) => (
                  <IconButton
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    m="2"
                    onClick={() => {
                      setSelectIcon(url);
                      setValue("icon", url);
                    }}
                    variant="ghost"
                    {...register("icon")}
                    size="4"
                  >
                    <Avatar fallback="A" size="4" src={url} />
                  </IconButton>
                ))}
              </Text>
            </Popover.Content>
          </Popover.Root>
          <AvatarStyle
            fallback="A"
            mb="4vh"
            mt="4vh"
            size="9"
            src={selectIcon}
          />
        </AvatarContainer>
        <Box mb="4vh" width="50vw">
          <Text ml="0.4rem" weight="medium">
            実績名
          </Text>
          <ImputStyle
            placeholder="カカポ"
            radius="full"
            size="3"
            type="text"
            {...register("name")}
          />
        </Box>
        <Flex justify="between" width="50vw">
          <Box mb="4vh" width="24vw">
            <Text ml="0.4rem" weight="medium">
              実績につけるタグ
            </Text>
            <ImputStyle
              placeholder="#party parrot"
              radius="full"
              size="3"
              type="text"
              {...register(`tags.${0}.name`)}
            />
          </Box>
          <Box mb="4vh" width="24vw">
            <Text ml="0.4rem" weight="medium">
              実績につけるタグ
            </Text>
            <ImputStyle
              placeholder="#love2"
              radius="full"
              size="3"
              type="text"
              {...register(`tags.${1}.name`)}
            />
          </Box>
        </Flex>
        <Box mb="3vh" width="50vw">
          <Text ml="0.4rem" weight="medium">
            実績の詳細
          </Text>
          <ImputStyle
            placeholder="lkjhgvb"
            radius="full"
            size="3"
            type="text"
            {...register("description")}
          />
        </Box>

        <Box mb="auto">
          <Button1>
            <input type="submit" value="実績を追加する" />
          </Button1>
        </Box>
      </FormStyle>
    </form>
  );
}

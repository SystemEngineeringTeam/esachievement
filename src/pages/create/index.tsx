import { Icon } from "@iconify/react";
import {
  TextField,
  Flex,
  Box,
  Avatar,
  Text,
  Button,
  IconButton,
  Popover,
} from "@radix-ui/themes";
import { useState, type ReactElement } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { type Achievement } from "@/types/achievement";

export default function create(): ReactElement {
  const [selectIcon, setSelectIcon] = useState("");

  const { register, handleSubmit, setValue } = useForm<Achievement>({
    mode: "onSubmit",
  });
  const onSubmit: SubmitHandler<Achievement> = (data) => {
    console.log(data);
  };

  const FormStyle = styled(Flex)`
    overflow: scroll;
    height: calc(100vh - 4.8rem);
  `;

  const AvatarContainer = styled.div`
    position: relative;
  `;

  const PlusButton = styled(IconButton)`
    position: absolute;
    top: 152px;
    left: 112px;
  `;

  const iconUrl = [
    "https://qr.paps.jp/8o3Og",
    "https://i.imgur.com/5TaVIlf.gif",
    "https://qr.paps.jp/fblo0",
    "https://i.gifer.com/9ZNS.gif",
  ];

  return (
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormStyle align="center" direction="column">
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
                    key={index}
                    mr="3"
                    onClick={() => {
                      setSelectIcon(url);
                      setValue("icon", url);
                    }}
                    {...register("icon")}
                    radius="full"
                    size="4"
                  >
                    <Avatar fallback="A" size="4" src={url} />
                  </IconButton>
                ))}
              </Text>
            </Popover.Content>
          </Popover.Root>
          <Avatar
            fallback="A"
            mb="5vh"
            mt="5vh"
            radius="full"
            size="9"
            src={selectIcon}
          />
        </AvatarContainer>
        <Box mb="5vh" width="50vw">
          <Text>Achievement Name</Text>
          <TextField.Root
            placeholder="カカポ"
            size="3"
            type="text"
            {...register("name")}
          >
            <TextField.Slot px="1" side="right" />
          </TextField.Root>
        </Box>
        <Box mb="5vh" width="50vw">
          <Text>Achievement First Tag Name</Text>
          <TextField.Root
            placeholder="#party parrot"
            size="3"
            type="text"
            {...register(`tags.${0}.name`)}
          >
            <TextField.Slot px="1" side="right" />
          </TextField.Root>
        </Box>
        <Box mb="5vh" width="50vw">
          <Text>Achievement Second Tag Name</Text>
          <TextField.Root
            placeholder="#love2"
            size="3"
            type="text"
            {...register(`tags.${1}.name`)}
          >
            <TextField.Slot px="1" side="right" />
          </TextField.Root>
        </Box>
        <Box mb="5vh" width="50vw">
          <Text>Achievement Detail</Text>
          <TextField.Root
            placeholder="lkjhgvb"
            size="3"
            type="text"
            {...register("description")}
          >
            <TextField.Slot px="1" side="right" />
          </TextField.Root>
        </Box>
        <Box mb="20vh">
          <Button>
            <input type="submit" value="submit" />
          </Button>
        </Box>
      </FormStyle>
    </form>
  );
}

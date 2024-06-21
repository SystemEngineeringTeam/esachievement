import { TextField, Text, Box, Flex, Button, Avatar } from "@radix-ui/themes";
import { type ReactElement } from "react";
import styled from "styled-components";

const TextFieldRootStyle = styled(TextField.Root)`
  height: 10rem;
`;

const Form = styled(Flex)`
  overflow: scroll;
  height: calc(100vh - 4.8rem);
`;

export default function create(): ReactElement {
  return (
    <Form align="center" direction="column">
      <Avatar
        fallback="A"
        mb="5vh"
        mt="5vh"
        radius="full"
        size="9"
        src="https://qiita-user-contents.imgix.net/https%3A%2F%2Fqiita-image-store.s3.ap-northeast-1.amazonaws.com%2F0%2F401312%2F9a7ef74a-33fd-5414-aa41-76889da2d665.gif?ixlib=rb-4.0.0&auto=format&gif-q=60&q=75&s=e7b5fd4deefd37c9cbd72fb4659ff39f"
      />
      <Box mb="5vh" width="50vw">
        <Text>Achievement Name</Text>
        <TextField.Root placeholder="カカポ" size="3">
          <TextField.Slot px="1" side="right" />
        </TextField.Root>
      </Box>
      <Box mb="5vh" width="50vw">
        <Text>Achievement First Tag Name</Text>
        <TextField.Root placeholder="#party parrot" size="3">
          <TextField.Slot px="1" side="right" />
        </TextField.Root>
      </Box>
      <Box mb="5vh" width="50vw">
        <Text>Achievement Second Tag Name</Text>
        <TextField.Root placeholder="#love2" size="3">
          <TextField.Slot px="1" side="right" />
        </TextField.Root>
      </Box>
      <Box mb="5vh" width="50vw">
        <Text>Achievement Detail</Text>
        <TextFieldRootStyle placeholder="lkjhgvb" size="3">
          <TextField.Slot px="1" side="right" />
        </TextFieldRootStyle>
      </Box>
      <Box mb="20vh">
        <Button>View users</Button>
      </Box>
    </Form>
  );
}

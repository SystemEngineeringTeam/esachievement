import { type ReactElement } from "react";
import { useParams } from "@/router";

export default function Page(): ReactElement {
  // const { params } = useMatch('/posts/$id')
  const { id } = useParams("/achievements/:id");

  return (
    <>
      <h1>{id}</h1>
      {/* <h1>{ match }</h1> */}
    </>
  );
}

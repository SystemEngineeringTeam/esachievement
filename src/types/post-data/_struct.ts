import { object, string, mixed, type InferType } from "yup";
import { type Override, type Nullable } from "@/types/utils";

export const yPostData = object().shape({
  _name: string().oneOf(["esachievement"]).required(),
  _version: mixed().oneOf(["1"]).required(),
  data: mixed().optional(),
});

export type PostData<T> = Override<
  InferType<typeof yPostData>,
  { data: Nullable<T> }
>;

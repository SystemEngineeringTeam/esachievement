import { type InferType } from "yup";
import { DB_VERSION } from "@/lib/consts";
import yup from "@/lib/yup-locate";
import { type Override, type Nullable } from "@/types/utils";

export const yPostData = yup.object().shape({
  _name: yup.string().oneOf(["esachievement"]).required(),
  _version: yup
    .mixed()
    .oneOf([DB_VERSION], "バージョンが一致しません")
    .required(),
  data: yup.mixed().optional(),
});

export type PostData<T> = Override<
  InferType<typeof yPostData>,
  { data: Nullable<T> }
>;

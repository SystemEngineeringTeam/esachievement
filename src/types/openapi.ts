import { type OkStatus } from "openapi-typescript-helpers";
import { type paths } from "@/lib/services/esa.gen";

export type InferResponseType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
  Status extends OkStatus = 200,
> = paths[Path][Method] extends {
  responses: {
    [K in Status]: { content: { "application/json": infer R } };
  };
}
  ? R
  : never;

export type InferRequestBodyType<
  Path extends keyof paths,
  Method extends keyof paths[Path],
> = paths[Path][Method] extends {
  requestBody: { content: { "application/json": infer R } };
}
  ? R
  : never;

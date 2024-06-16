// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path =
  | `/`
  | `/achievements`
  | `/achievements/:id`
  | `/auth/callback`
  | `/auth/login`
  | `/create`
  | `/hayato`
  | `/members`
  | `/members/:id`
  | `/ranking`
  | `/unlocked`;

export type Params = {
  "/achievements/:id": { id: string };
  "/members/:id": { id: string };
};

export type ModalPath = never;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();

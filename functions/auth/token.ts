import type { PagesFunction } from "@cloudflare/workers-types";
import { string, object } from "yup";
import { Env } from "../__lib/consts.js";

export const onRequestOptions: PagesFunction<Env> = async ({ env }) => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": new URL(env.ESA_APP_REDIRECT_URI).origin,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Max-Age": "86400",
    },
  });
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed.", { status: 405 });
  }

  const requestAccessTokenSchema = object().shape({
    code: string(),
  });

  let code: string;
  try {
    code = (await requestAccessTokenSchema.validate(await request.json())).code;
  } catch (err) {
    return new Response(err, { status: 400 });
  }

  const res = await fetch("https://api.esa.io/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: env.ESA_APP_CLIENT_ID,
      client_secret: env.ESA_APP_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
      redirect_uri: env.ESA_APP_REDIRECT_URI,
    }),
  });

  if (!res.ok) {
    return new Response("Failed to request access token!", {
      status: 500,
    });
  }

  return new Response(await res.text(), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

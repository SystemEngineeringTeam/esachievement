import { PagesFunction } from "@cloudflare/workers-types";
import { Env, getDefaultCors } from "../__lib/consts.js";

export const onRequestOptions: PagesFunction<Env> = async ({ env }) => {
  return getDefaultCors(env.ESA_APP_REDIRECT_URI);
};

export const onRequest: PagesFunction<Env> = async ({ request, env }) => {
  const req = request.clone();
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);

  console.log(url);

  const baseUrl = "https://api.esa.io/v1";
  const newUrl = new URL(
    baseUrl + url.pathname.replace(/^\/api/, "") + "?" + params.toString(),
  );

  const method = req.method;
  let body: string | null = null;

  if (method !== "GET" && method !== "HEAD") {
    body = await req.text();
  }

  const response = await fetch(newUrl.toString(), {
    method,
    headers: req.headers,
    body: body ?? undefined,
    redirect: "follow",
  });

  console.log(response.body);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
};

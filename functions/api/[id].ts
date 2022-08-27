interface Env {
  PORTAL: KVNamespace;
}

interface Data {}

type Context = EventContext<Env, "id", Data>;

export async function onRequestGet({ env, params }: Context) {
  let id = params.id as string;
  let value = await env.PORTAL.get(id);
  return new Response(value);
}

export async function onRequestPost({ request, env, params }: Context) {
  let url = new URL(request.url);
  let id = params.id as string;
  await env.PORTAL.put(id, url.searchParams.get("value"));
  return new Response("ok");
}

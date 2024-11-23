import { getPrompt } from "./src/controllers/prompts.ts";

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "GET" && path === "/") {
    return new Response("Application is running...");
  } else if (req.method === "GET" && path.startsWith("/api/prompts/")) {
    // Handle individual prompts fetch.
    return await getPrompt(req);
  }

  return new Response("Not found", { status: 404 });
});

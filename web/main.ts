import { serve } from "./deps.ts";
import { renderFileToString } from "./deps.ts";

const PORT = 8000;

const API_URL = Deno.env.get("API_URL");

if (!API_URL) {
  console.log("API URL MISSING!");
  Deno.exit(1)
}


const handler = async (req): Promise<Response> => {
  const url = new URL(req.url);

  if (url.pathname === "/healthz") {
    try {
      let res = await fetch(`${API_URL}/healthz`);
      return new Response("", {status: res.status})
    }
    catch (err) {
      console.log(err)
    }
  }
  else if (url.pathname === '/') {
    let res = await fetch(`${API_URL}/hello`);
    let msg = await res.json()
    const myTemplate = await renderFileToString("index.ejs", {
      message: msg,
    });
    return new Response(myTemplate, {
      status: 200,
      headers: {
        "Content-Type": "text/html",
      },
    });
  }
  return new Response("", {status: 403})
};

console.log(`HTTP webserver running. Access it at: http://localhost:${PORT}/`);
await serve(handler, { PORT });

import http from "node:http";
import { serverStatic } from "./utils/serverStatic.js";
import { handleGet, handlePost, handleNews } from "./handlers/routeHandlers.js";

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/api" && req.method === "GET") {
    return await handleGet(req, res, __dirname);
  }

  if (url.pathname === "/api" && req.method === "POST") {
    return await handlePost(req, res);
  }

  if (url.pathname === "/api/news" && req.method === "GET") {
    return await handleNews(req, res);
  }

  if (!url.pathname.startsWith("/api")) {
    return await serverStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Server is runing on: http://localhost:${PORT}`);
});

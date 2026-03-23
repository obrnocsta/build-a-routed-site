import http from "node:http";
import { serverStatic } from "./utils/serverStatic.js";
import { handleGet, handlePost } from "./handlers/routeHandlers.js";

const PORT = 8000;

const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/api") {
    if (req.method === "GET") {
      return await handleGet(req, res);
    }
    if (req.method === "POST") {
      return await handlePost(req, res);
    }
  } else {
    return await serverStatic(req, res, __dirname);
  }
});

server.listen(PORT, () => {
  console.log(`Server is runing on: http://localhost:${PORT}`);
});

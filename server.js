import http from "node:http";
import { serverStatic } from "./utils/serverStatic.js";
import { getData } from "./utils/getData.js";
import { handleGet, handlePost } from "./handlers/routeHandlers.js";

const PORT = 8000;

const __dirname = import.meta.dirname;
const data = await getData();

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/api" && req.method === "GET") {
    handleGet(res, data);
    return;
  } else if (url.pathname === "/api" && req.method === "POST") {
    await handlePost(req, res);
    return;
  } else {
    await serverStatic(req, res, __dirname);
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server is runing on: http://localhost:${PORT}`);
});

import path from "node:path";
import fs from "node:fs/promises";
import { sendResponse } from "./sendResponse.js";
import { getContentType } from "./getContentType.js";

export const serverStatic = async (req, res, dirname) => {
  const dirPath = path.join(dirname, "public");
  const filePath = path.join(dirPath, req.url === "/" ? "index.html" : req.url);
  try {
    const content = await fs.readFile(filePath);
    const extname = path.extname(filePath);
    const type = getContentType(extname);
    sendResponse(res, 200, type, content);
  } catch (error) {
    if (error.code === "ENOENT") {
      const content = await fs.readFile(path.join(dirPath, "404.html"));
      sendResponse(res, 404, "text/html", content);
    } else {
      sendResponse(
        res,
        500,
        "text/html",
        `<html><h1>Server Error: ${error.code}</h1></html>`,
      );
    }
  }
};

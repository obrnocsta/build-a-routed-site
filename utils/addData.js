import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

export const addData = async (data, incomingData) => {
  try {
    incomingData["uuid"] = randomUUID();
    data.push(incomingData);
    const filePath = path.join("data", "data.json");
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    throw new Error(error);
  }
};

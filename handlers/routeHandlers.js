import { sendResponse } from "../utils/sendResponse.js";
import { getIncomingData } from "../utils/getIncomingData.js";

// handleGet
export const handleGet = (res, data) => {
  sendResponse(res, 200, "application/json", JSON.stringify(data));
};

// handlePost
export const handlePost = async (req, res) => {
  const data = await getIncomingData(req);
  console.log(data);
  res.end();
};

// Adding POST functionality
// - collect the incoming data
// - parse it
// - sanitize it
// - get our existing data
// - add the new data to the existing data
// - write the completed data to the JSON file

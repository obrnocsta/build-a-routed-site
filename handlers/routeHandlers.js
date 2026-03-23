import { sendResponse } from "../utils/sendResponse.js";
import { getIncomingData } from "../utils/getIncomingData.js";
import { addData } from "../utils/addData.js";
import { getData } from "../utils/getData.js";

const data = await getData();
// handleGet
export const handleGet = async (req, res) => {
  sendResponse(res, 200, "application/json", JSON.stringify(data));
};

// handlePost
export const handlePost = async (req, res) => {
  try {
    const incomingData = await getIncomingData(req);
    await addData(data, incomingData);
    sendResponse(res, 201, "application/json", JSON.stringify(incomingData));
  } catch (error) {
    sendResponse(
      res,
      400,
      "application/json",
      JSON.stringify({ error: error }),
    );
  }
};

// Adding POST functionality
// - collect the incoming data
// - parse it
// - sanitize it
// - get our existing data
// - add the new data to the existing data
// - write the completed data to the JSON file

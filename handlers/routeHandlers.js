import { sendResponse } from "../utils/sendResponse.js";
import { getIncomingData } from "../utils/getIncomingData.js";
import { addData } from "../utils/addData.js";
import { getData } from "../utils/getData.js";
import { sanitizeData } from "../utils/sanitizeData.js";
import { event } from "../events/events.js";
import { stories } from "../data/stories.js";

const data = await getData();
// handleGet
export const handleGet = async (req, res) => {
  sendResponse(res, 200, "application/json", JSON.stringify(data));
};

// handlePost
export const handlePost = async (req, res) => {
  try {
    const incomingData = await getIncomingData(req);
    const sanitizedData = sanitizeData(incomingData);
    await addData(data, sanitizedData);
    event.emit("sighting-added", sanitizedData);
    sendResponse(res, 201, "application/json", JSON.stringify(sanitizedData));
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

export const handleNews = async (req, res) => {
  res.statusCode = 200;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length);

    res.write(
      `data: ${JSON.stringify({
        event: "news-update",
        story: stories[randomIndex],
      })}\n\n`,
    );
  }, 3000);
};

// The object should include:
// - an event property with a descriptive name.
// - a story chosen at random from the stories array.

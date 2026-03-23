export const getIncomingData = async (req) => {
  let body = "";

  for await (const chunk of req) {
    body += chunk;
  }

  try {
    return JSON.parse(body);
  } catch (error) {
    throw new Error(`Invalid incoming data: ${error}`);
  }
};

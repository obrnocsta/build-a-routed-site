export const sendResponse = (res, code, type, content) => {
  res.statusCode = code;
  res.setHeader("Content-Type", type);
  res.end(content);
};

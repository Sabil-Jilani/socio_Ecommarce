module.exports = (err, req, res, next) => {
  console.log("error has played" + err);
  let statusCode = res.statusCode === 200 ? 500 : statusCode;
  let message = err.message;
  if (err.kind === "ObjectId" && err.name === "CastError") {
    (message = "Resource not found"), (statusCode = 404);
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "!!!!!!" : err.stack,
  });
};

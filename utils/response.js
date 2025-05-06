exports.success = (res, data = {}, message = "Success", statusCode = 200) => {
  return res.status(statusCode).json({ success: true, message, data });
};

exports.error = (res, error = null, statusCode = 500) => {
  if (process.env.NODE_ENV !== "production" && error) {
    console.error(error);
  }

  // const errorMessage = typeof message === "string" ? message : error.message;
  return res.status(statusCode).json({ success: false, error });
};

exports.success = (res, data = {}, message = "Success", statusCode = 200) => {
  data = Array.isArray(data) ? data : [data];
  const response = { success: true, data, message, statusCode };
  console.log(response);
  return res.status(statusCode).json(response);
};

exports.error = (res, error = null, statusCode = 500) => {
  if (process.env.NODE_ENV !== "production" && error) {
    console.error(error);
  }

  // const errorMessage = typeof message === "string" ? message : error.message;
  return res.status(statusCode).json({ success: false, error });
};

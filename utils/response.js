exports.success = (
  req,
  res,
  data = [],
  message = "Success",
  statusCode = 200,
  meta = {}
) => {
  const { page = 1, page_size = 10, total = 0 } = meta;

  const currentPage = parseInt(page);
  const pageSize = parseInt(page_size);
  const totalPages = Math.ceil(total / pageSize);

  const baseUrl = `${req.protocol}://${req.get("host")}${req.path}`;
  const query = new URLSearchParams(req.query);

  const buildUrl = (pageNum) => {
    query.set("page", pageNum);
    return `${baseUrl}?${query.toString()}`;
  };

  const next = currentPage < totalPages ? buildUrl(currentPage + 1) : null;
  const prev = currentPage > 1 ? buildUrl(currentPage - 1) : null;

  data = Array.isArray(data) ? data : [data];
  const response = {
    success: true,
    message,
    statusCode,
    data,
    next,
    prev,
    page: currentPage,
    page_size: pageSize,
    total,
  };

  return res.status(statusCode).json(response);
};

exports.error = (res, error = null, statusCode = 500) => {
  if (process.env.NODE_ENV !== "production" && error) {
    console.error(error);
  }

  // const errorMessage = typeof message === "string" ? message : error.message;
  return res.status(statusCode).json({ success: false, error });
};

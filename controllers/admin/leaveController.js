const Leave = require("../../models/Leave");
const { success, error } = require("../../utils/response");

exports.getAllLeaves = (req, res) => {
  const { status, employeeId, page = 1, page_size = 10 } = req.query;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return error(
      res,
      "Invalid status. Valid values are: 'pending', 'approved', 'declined'.",
      400
    );
  }

  const filters = { status, employeeId, page, page_size };

  Leave.countAll(filters, (err, countResult) => {
    if (err) return error(res, err);

    Leave.findAll(filters, (err, result) => {
      if (err) return error(res, err);
      const total = countResult[0]?.count || 0;

      return success(req, res, result, "Leaves retrieved successfully", 200, {
        page,
        page_size,
        total,
      });
    });
  });
};

exports.getLeaveById = (req, res) => {
  const id = req.params.id;
  Leave.findById(id, (err, rows) => {
    if (err) return error(res, err);
    if (rows.length === 0) return error(res, "Leave not found", 404);

    return success(req, res, rows[0], "Leave retrieved successfully");
  });
};

exports.updateLeaveStatus = (req, res) => {
  const id = req.params.id;
  const { status, remark } = req.body;

  Leave.updateStatus(id, status, remark, (err) => {
    if (err) return error(res, err);
    return success(req, res, {}, "Leave status updated successfully");
  });
};

exports.deleteLeave = (req, res) => {
  const id = req.params.id;
  Leave.delete(id, (err) => {
    if (err) return error(res, err);
    return success(req, res, {}, "Leave deleted");
  });
};

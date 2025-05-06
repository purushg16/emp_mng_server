const Leave = require("../../models/Leave");
const { success, error } = require("../../utils/response");

exports.getAllLeaves = (req, res) => {
  const status = req.query.status;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return error(
      res,
      "Invalid status. Valid values are: 'pending', 'approved', 'declined'.",
      400
    );
  }

  Leave.findAll(status, (err, leaves) => {
    if (err) return error(res, err);

    if (!leaves.length) {
      return error(res, "No leaves found", 404);
    }

    return success(res, leaves, "Leaves retrieved successfully");
  });
};

exports.getLeaveById = (req, res) => {
  const id = req.params.id;
  Leave.findById(id, (err, rows) => {
    if (err) return error(res, err);
    if (rows.length === 0) return error(res, "Leave not found", 404);

    return success(res, rows[0], "Leave retrieved successfully");
  });
};

exports.updateLeaveStatus = (req, res) => {
  const id = req.params.id;
  const { status, remark } = req.body;

  Leave.updateStatus(id, status, remark, (err) => {
    if (err) return error(res, err);
    return success(res, {}, "Leave status updated successfully");
  });
};

exports.deleteLeave = (req, res) => {
  const id = req.params.id;
  Leave.delete(id, (err) => {
    if (err) return error(res, err);
    return success(res, {}, "Leave deleted");
  });
};

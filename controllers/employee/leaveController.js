const Leave = require("../../models/Leave");
const { error, success } = require("../../utils/response");

exports.getEmployeeLeaves = (req, res) => {
  const employeeId = req.userId;
  const status = req.query.status;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return error(
      res,
      "Valid values are: 'pending', 'approved', 'declined'.",
      400
    );
  }

  Leave.findByEmployeeId(employeeId, status, (err, leaves) => {
    if (err) return error(res, err);
    if (!leaves.length) return error(res, "No leaves found", 404);

    return success(res, leaves, "Leaves retrieved successfully");
  });
};

exports.getLeaveById = (req, res) => {
  const { id } = req.params;
  const employeeId = req.userId;

  Leave.findById(id, (err, leave) => {
    if (err) return error(res, err);
    if (!leave || leave.employeeId !== employeeId)
      return err(res, "Leave not found", 404);

    return success(res, leave, "Leave retrieved successfully");
  });
};

exports.createLeave = async (req, res) => {
  const leaveReq = {
    employeeId: req.userId,
    leaveTypeId: req.body.leaveTypeId,
    from: req.body.from,
    to: req.body.to,
    desc: req.body.desc,
  };

  // Preventing overlapping leave applications
  Leave.findOverlapping(
    req.userId,
    leaveReq.from,
    leaveReq.to,
    (err, result) => {
      if (err) return error(res, err);
      if (result.length > 0) {
        return error(res, "Leave dates overlap with existing leaves", 400);
      }

      // proceed with creation
      Leave.create(leaveReq, (err2, _result1) => {
        if (err2) return error(res, err2);
        return success(res, {}, "Leave applied successfully", 201);
      });
    }
  );
};

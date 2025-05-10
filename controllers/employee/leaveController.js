const Leave = require("../../models/Leave");
const LeaveType = require("../../models/LeaveType");
const { error, success } = require("../../utils/response");

exports.getAllLeaveTypes = (req, res) => {
  LeaveType.findAll((err, rows) => {
    if (err) return error(res, err);

    return success(req, res, rows, "Leave types retrieved successfully");
  });
};

exports.getEmployeeLeaves = (req, res) => {
  const { status, employeeId, page_size } = req.query;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return error(
      res,
      "Valid values are: 'pending', 'approved', 'declined'.",
      400
    );
  }

  Leave.countAll({ status, employeeId }, (err, result) => {
    if (err) return error(res, err);
    const total = result[0].count;

    if (total === 0) {
      return success(req, res, {}, "No leaves found", 200);
    }

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(page_size) || 10;

    Leave.findAll(
      { status, employeeId, page, page_size: pageSize },
      (err2, leaves) => {
        if (err2) return error(res, err2);

        return success(req, res, leaves, "Leaves retrieved successfully", 200, {
          page,
          page_size,
          total,
        });
      }
    );
  });
};

exports.getLeaveById = (req, res) => {
  const { id } = req.params;
  const employeeId = req.userId;

  Leave.findById(id, (err, leave) => {
    if (err) return error(res, err);
    if (!leave || leave.employeeId !== employeeId)
      return err(res, "Leave not found", 404);

    return success(req, res, leave, "Leave retrieved successfully");
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
        return success(req, res, {}, "Leave applied successfully", 201);
      });
    }
  );
};

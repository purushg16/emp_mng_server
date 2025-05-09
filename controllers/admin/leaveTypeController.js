const LeaveType = require("../../models/LeaveType");
const { error, success } = require("../../utils/response");

exports.createLeaveType = (req, res) => {
  const { type, description } = req.body;

  LeaveType.create({ type, description }, (err) => {
    if (err) return error(res, err);
    return success(req, res, {}, "Leave type created successfully", 201);
  });
};

exports.getAllLeaveTypes = (req, res) => {
  LeaveType.findAll((err, rows) => {
    if (err) return error(res, err);

    return success(req, res, rows, "Leave types retrieved successfully");
  });
};

exports.getLeaveTypeById = (req, res) => {
  const { id } = req.params;

  LeaveType.find(id, (err, rows) => {
    if (err) return error(res, err);

    if (rows.length === 0) return error(res, "Leave type not found", 404);

    return success(req, res, rows[0], "Leave type retrieved successfully");
  });
};

exports.updateLeaveType = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  if (dataToUpdate)
    LeaveType.update(id, dataToUpdate, (err, result) => {
      if (err) return error(res, err);

      if (result.affectedRows === 0)
        return error(res, "Leave type not found", 404);

      return success(req, res, { id }, "Leave type updated successfully");
    });
};

exports.deleteLeaveType = (req, res) => {
  const { id } = req.params;

  LeaveType.delete(id, (err, result) => {
    if (err) return error(res, err);

    if (result.affectedRows === 0)
      return error(res, "Leave type not found", 404);

    return success(req, res, {}, "Leave type deleted successfully", 204);
  });
};

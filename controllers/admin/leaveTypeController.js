const LeaveType = require("../../models/LeaveType");
const { error, success } = require("../../utils/response");

exports.createLeaveType = (req, res) => {
  const { type, description } = req.body;

  LeaveType.create({ type, description }, (err, result) => {
    if (err) return error(res, err);

    return success(result, {}, "Leave type created successfully", 201);
  });
};

exports.getAllLeaveTypes = (_req, res) => {
  LeaveType.findAll((err, rows) => {
    if (err) return error(res, err);

    return success(res, rows, "Leave types retrieved successfully");
  });
};

exports.getLeaveTypeById = (req, res) => {
  const { id } = req.params;

  LeaveType.findById(id, (err, rows) => {
    if (err) return error(res, err);

    if (rows.length === 0) return error(res, "Leave type not found", 404);

    return success(res, rows[0], "Leave type retrieved successfully");
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

      return success(res, {}, "Leave type updated successfully", 204);
    });
};

exports.deleteLeaveType = (req, res) => {
  const { id } = req.params;

  LeaveType.delete(id, (err, result) => {
    if (err) return error(res, err);

    if (result.affectedRows === 0)
      return error(res, "Leave type not found", 404);

    return success(res, {}, "Leave type deleted successfully", 204);
  });
};

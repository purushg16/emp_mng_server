const LeaveType = require("../../models/LeaveType");

exports.createLeaveType = (req, res) => {
  const { type, description } = req.body;

  LeaveType.create({ type, description }, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.status(201).json({
      message: "Leave type created successfully",
      id: result.insertId,
    });
  });
};

exports.getAllLeaveTypes = (_req, res) => {
  LeaveType.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
};

exports.getLeaveTypeById = (req, res) => {
  const { id } = req.params;

  LeaveType.findById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0)
      return res.status(404).json({ message: "Leave type not found" });

    res.json(rows[0]);
  });
};

exports.updateLeaveType = (req, res) => {
  const { id } = req.params;
  const dataToUpdate = req.body;

  if (dataToUpdate)
    LeaveType.update(id, dataToUpdate, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      if (result.affectedRows === 0)
        return res.status(404).json({ message: "Leave type not found" });

      res.json({ message: "Leave type updated successfully" });
    });
};

exports.deleteLeaveType = (req, res) => {
  const { id } = req.params;

  LeaveType.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Leave type not found" });

    res.json({ message: "Leave type deleted successfully" });
  });
};

const Leave = require("../models/Leave");

exports.getAllLeaves = (_req, res) => {
  Leave.findAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getLeaveById = (req, res) => {
  const id = req.params.id;
  Leave.findById(id, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0)
      return res.status(404).json({ message: "Leave not found" });
    res.json(rows[0]);
  });
};

exports.updateLeaveStatus = (req, res) => {
  const id = req.params.id;
  const { status, remark } = req.body;

  Leave.updateStatus(id, status, remark, (err) => {
    if (err)
      return res.status(500).json({ error: "Failed to update leave status" });
    res.json({ message: "Leave status updated successfully" });
  });
};

exports.deleteLeave = (req, res) => {
  const id = req.params.id;
  Leave.delete(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Leave deleted" });
  });
};

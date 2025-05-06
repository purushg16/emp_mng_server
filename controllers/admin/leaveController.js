const Leave = require("../../models/Leave");

exports.getAllLeaves = (req, res) => {
  const status = req.query.status;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return res
      .status(400)
      .json({
        message:
          "Invalid status. Valid values are: 'pending', 'approved', 'declined'.",
      });
  }

  Leave.findAll(status, (err, leaves) => {
    if (err) return res.status(500).json({ message: "Error fetching leaves" });

    if (!leaves.length) {
      return res.status(404).json({ message: "No leaves found" });
    }

    res.status(200).json({ leaves });
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

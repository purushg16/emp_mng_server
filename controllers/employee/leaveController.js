const Leave = require("../../models/Leave");

exports.getEmployeeLeaves = (req, res) => {
  const employeeId = req.userId;
  const status = req.query.status;

  const validStatuses = ["pending", "approved", "declined"];

  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({
      message:
        "Invalid status. Valid values are: 'pending', 'approved', 'declined'.",
    });
  }

  Leave.findByEmployeeId(employeeId, status, (err, leaves) => {
    if (err) return res.status(500).json({ message: "Error fetching leaves" });

    if (!leaves.length) {
      return res.status(404).json({ message: "No leaves found" });
    }

    res.status(200).json({ leaves });
  });
};

exports.getLeaveById = (req, res) => {
  const { id } = req.params;
  const employeeId = req.userId;

  Leave.findById(id, (err, leave) => {
    if (err) return res.status(500).json({ message: "Error fetching leave" });

    if (!leave || leave.employeeId !== employeeId) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ leave });
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
      if (err)
        return res
          .status(500)
          .json({ message: "DB error during overlap check" });

      if (result.length > 0) {
        return res
          .status(400)
          .json({ message: "Leave dates overlap with existing application" });
      }

      // proceed with creation
      Leave.create(leaveReq, (err2, _result2) => {
        if (err2) {
          return res.status(500).json({ message: "Error applying leave" });
        }
        res.status(201).json({ message: "Leave applied successfully" });
      });
    }
  );
};

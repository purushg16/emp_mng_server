const express = require("express");
const leaveController = require("../../controllers/employee/leaveController");

const router = express.Router();

router.get("/view", leaveController.getEmployeeLeaves);
router.get("/view/:id", leaveController.getLeaveById);
router.post("/apply", leaveController.createLeave);

module.exports = router;

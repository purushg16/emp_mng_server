const express = require("express");
const leaveTypeController = require("../controllers/leaveTypeController");
const {
  leaveTypeValidator,
  leaveTypeUpdateValidator,
} = require("../validators/leaveTypeValidator");
const validate = require("../middleware/validate");

const router = express.Router();

// Get all leave types
router.get("/getAll", leaveTypeController.getAllLeaveTypes);

// Get leave type by ID
router.get("/get/:id", leaveTypeController.getLeaveTypeById);

// Create a new leave type
router.post(
  "/create",
  leaveTypeValidator,
  validate,
  leaveTypeController.createLeaveType
);

// Update leave type by ID
router.put(
  "/update/:id",
  leaveTypeUpdateValidator,
  validate,
  leaveTypeController.updateLeaveType
);

// Delete leave type by ID
router.delete("/delete/:id", leaveTypeController.deleteLeaveType);

module.exports = router;

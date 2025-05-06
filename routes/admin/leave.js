const express = require("express");
const leaveController = require("../../controllers/admin/leaveController");
const { leaveUpdateValidation } = require("../../validators/leaveValidation");
const validate = require("../../middleware/validate");

const router = express.Router();

router.get("/getAll", leaveController.getAllLeaves);
router.get("/get/:id", leaveController.getLeaveById);
router.put(
  "/update/:id",
  leaveUpdateValidation,
  validate,
  leaveController.updateLeaveStatus
);
router.delete("/delete/:id", leaveController.deleteLeave);

module.exports = router;

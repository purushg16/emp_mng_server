const express = require("express");
const leaveController = require("../../controllers/employee/leaveController");
const validate = require("../../middleware/validate");
const { createLeaveSchema } = require("../../validators/leaveValidation");

const router = express.Router();

router.get("/view", leaveController.getEmployeeLeaves);
router.get("/view/:id", leaveController.getLeaveById);
router.post("/apply", validate(createLeaveSchema), leaveController.createLeave);

module.exports = router;

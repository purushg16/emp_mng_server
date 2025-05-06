const express = require("express");
const employeeAuth = require("../../controllers/employee/employeeAuthController");
const profile = require("../../routes/employee/profile");
const { verifyToken, isEmployee } = require("../../middleware/authMiddleware");
const leaveController = require("../../controllers/employee/leaveController");

const router = express.Router();
exports.router = router;

// Employee Login
router.post("/auth/login", employeeAuth.login);

// Protected routes
router.use("/profile", verifyToken, profile);
router.get(
  "/leave/view",
  verifyToken,
  isEmployee,
  leaveController.getEmployeeLeaves
);
router.post(
  "/leave/apply",
  verifyToken,
  isEmployee,
  leaveController.createLeave
);

module.exports = router;

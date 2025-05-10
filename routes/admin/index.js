const express = require("express");
// const verifyToken = require("../../middleware/verifyToken");
const { isAdmin, verifyToken } = require("../../middleware/authMiddleware");

const departmentRoutes = require("./department");
const leaveTypeRoutes = require("./leaveType");
const employeeRoutes = require("./employee");
const leaveRoutes = require("./leave");
const dashboard = require("./dashboard");
const adminAuth = require("../../controllers/admin/adminAuthController");

const router = express.Router();

// Admin Login
router.post("/auth/login", adminAuth.login);

// Protected routes
router.put(
  "/auth/change-password",
  verifyToken,
  isAdmin,
  adminAuth.changePassword
);
router.use("/departments", verifyToken, isAdmin, departmentRoutes);
router.use("/leaveType", verifyToken, isAdmin, leaveTypeRoutes);
router.use("/employee", verifyToken, isAdmin, employeeRoutes);
router.use("/leave", verifyToken, isAdmin, leaveRoutes);
router.use("/dashboard", verifyToken, isAdmin, dashboard);

module.exports = router;
